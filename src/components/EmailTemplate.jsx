export default function EmailTemplate({ userName, twoFactorCode }) {
  return `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <h1 style="color: #4CAF50;">Hello ${userName},</h1>
      <p>Your 2FA verification code for <b>Identity App</b> is:</p>
      <div style="font-size: 24px; font-weight: bold; margin: 20px 0;">${twoFactorCode}</div>
      <p>Please use this code to verify your account. If this wasn't you, please contact support immediately.</p>
      <footer style="margin-top: 20px; color: #999;">Thank you, Your Team</footer>
    </div>
  `;
}
