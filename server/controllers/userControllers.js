
import bcryptjs from "bcryptjs"
import crypto from "crypto"
import { User } from "../models/userModel.js";
import { sendVerificationEmail, sendWelcomeMessage, sendResetPasswordEmail, sendResetPasswordEmailSuccess } from "../mailtrap/sendEmails.js";
import { generateVerificationCode, generateJWT } from "../utils/utils.js";

export const checkAuth = async (req, res) => {
    const userId = req.userId
    try {
        if (!userId) {
            return res.status(401).json({ success: false, message: "User ID not provided" })  
        }

        const user = await User.findById( userId ).select('-password')
        if (!user) {
            return res.status(401).json({ success: true, message: "User not found" })  
        }

        return res.status(200).json({ success: true, user: user })  
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}
export const login = async (req, res) => {
    const {email, password} = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({success: false, message: "All fields are required (email, password)"})
        }

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({success: false, message: "Invalid Credentials"})
        }

        const isValidPassword = await bcryptjs.compare(password, user.password)

        if (!isValidPassword) {
            return res.status(400).json({success: false, message: "Invalid Credentials"})
        }

        generateJWT(res, user._id)
        user.lastLogin = new Date()

        return res.status(200).json({
            success: true,
            message: "Logged in successfully",
            user: { ...user._doc, password: undefined }
        });
    } catch (error) {
        res.status(500).json({message: error.message})
    }
};
export const register = async (req, res) => {
    const {username, email, password} = req.body;

    try {
        if (!username || !email || !password) {
            return res.status(400).json({success: false, message: "All fields are required (username email password) "})
        }

        const emailAlreadyExists = await User.findOne({email});
        const usernameAlreadyExists = await User.findOne({username})


        if (emailAlreadyExists) {
            return res.status(400).json({success: false, message: "User with this email already exists"})
        }
        if (usernameAlreadyExists) {
            return res.status(400).json({success: false, message: "User with this username already exists"})
        }

        const hashedPassword = await bcryptjs.hash(password, 10)
        
        const user = new User(
            {
                username,
                email,
                password: hashedPassword,
                verificationCode: generateVerificationCode()['code'],
                verificationCodeExpiresAt: generateVerificationCode()['codeExpiredAt'],
            }
        );

        await user.save()
        generateJWT(res, user._id)
        await sendVerificationEmail(user.email, user.username, user.verificationCode)

        const userCreated = { ...user._doc };
        delete userCreated.password;
        delete userCreated.verificationCode;
        

        return res.status(201).json({success: true, userCreated})

    } catch (error) {
        return res.status(500).json({success: false, message: error.message})
    }
};
export const verifyEmail = async (req, res) => {
    const { code } = req.body;

    if (!code) {
        return res.status(400).json({success: false, message: "the code is missing"})
    }
    try {
        const user = await User.findOne({
            verificationCode: code,
            verificationCodeExpiresAt: {$gt: Date.now()}
        });

        if (!user) {
            return res.status(400).json({success: false, message: "Invalid or expired verification code"})
        }

        user.verified = true;
        user.verificationCode = undefined;
        user.verificationCodeExpiresAt = undefined;

        await user.save()
        await sendWelcomeMessage(user.email, user.username)
        const userCreated = { ...user._doc };
        delete userCreated.password;

        return res.status(200).json({success: true, userCreated: userCreated})
        
    } catch (error) {
        return res.status(500).json({success: false, message: error.message}) 
    }
};
export const logout = async (req, res) => {
    res.clearCookie("token")
    res.status(200).json({success: true, message: "logout successfully"})
};
export const resetPassword = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({success: false, message: "Email required to reset your password"})
        }
        
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(400).json({success: false, message: "Email was not found"})
        }

        const resetToken = crypto.randomBytes(20).toString('hex');
        const resetTokenExpiredPeriod = Date.now() + 2 * 60 * 60 * 1000

        user.resetPasswordToken = resetToken
        user.resetPasswordExpiresAt = resetTokenExpiredPeriod

        await user.save()
        sendResetPasswordEmail(user.email, user.username, `${process.env.WEBSITE_URL}reset-password-done/${user.resetPasswordToken}`)

        return res.status(200).json({success: true, user: 
            { ...user._doc, password: undefined }
        })
        
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({success: false, message: error.message})
    }
};
export const resetPasswordDone = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        if (!token) {
            return res.status(400).json({success: false, message: "Token were not provided"})
        }

        const user = await User.findOne({
            resetPasswordToken: token
        })

        if (!user) {
            return res.status(400).json({success: false, message: "Invalid credentials"})
        }


        if (user.resetPasswordExpiresAt < Date.now()) {
            return res.status(400).json({success: false, message: "Token Expired"})
        }

        if (!password) {
            return res.status(400).json({success: false, message: "Password field required"})
        }
        const hashedPassword = await bcryptjs.hash(password, 10)

        user.password = hashedPassword
        user.resetPasswordToken = undefined
        user.resetPasswordExpiresAt = undefined
        user.lastLogin = Date.now()
        generateJWT(res, user._id)
        await sendResetPasswordEmailSuccess(user.email, user.username)

        await user.save()

        return res.status(200).json({success: true, user: {...user._doc, password: undefined}})
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({success: false, message: error.message})  
    }
}