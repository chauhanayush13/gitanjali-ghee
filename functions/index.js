const functions = require("firebase-functions");
const nodemailer = require("nodemailer");
const cors = require("cors");

const corsHandler = cors({ origin: true }); // Enable CORS for all origins

const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: gmailEmail,
        pass: gmailPassword,
    },
});

exports.sendOrderEmail = functions.https.onRequest((req, res) => {
    corsHandler(req, res, async () => {  // Wrap function in CORS
        res.set("Access-Control-Allow-Origin", "*");  // ✅ Explicitly allow all origins
        res.set("Access-Control-Allow-Methods", "GET, POST");
        res.set("Access-Control-Allow-Headers", "Content-Type");

        if (req.method == "OPTIONS") {
            return res.status(204).send('');
        }

        const { email, subject, message } = req.body;

        const mailOptions = {
            from: `My Store <${gmailEmail}>`,
            to: email,
            subject: subject,
            text: message,
        };

        try {
            await transporter.sendMail(mailOptions);
            res.set("Access-Control-Allow-Origin", "*"); // ✅ Allow frontend access
            return res.status(200).json({ success: "Email sent successfully!" });
        } catch (error) {
            console.error("Error sending email:", error);
            return res.status(500).json({ error: "Failed to send email" });
        }
    });
});
