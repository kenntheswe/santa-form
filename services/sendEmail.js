const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

// pending to send email
const pendingMail = [];

 // create reusable transporter object using the default SMTP transport
 let transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL, // generated ethereal user
    pass: process.env.PASSWORD, // generated ethereal password
  },
});

// send mail with defined transport object
const add = (username, address, wish) => {

  pendingMail.push.({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: "bar@example.com, baz@example.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });
}

const sendEmail = (mailOption) => {
  transporter.sendMail(mailOption, (error, data) => {
    if (error) {
      console.log("Sorry, there was an error", error);
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

export { init, add }