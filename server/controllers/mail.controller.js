const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

// Create the transporter
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587, // 465 for SSL, 587 for TLS
  secure: false, // true for SSL
  auth: {
    user: process.env.SMTP_MAIL,
    pass: process.env.SMTP_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false, // Allow self-signed certificates (optional for testing)
  },
});

// Verify the transporter connection
transporter.verify((error, success) => {
  if (error) {
    console.error("SMTP Connection Error:", error);
  } else {
    console.log("SMTP Server is ready to take messages:", success);
  }
});

// Email sending function
exports.sendEmail = async (req, res) => {
  const { name, email, phone, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "Please fill all required fields" });
  }

  const mailOptions = {
    from: `"Contact Form" <${process.env.SMTP_MAIL}>`, // Sender address
    to: process.env.SMTP_MAIL, // Receiver address (your email)
    subject: `New Contact Form Submission from ${name}`, // Subject
    text: `
      You have received a new message from your contact form.

      Name: ${name}
      Email: ${email}
      Phone: ${phone}

      Message:
      ${message}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Message sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res
      .status(500)
      .json({ message: "Failed to send the message. Please try again later." });
  }
};
