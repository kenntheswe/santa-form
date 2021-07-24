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
    user: process.env.EMAIL, // generated ethereal user
    pass: process.env.PASSWORD, // generated ethereal password
  },
});

// send mail with defined transport object
const add = (username, address, wish) => {

  pendingMail.push({
    from: "do_not_reply@northpole.com", // sender address
    to: "santa@northpole.com", // receiver address
    subject: "You have a new wish request", // Subject line
    text: `Merry Christmas!
          This email was sent by ${username}.
          Address: ${address}
          Wish: ${wish}
          
          Sent from Santa Form`, // plain text body
  });
}

const sendEmail = (mailOption) => {
  transporter.sendMail(mailOption, (error, data) => {
    if (error) {
      console.log("Sorry, there was an error...", error);
    }
  });
}

const sendPendingMail = () => {
  while (pendingMail.length > 0) {
    sendEmail(pendingMail.pop());
  }
}

const init = () => {
  if (!timeout) {
    timeout = setInterval(sendPendingMail, 15000);
  }
}

module.exports = { add, init, };
