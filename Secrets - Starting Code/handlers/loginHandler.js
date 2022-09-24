const express = require("express"),
    router = express.Router();
const passport = require("passport");
const User = require("./database");



router.get(
    "/",
    (req, res) => {
        res.render("login");
    }
);

router.post(
    "/",
    (req, res) => {
        if (!req.body.username || !req.body.password) {
            return res.redirect("/login");
        }

        const user = new User({
            email: req.body.username,
            password: req.body.password
        });

        req.login(user, async (err) => {
            if (err) {
                console.log(err);
                return res.redirect("/login");
            }

            try {
                await passport.authenticate("local")(req, res, () => {
                    res.redirect("/secrets");
                });
            } catch (err) {
                console.log(err);
                res.redirect("/login");
            }
        });
    }
);



module.exports = router;