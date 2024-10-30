import _ from "lodash";
import nodeMailer from "nodemailer";
import { convert } from "html-to-text"
import config from "../config/config.js";

export const blockList = (initialObj, arrayToblock) => {
  return _.omit(initialObj, arrayToblock);
};
export const allowList = (initialObj, arrayToAllow) => {
  return _.pick(initialObj, arrayToAllow);
};

export const sendMail = (payload) => {
    return new Promise((resolve, reject) => {
      const transporter = nodeMailer.createTransport({
        service: "gmail",
        auth: {
          user: config.mail.user,
          pass: config.mail.pass,
        },
  
        tls: {
          rejectUnauthorized: false, // Add this line
        },
      });
      const text = convert(payload.html, { wordwrap: 130 });
      const emailFrom =
        payload.from !== undefined ? payload.from : config.mail.user;
      const emailTo =
        payload.to !== undefined ? payload.to : config.mail.user;
      const mailOptions = {
        from: emailFrom,
        to: emailTo,
        subject: payload.subject,
        text: payload.html,
        html: payload.html,
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          reject(error);
        }
        resolve(info?.response);
      });
    });
  };;

// const sleep = async(ms) => {
//   return await new Promise(resolve => setTimeout(resolve, ms))
// }
// for(let i=0; i<3; i++){
//   console.log(`Waiting ${i} seconds...`);
//   await sleep(i * 1000);
// }

export const topUpMail = (name, email) => {
  return {
    to: email,
    subject: "Insufficient Funds in Your SACCO Account for Vehicle Operations",
    html: `
    Dear ${name},

    We are reaching out to inform you that your SACCO account balance has fallen below the required threshold to cover current and upcoming vehicle transactions. As of today, the account does not have sufficient funds to facilitate charges for vehicles entering designated zones.

    To avoid any disruption in service, we recommend recharging your account at your earliest convenience. You can top up directly through our platform or contact our support team for assistance.

    Thank you for your attention to this matter, and please let us know if we can help facilitate the process in any way.

    Warm regards,
    TozaHub
    `,
  };
};

