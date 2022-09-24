const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");


/* Connecting to the Database */
mongoose.connect(process.env.DB_URI, (err) => {
    if (err) return console.log(err);
    console.log("Connected to the Database successfuly.")
});

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    secrets: [String]
});

userSchema.plugin(passportLocalMongoose, { usernameField: "email" });

const User = mongoose.model("User", userSchema);


passport.use(new LocalStrategy(async (email, password, cb) => {
    const authenticate = User.authenticate();

    try {
        await authenticate(email, password, (err, result) => {
            if (err) return cb(err);
            if (!result) return cb(null, false, { message: "inccorect email or password." })
            return cb(null, result);
        });
    } catch (err) {
        console.log(err);
    }
}));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());




module.exports = User;