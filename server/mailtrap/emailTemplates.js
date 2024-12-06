export const verificationTemplate = (username, code) => {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verification Code</title>
        </head>
        <body style="font-family: Arial, sans-serif; color: #333; background-color: #f7f7f7; margin: 0; padding: 0;">

        <table style="width: 100%; max-width: 600px; margin: 0 auto; background-color: #fff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); border-spacing: 0;">
            <tr>
            <td style="text-align: center; font-size: 24px; font-weight: bold; color: #333; padding: 10px 0; border-bottom: 2px solid #e0e0e0;">
                Verification Code
            </td>
            </tr>
            <tr>
            <td style="font-size: 16px; color: #555; line-height: 1.5; padding: 20px 0;">
                Hello <strong>${username},</strong><br><br>
                Thank you for using our service. To verify your account, please enter the following 6-digit verification code in the application:
            </td>
            </tr>
            <tr>
            <td style="text-align: center; margin-top: 20px;">
                <div style="font-size: 36px; font-weight: bold; color: #4CAF50; background-color: #f1f1f1; padding: 15px; border-radius: 5px;">
                ${code}
                </div>
            </td>
            </tr>
            <tr>
            <td style="text-align: center; font-size: 12px; color: #888; padding-top: 20px; border-top: 1px solid #e0e0e0; margin-top: 30px;">
                If you did not request this code, please <a href="#" style="color: #4CAF50; text-decoration: none;">ignore this email</a>.<br>
                Thank you for being part of our community.
            </td>
            </tr>
        </table>

        </body>
        </html>
        `
};
export const welcomeTemplate = (username) => {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome ${username}</title>
        </head>
        <body style="font-family: Arial, sans-serif; color: #333; background-color: #f7f7f7; margin: 0; padding: 0;">

        <table style="width: 100%; max-width: 600px; margin: 0 auto; background-color: #fff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); border-spacing: 0;">
            <tr>
            <td style="text-align: center; font-size: 24px; font-weight: bold; color: #333; padding: 10px 0; border-bottom: 2px solid #e0e0e0;">
                Account Verified
            </td>
            </tr>
            <tr>
            <td style="font-size: 16px; color: #555; line-height: 1.5; padding: 20px 0;">
                Hello <strong>${username},</strong><br><br>
                Thank you for using our service. your account has been verified
            </td>
            </tr>
            <tr>
            <td style="text-align: center; font-size: 12px; color: #888; padding-top: 20px; border-top: 1px solid #e0e0e0; margin-top: 30px;">
                If you did not request this code, please <a href="#" style="color: #4CAF50; text-decoration: none;">ignore this email</a>.<br>
                Thank you for being part of our community.
            </td>
            </tr>
        </table>

        </body>
        </html>
        `
};

export const resetPasswordTemplate = (username, url) => {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome ${username}</title>
        </head>
        <body style="font-family: Arial, sans-serif; color: #333; background-color: #f7f7f7; margin: 0; padding: 0;">

        <table style="width: 100%; max-width: 600px; margin: 0 auto; background-color: #fff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); border-spacing: 0;">
            <tr>
            <td style="text-align: center; font-size: 24px; font-weight: bold; color: #333; padding: 10px 0; border-bottom: 2px solid #e0e0e0;">
                Account Verified
            </td>
            </tr>
            <tr>
            <td style="font-size: 16px; color: #555; line-height: 1.5; padding: 20px 0;">
                Hello <strong>${username},</strong><br><br>
                Thank you for using our service.<br>
                this your reset password link <br>
                ${url}
            </td>
            </tr>
            <tr>
            <td style="text-align: center; font-size: 12px; color: #888; padding-top: 20px; border-top: 1px solid #e0e0e0; margin-top: 30px;">
                If you did not request this code, please <a href="#" style="color: #4CAF50; text-decoration: none;">ignore this email</a>.<br>
                Thank you for being part of our community.
            </td>
            </tr>
        </table>

        </body>
        </html>
        `
};

export const resetPasswordTemplateSuccess = (username) => {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome ${username}</title>
        </head>
        <body style="font-family: Arial, sans-serif; color: #333; background-color: #f7f7f7; margin: 0; padding: 0;">

        <table style="width: 100%; max-width: 600px; margin: 0 auto; background-color: #fff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); border-spacing: 0;">
            <tr>
            <td style="text-align: center; font-size: 24px; font-weight: bold; color: #333; padding: 10px 0; border-bottom: 2px solid #e0e0e0;">
                Password Updated
            </td>
            </tr>
            <tr>
            <td style="font-size: 16px; color: #555; line-height: 1.5; padding: 20px 0;">
                Hello <strong>${username},</strong><br><br>
                Your password has been updated successfully
            </td>
            </tr>
            <tr>
            <td style="text-align: center; font-size: 12px; color: #888; padding-top: 20px; border-top: 1px solid #e0e0e0; margin-top: 30px;">
                If you did not request this code, please <a href="#" style="color: #4CAF50; text-decoration: none;">ignore this email</a>.<br>
                Thank you for being part of our community.
            </td>
            </tr>
        </table>

        </body>
        </html>
        `
};