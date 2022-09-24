const express = require("express");

const app = express();

app.get(
    "/",
    (req, res) => {
        res.send("<h1>Hello</h1>");
    }
);

app.get(
    "/contact",
    (req, res) => {
        res.send("<h1>Contact me at: izafor65@gmail.com</h1>");
    }
);
app.get(
    "/about",
    (req, res) => {
        res.send("<h1>Hi! there, this is Zafor.</h1>");
    }
);

app.listen(
    3000,
    () => console.log("Server is listening to port 3000")
);