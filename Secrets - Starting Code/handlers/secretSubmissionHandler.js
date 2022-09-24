const express = require("express"),
    router = express.Router();
const User = require("./database");


router.get(
    "/",
    (req, res) => {
        if (!req.isAuthenticated()) {
            return res.redirect("/login");
        }

        res.render("submit");
    }
);


router.post(
    "/",
    (req, res) => {
        if (!req.isAuthenticated()) {
            return res.redirect("/login");
        }

        User.findById(req.user._id, async (err, foundUser) => {
            if (err) {
                console.log(err);
                return res.redirect("/submit");
            }

            if (!foundUser) {
                return res.redirect("/submit");
            }

            try {
                await foundUser.secrets.push(req.body.secret);
                await foundUser.save();

                await res.redirect("/secrets");
            } catch (err) {
                console.log(err);
                res.redirect("/submit");
            }
        });
    }
);



module.exports = router;