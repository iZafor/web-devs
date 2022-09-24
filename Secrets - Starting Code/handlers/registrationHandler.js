const express = require("express"),
    router = express.Router();
const passport = require("passport");
const User = require("./database");


router.get(
    "/",
    (req, res) => {
        res.render("register");
    }
);

router.post(
    "/",
    (req, res) => {
        if (!req.body.username || !req.body.password) {
            return res.redirect("/register");
        }

        User.register(new User({ email: req.body.username }), req.body.password, async (err, user) => {
            if (err) {
                return res.send(err.message);
            }

            try {
                await passport.authenticate("local")(req, res, () => {
                    res.redirect("/secrets");
                })
            } catch (err) {
                console.log(err);
                res.redirect("/register");
            }
        });
    }
);



module.exports = router;