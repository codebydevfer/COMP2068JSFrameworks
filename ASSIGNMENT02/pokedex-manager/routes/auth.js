var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

// REGISTER FORM
router.get("/register", (req, res) => {
    res.render("register");
});

// REGISTER SUBMIT
router.post("/register", (req, res) => {
    User.register(
        new User({ username: req.body.username }),
        req.body.password,
        (err, user) => {
            if (err) return res.render("register", { error: err.message });
            passport.authenticate("local")(req, res, () => {
                res.redirect("/");
            });
        }
    );
});

// LOGIN FORM
router.get("/login", (req, res) => {
    res.render("login");
});

// LOGIN SUBMIT
router.post("/login",
    passport.authenticate("local", {
        failureRedirect: "/login"
    }),
    (req, res) => {
        res.redirect("/");
    }
);

// LOGOUT
router.get("/logout", (req, res) => {
    req.logout(() => {
        res.redirect("/");
    });
});

// GITHUB LOGIN
router.get("/auth/github", passport.authenticate("github", { scope: ["user:email"] }));

router.get("/auth/github/callback",
    passport.authenticate("github", { failureRedirect: "/login" }),
    (req, res) => res.redirect("/")
);

module.exports = router;
