import { createTransport } from "nodemailer";

export const emailUser = "alexzander.stanton@ethereal.email";

const config = {
  host: "smtp.ethereal.email",
  port: 587,
  secure: false,
  auth: {
    user: emailUser,
    pass: "smFNG6pCnZ5yc3aqhj",
  },
  tls: {
    rejectUnauthorized: false, // Ignore invalid certs (for Ethereal testing)
  },
};

export const transporter = createTransport(config);