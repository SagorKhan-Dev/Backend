const nodemailer = require("nodemailer");

async function emailVerification(email) {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "sagorkhan.cit@gmail.com",
          pass: "scbhjaldrlmlgjbs",
        },
    });

    const info = await transporter.sendMail({
        from: '"Ghost 👻" <sagorkhan.cit@gmail.com>',
        to: email,
        subject: "Hello ✔",
        text: "Hello world?",
        html: '<div><img alt=""src=https://i.ibb.co/7KShdBT/pexels-karolina-grabowska-5422606.jpg style=width:200px><h1>Hello World!</h1><p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Hic, dicta saepe ducimus voluptates minima at repellat doloribus provident tempore culpa amet velit accusamus quidem corrupti atque cum cupiditate. Eum, velit?</p><button style="background:teal;padding:10px 20px;color:#fff;border:none">email verification done</button></div>',
    });
} 

module.exports = emailVerification