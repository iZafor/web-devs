const express = require("express");
const bodyParser = require("body-parser");
const qrcode = require(`qrcode`);
const multer = require("multer");
const path = require("path");
const _ = require("lodash");
const fs = require("fs");
const passwordManager = require(`${__dirname}/randomPassword.js`);
const qrToText = require(`${__dirname}/qrCodeToText.js`);

const dir = "./uploads";
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
}

const UPLOADS_FOLDER = path.join(__dirname, "uploads");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, UPLOADS_FOLDER);
    },
    filename: (req, file, cb) => {
        const fileExt = path.extname(file.originalname);
        const fileName = _.kebabCase(file.originalname.replace(fileExt, "")) + "-" + Date.now() + fileExt;
        cb(null, fileName);
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1000000
    },
    fileFilter: (req, file, cb) => {
        if (
            file.mimetype === "image/png" ||
            file.mimetype === "image/jpg" ||
            file.mimetype === "image/jpeg"
        ) {
            cb(null, true);
        } else {
            cb(new Error("Only .jpg, .png and .jepeg files are allowed."));
        }
    }
});


const app = express();

const PORT = process.env.PORT || 3000;

const options = {
    errorCorrectionLevel: 'H',
    type: 'image/jpeg',
    quality: 0.3,
    margin: 1,
    color: {
        dark: "#010599FF",
        light: "#FFBF60FF"
    }
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");

const pageTitleForHome = "Random Password Generator";
const pageTitleForTextToQr = "Text to QrCode";
const pageTitleForQrToText = "QrCode to Text";

/* Random Passworword Generator Route */
app.get(
    "/",
    (req, res) => {
        res.render("passwordGenerator", { pageTitle: pageTitleForHome, password: "", img: "" });
    }
);

app.post(
    "/",
    (req, res) => {
        const passwordLength = Math.floor(Math.random() * 13) + 8;
        const password = passwordManager.getPassword(passwordLength);
        qrcode.toDataURL(password, options, (err, url) => {
            const image = url;
            res.render("passwordGenerator", { pageTitle: pageTitleForHome, password: password, img: image });
        });
    }
);


/* Text to Qr Code Generator Route */
app.get(
    "/text",
    (req, res) => {
        res.render("textToQrCode", { pageTitle: pageTitleForTextToQr, img: "" });
    }
);

app.post(
    "/text",
    (req, res) => {
        const text = req.body.usrInput.trim();
        if (text) {
            qrcode.toDataURL(text, options, (err, url) => {
                res.render("textToQrCode", { pageTitle: pageTitleForTextToQr, img: url });
            });
            return
        }
        res.redirect("/text");
    }
);


/* Qr Code to Text Generator Route */
app.get(
    "/qr-to-text",
    (req, res) => {
        res.render("qrCodeToText", { pageTitle: pageTitleForQrToText, heading: "", text: "" });
    }
);

app.post(
    "/qr-to-text",
    upload.single("qrCode"),
    (req, res) => {
        const path = req?.file.path;

        qrToText.extractText(path).catch((err) => {
            if (err) {
                res.render("qrCodeToText", { pageTitle: pageTitleForQrToText, heading: "⚠️", text: "Error! Pleaese check your file." });
            }
        }).then((text) => {
            res.render("qrCodeToText", { pageTitle: pageTitleForQrToText, heading: "Text", text: text });
        });
    }
);


/* Error Handler */
app.use((err, req, res, next) => {
    if (err) {
        if (err instanceof multer.MulterError) {
            res.status(500).send("There was an error while uploading the file! Please try again.");
        } else {
            res.status(500).send(err.message);
        }
    }
});

app.listen(PORT, () => console.log(`App is running on port ${PORT}`));