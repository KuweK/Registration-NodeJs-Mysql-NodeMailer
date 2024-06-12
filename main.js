const express = require("express");
const path = require("path");
const mysql = require("mysql");
const parser = require("body-parser");
const app = express();
const PORT = 3000;
const nodemailer = require("nodemailer");

app.listen(PORT);

app.use(parser.urlencoded({ extended: true }));

const connection = mysql.createConnection({
    host: "DATA",
    user: "DATA",
    password: "DATA",
    database: "DATA"
})

function createpath(page) {
    return path.resolve(__dirname, `${page}.html`);
}

app.get("/", (req, resp) => {
    resp.sendFile(createpath("index"));
})

app.post("/register", (req, resp) => {
    const logininlogin = req.body.login;
    const password = req.body.pass;
    const email = req.body.mail;
    const query = `INSERT INTO DATA (mail, login, password, phone) VALUES (?, ?, ?, ?)`;
    const mailOptions = {
        from: "DATA",
        to: email,
        subject: "DATA",
        text: "DATA"
    };
    const transporter = nodemailer.createTransport({
        host: 'DATA',
        port: 'DATA',
        secure: true,
        auth: {
            user: 'DATA',
            pass: 'DATA'
        }
    });
    
    
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        }
        else{
            console.log(info.response)
        }
    })
    connection.query(query, [email, logininlogin, password, 888], (err, result) => {
        if (err){
            console.log(err);
        }
        else{
            console.log(result)
            resp.redirect("/");
        }
    })
    connection.end();
})

