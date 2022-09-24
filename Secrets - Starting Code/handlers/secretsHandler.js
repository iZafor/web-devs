const express = require("express"),
    router = express.Router();
const User = require("./database");


router.get(
    "/",
    (req, res) => {
        if (!req.isAuthenticated()) {
            return res.redirect("/login");
        }

        User.find({ "secrets": { $ne: null } }, async (err, foundUsers) => {
            if (err) {
                console.log(err);
                return res.redirect("/logout");
            }

            let allSecrets = [];
            await foundUsers.forEach(user => {
                allSecrets.push(...user.secrets);
            });
            await res.render("secrets", { secrets: allSecrets });
        });
    }
);




module.exports = router;