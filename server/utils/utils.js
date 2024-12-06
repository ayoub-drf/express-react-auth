import jwt from "jsonwebtoken";


export const generateVerificationCode = () => {
    const code = Math.floor(100000 + Math.random() * 900000);
    const codeExpiredAt = Date.now() + 24 * 60 * 60 * 1000;
    return {
        code: code,
        codeExpiredAt: codeExpiredAt,
    };
}

export const generateJWT = (res, id) => {
    const SECRET_KEY = process.env.SECRET_KEY;
    const token = jwt.sign( { id }, SECRET_KEY, { expiresIn: "3d"} )

    res.cookie("token", token, { 
        httpOnly: true, // Cross-Site Scripting (XSS) attacks,
        secure: process.env.NODE_ENV === "PRO", // if true use HTTPS if not use HTTP
        sameSite: "strict", // Cross-Site Request Forgery (CSRF) attacks / only for the same domain or origin
        maxAge: 10 * 24 * 60 * 60 * 1000 // 10 days
    });

    return token

}