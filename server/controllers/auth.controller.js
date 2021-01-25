const User = require("../models/auth.model");
const expressJwt = require("express-jwt");
const _ = require("lodash");
const { OAuth2Client } = require("google-auth-library");
const fetch = require("node-fetch");

const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const expressJWT = require("express-jwt");
//Custom error handler
const { errorHandler } = require("../helpers/dbErrorHandling");
// For send email
const nodemailer = require("nodemailer");
///

exports.registerController = (req, res) => {
  const { name, email, password } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const firstError = errors.array().map((error) => error.msg)[0];
    return res.status(422).json({
      errors: firstError,
    });
  } else {
    User.findOne({
      email,
    }).exec((err, user) => {
      if (user) {
        return res.status(400).json({
          errors: "Email is taken",
        });
      }
    });

    const token = jwt.sign(
      {
        name,
        email,
        password,
      },
      "mymagic5112142Activation",
      {
        expiresIn: "5m",
      }
    );

    const emailData = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "Account activation link",
      html: `
                <h1>Please use the following to activate your account</h1>
                <p>http://localhost:3000/users/activate/${token}</p>
                <hr />
                <p>This email may containe sensetive information</p>
                <p>http://localhost:3000</p>
            `,
    };

    /*sgMail
      .send(emailData)
      .then((sent) => {
        return res.json({
          message: `Email has been sent to ${email}`,
        });
        console.log("estoy aca!!!");
      })
      .catch((err) => {
        return res.status(400).json({
          success: false,
          errors: errorHandler(err),
        });
      });*/
    /*const transport = {
      host: "smtp.zoho.in",
      auth: {
        user: "goldenberghernan@gmail.com",
        pass: "Developer2021",
      },
    };

    const transporter = nodemailer.createTransport(transport);

    transporter.verify((error, success) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Server is ready to take messages");
      }
    });
    transporter.sendMail(emailData, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);

        return res.json({
          message: `Email has been sent to ${email}`,
        });
      }
    });*/
    /*var transporter = nodemailer.createTransport({
      host: "smtp.zoho.com",
      port: 465,
      secure: true, // use SSL
      auth: {
        user: "goldebnerghernan@gmail.com", //zoho username
        pass: "Developer2021", //Not zoho mail password because of 2FA enabled
      },
    });

    var mailOptions = {
      from: "hgoldenberg@hotmail.com",
      to: "goldenberghernan@gmail.com",
      subject: "Created Successfully",
      html:
        "<h1>Hi " +
        req.body.fname +
        ",</h1><p>You have successfully created.</p>",
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        res
          .status(200)
          .send(
            setting.status("User created Successfully, Please Check your Mail")
          );
      }
    });*/
    ("use strict");
    const nodemailer = require("nodemailer");

    // async..await is not allowed in global scope, must use a wrapper
    async function main() {
      // Generate test SMTP service account from ethereal.email
      // Only needed if you don't have a real mail account for testing
      let testAccount = await nodemailer.createTestAccount();

      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        host: "imap.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: "josianne.nicolas@ethereal.email", // generated ethereal user
          pass: "zrmgYYg3H7UMcmbvjw", // generated ethereal password
        },
      });

      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: '"Fred Foo 👻" <goldenberghernan@gmail.com>', // sender address
        to: "hgoldenberg@hotmail.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
      });

      console.log("Message sent: %s", info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    }

    main().catch(console.error);
  }
};

////
