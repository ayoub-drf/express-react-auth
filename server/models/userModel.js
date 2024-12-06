import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        verified: { type: Boolean, default: false },
        lastLogin: { type: Date, default: Date.now() },
        resetPasswordToken: String,
        resetPasswordExpiresAt: Date,
        verificationCode: String,
        verificationCodeExpiresAt: Date,
    }, { timestamps: true }
);

export const User = mongoose.model("User", userSchema)