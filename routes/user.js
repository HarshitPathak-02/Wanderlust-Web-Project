const express = require("express");
const router = express.Router();
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const {saveRedirectedUrl} = require("../middleware");
const userController = require("../controller/users");

router
    .route("/signup")
    .get(userController.showSignupForm)
    .post(wrapAsync(userController.signUp))

router
    .route("/login")
    .get(userController.showLoginForm)
    .post(saveRedirectedUrl,passport.authenticate("local",{failureRedirect:"/login", failureFlash:true}), userController.logIn)


router.get("/logout", userController.logOut);

module.exports = router;