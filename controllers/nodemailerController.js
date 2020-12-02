let nodemailer = require("nodemailer");
const { addListener } = require("nodemon");
require("dotenv").config();
const jwt = require('jsonwebtoken');

// Issue token
// const payload = { email };
// const token = jwt.sign(payload, secret, {
//   expiresIn: "1h",
// });
// res.cookie("token", token, { httpOnly: true }).sendStatus(200);
// console.log(token);

module.exports = {
//   sendJWT: function (req, res) {
//     const payload = { email };
//     const token = jwt.sign(payload, secret, {
//       expiresIn: "1h",
//     });
//     res.cookie("token", token, { httpOnly: true }).sendStatus(200);
//     console.log(token);

    // res.json(jwt({ secret: "shhhhhhared-secret" }));
//   },
  sendMail: async function (req, res) {
    
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: "",
        pass: "",
      },
    });
 const payload = {email: req.body.email};

const secret = 'mysecretsshhh';
   const token = jwt.sign(payload, secret, {
     expiresIn: '1h'
   });
    // Message object
    let message = {
      from: "no-reply@studdy-buddy.app",

      // Comma separated list of recipients
      to: req.body.email,
      bcc: "",

      // Subject of the message
      subject: "Password Reset",

      // plaintext body
      text: "Hello here is your password reset link!",

      // HTML body
      html:
        "<p>Hello here is your password reset link!" +
        `<p><link>http://localhost:3000/reset/${req.body.email}/${token}</p>`,
    };

    let info = await transporter.sendMail(message);
    res.json(info);
    console.log("Message sent successfully as %s", info.messageId);
  },
  checkToken: function (req, res) {
    res.sendStatus(200);  
  }
};
