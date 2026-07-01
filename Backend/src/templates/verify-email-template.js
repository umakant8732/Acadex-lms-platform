export const verifyEmailTemplate = otp => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
  </head>

  <body style="margin:0;padding:0;background:#f4f6f9;font-family:Arial,sans-serif;">

    <div style="max-width:600px;margin:40px auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.1);">

      <div style="background:#2563eb;padding:24px;text-align:center;">
        <h1 style="margin:0;color:#ffffff;">
          LMS Platform
        </h1>
      </div>

      <div style="padding:40px 30px;">

        <h2 style="margin-top:0;color:#111827;">
          Verify Your Email
        </h2>

        <p style="color:#4b5563;font-size:16px;line-height:1.6;">
          Welcome to LMS Platform.
          Please use the verification code below to verify your email address.
        </p>

        <div style="text-align:center;margin:30px 0;">
          <div style="
            display:inline-block;
            background:#eff6ff;
            color:#2563eb;
            padding:18px 32px;
            font-size:32px;
            font-weight:bold;
            letter-spacing:6px;
            border-radius:10px;
          ">
            ${otp}
          </div>
        </div>

        <p style="color:#6b7280;font-size:14px;">
          This OTP is valid for 5 minutes.
        </p>

      </div>

      <div style="
        background:#f9fafb;
        text-align:center;
        padding:20px;
        color:#9ca3af;
        font-size:12px;
      ">
        © ${new Date().getFullYear()} LMS Platform
      </div>

    </div>

  </body>
  </html>
  `
}