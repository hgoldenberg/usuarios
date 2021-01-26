const User = require("../models/auth.model");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(
  "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"
);
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

    // Sending email

    const emailData = {
      from: "goldenberghernan@gmail.com",
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
    sgMail
      .send(emailData)
      .then((sent) => {
        return res.json({
          message: `Email has been sent to ${email}`,
        });
      })
      .catch((err) => {
        return res.status(400).json({
          success: false,
          errors: errorHandler(err),
        });
      });
  }
};
