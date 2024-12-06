const sgMail = require("@sendgrid/mail");
const dotenv = require("dotenv");
dotenv.config();

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY || "correct_shared_key";
console.log("SENDGRID_API_KEY:", SENDGRID_API_KEY);
sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmailToJobProvider = async (req, res) => {
  const { providerEmail, userName, message } = req.body;

  // Validate required fields
  if (!providerEmail || !userName || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  // Email HTML content with your colors and Lexend font
  const emailContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Lexend:wght@400;500;700&display=swap" rel="stylesheet">
        <style>
          body {
            font-family: 'Lexend', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #F4F6F8;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            border: 1px solid #e0e0e0;
            border-radius: 8px;
            background-color: white;
          }
          h2 {
            color: #3575E2; /* Primary color */
            font-weight: 700;
          }
          p {
            margin: 0 0 15px;
            color: #20242C; /* Dark color */
            font-weight: 400;
          }
          .footer {
            text-align: center;
            margin-top: 20px;
            font-size: 0.85em;
            color: #6c757d;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h2>Message from ${userName}</h2>
          <p>${message}</p>
        </div>
        <div class="footer">
          <p>SkillConnect | Connecting skills to opportunities</p>
        </div>
      </body>
    </html>
  `;

  try {
    const msg = {
      to: providerEmail,
      from: {
        email: "skillconnect.info@gmail.com", // Verified email
        name: "SkillConnect",
      },
      subject: `New Message from ${userName}`,
      html: emailContent,
    };

    // Send email
    await sgMail.send(msg);

    // Success response
    res.status(200).json({ message: "Email sent successfully." });
  } catch (error) {
    // Log and return error response
    console.error("Error sending email:", error.response?.body || error.message);
    res.status(500).json({
      error: "Failed to send email.",
      details: error.response?.body || error.message,
    });
  }
};

module.exports = { sendEmailToJobProvider };
