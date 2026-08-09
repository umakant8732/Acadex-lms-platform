export const invoiceEmailTemplate = ({
  fullName,
  courseTitle,
  price,
  providerPaymentId,
  receipt,
  paidAt
}) => {
  const formattedDate = new Date(paidAt).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  // Convert price from paise to rupees
  const amountRupees = (price / 100).toFixed(2);

  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
  </head>
  <body style="margin:0;padding:0;background:#f4f6f9;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;color:#111827;">
    <div style="max-width:600px;margin:40px auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:0;overflow:hidden;box-shadow:0 4px 6px -1px rgba(0,0,0,0.05);">
      
      <!-- Logo/Branding Header -->
      <div style="background:#000000;padding:32px 24px;text-align:center;">
        <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:600;letter-spacing:1px;text-transform:uppercase;">
          ACADEX LEARNING
        </h1>
        <p style="margin:8px 0 0 0;color:#9ca3af;font-size:14px;">
          Purchase Receipt & Invoice
        </p>
      </div>

      <!-- Main Receipt Body -->
      <div style="padding:40px 30px;">
        <h2 style="margin-top:0;font-size:20px;font-weight:600;border-bottom:1px solid #e5e7eb;padding-bottom:12px;">
          Thank you for your purchase!
        </h2>
        <p style="color:#4b5563;font-size:15px;line-height:1.6;">
          Hello <strong>${fullName}</strong>, your payment has been processed successfully. You now have full lifetime access to the course.
        </p>

        <!-- Transaction Details -->
        <table style="width:100%;margin-top:24px;border-collapse:collapse;font-size:14px;color:#4b5563;">
          <tr>
            <td style="padding:6px 0;font-weight:600;">Receipt ID:</td>
            <td style="padding:6px 0;text-align:right;">${receipt}</td>
          </tr>
          <tr>
            <td style="padding:6px 0;font-weight:600;">Transaction ID:</td>
            <td style="padding:6px 0;text-align:right;">${providerPaymentId || 'N/A'}</td>
          </tr>
          <tr>
            <td style="padding:6px 0;font-weight:600;">Payment Date:</td>
            <td style="padding:6px 0;text-align:right;">${formattedDate}</td>
          </tr>
          <tr>
            <td style="padding:6px 0;font-weight:600;">Payment Method:</td>
            <td style="padding:6px 0;text-align:right;">Razorpay Secure</td>
          </tr>
        </table>

        <!-- Summary Table -->
        <div style="margin-top:32px;border-top:1px solid #e5e7eb;">
          <table style="width:100%;border-collapse:collapse;font-size:15px;margin-top:16px;">
            <thead>
              <tr style="border-bottom:2px solid #111827;text-align:left;font-weight:600;">
                <th style="padding:10px 0;">Item Description</th>
                <th style="padding:10px 0;text-align:right;">Price</th>
              </tr>
            </thead>
            <tbody>
              <tr style="border-bottom:1px solid #e5e7eb;">
                <td style="padding:16px 0;font-weight:500;">
                  ${courseTitle}
                  <div style="font-size:12px;color:#6b7280;margin-top:4px;font-weight:400;">Full Lifetime Access</div>
                </td>
                <td style="padding:16px 0;text-align:right;font-weight:500;">
                  INR ${amountRupees}
                </td>
              </tr>
              <tr>
                <td style="padding:16px 0 8px 0;font-weight:600;text-align:right;">Subtotal:</td>
                <td style="padding:16px 0 8px 0;text-align:right;font-weight:500;">INR ${amountRupees}</td>
              </tr>
              <tr>
                <td style="padding:8px 0;font-weight:600;text-align:right;font-size:16px;color:#000;">Grand Total:</td>
                <td style="padding:8px 0;text-align:right;font-weight:700;font-size:18px;color:#000;">INR ${amountRupees}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style="margin-top:40px;text-align:center;">
          <a href="https://acadexlearning.xyz/student" 
             style="display:inline-block;background:#000000;color:#ffffff;padding:12px 28px;text-decoration:none;font-weight:500;font-size:15px;letter-spacing:0.5px;">
            Start Learning
          </a>
        </div>
      </div>

      <!-- Footer -->
      <div style="background:#f9fafb;border-top:1px solid #e5e7eb;text-align:center;padding:24px;color:#6b7280;font-size:12px;line-height:1.5;">
        If you have any questions or did not receive access, please contact support@acadexlearning.xyz.<br>
        © ${new Date().getFullYear()} Acadex Learning. All rights reserved.
      </div>
    </div>
  </body>
  </html>
  `;
};
