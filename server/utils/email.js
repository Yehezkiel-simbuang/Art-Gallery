const nodeMailer = require("nodemailer");
require("dotenv").config();

const mailSender = async (option) => {
  const transporter = nodeMailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.email,
      pass: process.env.password,
      clientId: process.env.clientId,
      clientSecret: process.env.clientSecret,
      refreshToken: process.env.refreshToken,
    },
  });
  const emailOptions = {
    from: process.env.email,
    to: option.to,
    subject: option.subject,
    text: option.message,
  };
  await transporter.sendMail(emailOptions);
};

module.exports = { mailSender };
