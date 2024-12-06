import { verificationTemplate, welcomeTemplate, resetPasswordTemplate, resetPasswordTemplateSuccess } from "./emailTemplates.js"
import {client, sender} from "./mailtrapConfig.js"

export const sendVerificationEmail = async (email, username, code) => {
    try {
        const res = await client.send({
            from: sender,
            to: [{email, }],
            subject: "verification code!",
            html: verificationTemplate(username, code),
            })
    } catch (error) {
        console.log(error.message)
    }    
};

export const sendWelcomeMessage = async (email, username) => {
    try {
        const res = await client.send({
            from: sender,
            to: [{email, }],
            subject: "Welcome " + username,
            html: welcomeTemplate(username),
            })
    } catch (error) {
        console.log(error.message)
    } 
};

export const sendResetPasswordEmail = async (email, username, url) => {
    try {
        const res = await client.send({
            from: sender,
            to: [{email, }],
            subject: "Welcome " + username,
            html: resetPasswordTemplate(username, url),
            })
    } catch (error) {
        console.log(error.message)
    }    
};

export const sendResetPasswordEmailSuccess = async (email, username) => {
    try {
        const res = await client.send({
            from: sender,
            to: [{email, }],
            subject: "Welcome " + username,
            html: resetPasswordTemplateSuccess(username),
            })
    } catch (error) {
        console.log(error.message)
    }    
};