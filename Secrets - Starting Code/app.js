require("dotenv").config();
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const loginHandler = require("./handlers/loginHandler");
const registrationHandler = require("./handlers/registrationHandler");
const secretsHandler = require("./handlers/secretsHandler");
const secretSubmissionHandler = require("./handlers/secretSubmissionHandler");

const PORT = process.env.PORT || 3000;


/* Express app settings */
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));
app.set("view engine", "ejs");


/* Session settings */
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());


/* Route Handlers */
app.use("/login", loginHandler);
app.use("/register", registrationHandler);
app.use("/secrets", secretsHandler);
app.use("/submit", secretSubmissionHandler);


/* Home Route */
app.get(
    "/",
    (req, res) => {
        res.render("home");
    }
);

/* Logout Route */
app.get(
    "/logout",
    (req, res) => {
        req.logout((err) => { if (err) console.log(err) });
        res.redirect("/");
    }
);




app.listen(PORT, () => console.log(`App is running on port ${PORT}`));
