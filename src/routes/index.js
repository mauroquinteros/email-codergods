const { Router } = require("express");
const router = Router();
const nodemailer = require("nodemailer");

const { emails } = JSON.parse(process.env.EMAILS);

router.get("/", (req, res) => {
  res.json({
    message: "Hello World",
    app: "Coder Gods",
    email: process.env.MAILER,
  });
});

router.post("/users", (req, res) => {
  const data = req.body;
  res.json({
    data,
    date: new Date(),
  });
});
router.post("/send", (req, res) => {
  try {
    const { userName, userEmail, userMessage } = req.body;

    contentMessage = `
      <h1>User Information</h1>
      <ul>
        <li>User Name: ${userName}</li>
        <li>User Email: ${userEmail}</li>
        <li>User Message: ${userMessage}</li>
      </ul>
    `;

    const transporter = nodemailer.createTransport({
      host: "mail.privateemail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAILER,
        pass: process.env.PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    transporter.sendMail(
      {
        from: `${process.env.NAME} <${process.env.MAILER}>`,
        to: [...emails],
        subject: "Contacto CoderGods",
        html: contentMessage,
      },
      (err, info) => {
        if (err) {
          console.log(err);
          res.status(500).json({
            success: false,
            message: "Lo siento, inténtelo más tarde.",
          });
        } else {
          console.log(info);
          res.status(201).json({
            email_id: info.messageId,
            success: true,
            message:
              "Gracias por contactarte con nosotros,te responderemos pronto.",
          });
        }
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Lo siento, inténtelo más tarde.",
    });
  }
});

module.exports = router;
