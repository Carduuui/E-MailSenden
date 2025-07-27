const express = require("express");
const app = express();
const nodemailer = require("nodemailer");
const path = require("path");
require("dotenv").config();

const port = 3000;

const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASS;

function sendEmail(recipientEmail, emailSubject, emailText){
    const transport = nodemailer.createTransport({
        host: "mail.gmx.net",
        port: 587,
        secure: false,
        auth: {
            user: emailUser,
            pass: emailPass,
            method: "LOGIN"
        }
    });
    
    const mailOptions = {
        from: "carduuui@gmx.de",
        to: recipientEmail,
        subject: emailSubject,
        text: emailText,
    };
    
    transport.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
        } else{
            console.log("E-Mail gesendet" + info.response);
        }
    });
}

app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/index.html"));

});

app.post("/sendEmail", (req, res) =>{
    const recipientEmail = req.body.recipient;
    const emailSubject = req.body.subject;
    const emailText = req.body.text;

    sendEmail(recipientEmail, emailSubject, emailText);
    res.send("E-Mail wird gesendet...");
})

app.listen(port, function() {
    console.log(`Server läuft auf Port ${port}`);
});