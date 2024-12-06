import jwt from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config()


const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    try {
        if (!token) {
            return res.status(401).json({ success: false, message: "Token were not provided" })
        }

        const decode = jwt.verify(token, process.env.SECRET_KEY)

        if (!decode) {
            return res.status(401).json({ success: false, message: "Invalid Token" })
        }
        req.userId = decode.id;

        next()
    } catch (error) {
        console.log('Unauthorized')
        return res.status(500).json({ success: false, message: error.message })
    }
};

export default verifyToken;