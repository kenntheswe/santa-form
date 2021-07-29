const nodemailer = require('nodemailer');
const dotenv = require('dotenv').config();

// pending to send email
const pendingMail = [];
// prevent from having 15 seconds interval more than one time
let timeout;

 // create reusable transporter object using the default SMTP transport
 let transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: process.env.EMAIL, // generated ethereal user from env
    pass: process.env.PASSWORD, // generated ethereal password from env
  },
});

// send mail with defined transport object
const addInfo = (username, address, wish) => {

  pendingMail.push({
    from: "do_not_reply@northpole.com", // sender address
    to: "santa@northpole.com", // receiver address
    subject: "You have a new wish request", // subject line
    text: `Merry Christmas!
          This email was sent by ${username}.
          Address: ${address}
          Wish: ${wish}
          
          Sent from Santa Form`, // text body
  });
}

const sendEmail = (mailOption) => {
  transporter.sendMail(mailOption, (error, data) => {
    if (error) {
      console.log("Sorry, there was an error...", error);
    }
  });
}

// pending mail for every 15 seconds
const sendPendingMail = () => {
  while (pendingMail.length > 0) {
    sendEmail(pendingMail.pop());
  }
}

// sending pending email for every 15 seconds
const timeoutInit = () => {
  if (!timeout) {
    timeout = setInterval(sendPendingMail, 15000);
  }
}

module.exports = { addInfo, timeoutInit, };
