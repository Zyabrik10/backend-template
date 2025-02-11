import { transporter } from "../config/email.config.js";

export function sendMail({ from, to, subject, test = "", html = "" }) {
  const emailOptions = {
    from,
    to,
    subject,
    test,
    html,
  };

  transporter
    .sendMail(emailOptions)
    .then((info) => console.log(info))
    .catch((err) => console.log(err));
}
