const express = require("express");
const body_parser = require('body-parser');
const nodemailer = require("nodemailer");
require("dotenv").config();
const app = express();
const ejs = require("ejs");



app.use(express.json());
app.use(body_parser.urlencoded({ extended: true, limit: '500mb' }))

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.get("/", (req, res) => {
  res.status(200).render("index");
});
app.post("/", async (req, res) => {
  const { name, email, subject, message } = req.body;




  try {
    const admin_email = process.env.email;
    const password = process.env.password;
    // console.log(emaiYour one time passwordl,otp)
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: admin_email,
        pass: password, //Temp password
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: admin_email, // sender address
      to: `${email}`, // list of receivers
      subject: `${subject}`, // Subject line
      html: `${message}`
    });

    console.log("Email sent");

    res.redirect("/");

  }

  catch (err) {

    console.log(err);
    res.send("Error");


  }






})

app.listen(2000, () => {
  console.log("Listening on port no 2000");
});