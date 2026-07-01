export const forgotPasswordTemplate = otp => {
  return `
    <div style="
      margin:0;
      padding:40px 20px;
      background:#f4f7fb;
      font-family:Arial,sans-serif;
    ">
      <div style="
        max-width:600px;
        margin:auto;
        background:#ffffff;
        border-radius:12px;
        overflow:hidden;
        box-shadow:0 4px 12px rgba(0,0,0,0.1);
      ">

        <div style="
          background:#2563eb;
          padding:24px;
          text-align:center;
        ">
          <h1 style="
            color:#ffffff;
            margin:0;
            font-size:28px;
          ">
            LMS Platform
          </h1>
        </div>

        <div style="padding:40px 30px;">
          <h2 style="
            margin-top:0;
            color:#111827;
          ">
            Password Reset Request
          </h2>

          <p style="
            color:#4b5563;
            line-height:1.7;
          ">
            We received a request to reset the password for your LMS account.
            Use the OTP below to continue.
          </p>

          <div style="
            text-align:center;
            margin:30px 0;
          ">
            <div style="
              display:inline-block;
              background:#eff6ff;
              color:#2563eb;
              font-size:32px;
              font-weight:bold;
              letter-spacing:8px;
              padding:16px 32px;
              border-radius:10px;
              border:2px dashed #2563eb;
            ">
              ${otp}
            </div>
          </div>

          <p style="
            color:#4b5563;
            line-height:1.7;
          ">
            This OTP will expire in
            <strong>10 minutes</strong>.
          </p>

          <p style="
            color:#4b5563;
            line-height:1.7;
          ">
            If you did not request a password reset,
            you can safely ignore this email.
            Your password will remain unchanged.
          </p>

          <hr style="
            border:none;
            border-top:1px solid #e5e7eb;
            margin:30px 0;
          ">

          <p style="
            color:#6b7280;
            font-size:14px;
            text-align:center;
            margin:0;
          ">
            This is an automated email from LMS Platform.
            Please do not reply to this message.
          </p>
        </div>

      </div>
    </div>
  `
}