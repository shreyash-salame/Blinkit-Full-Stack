const {Resend} = require("resend");
const dotenv = require("dotenv");
dotenv.config();

if (!process.env.RESEND_API) {
  console.log("provide RESEND_API inside the .env file ");
}
const resend = new Resend(process.env.RESEND_API);

const sendEmail = async ({ sendTo, subject, html }) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "blinkeyit <onboarding@resend.dev>",
      to: sendTo,
      subject: subject,
      html: html,
    });
    if (error) {
      return console.error({ error });
    }
    return data;
  } catch (error) {
    console.log(error);
  }
};

module.exports = sendEmail;
