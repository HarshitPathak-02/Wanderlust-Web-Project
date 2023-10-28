const User = require("../models/user");

module.exports.showSignupForm = (req,res)=>{
    res.render("users/signup.ejs");
};

module.exports.signUp = async(req,res)=>{
    try {
        let {username, email, password} = req.body;
        const newUser = new User({email,username});
        const registeredUser = await User.register(newUser, password);
        req.login(registeredUser, (err)=>{
            if(err){
                return next(err);
            }
            req.flash("success","You have successfully registered to Wanderlust!");
            res.redirect("/listings");
        })
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
};

module.exports.showLoginForm = (req,res)=>{
    res.render("users/signin.ejs");
};

module.exports.logIn = async(req,res)=>{
    req.flash("success", "Welcome to Wanderlust!");
    let redirectUrl = res.locals.redirectUrl || "/listings"; 
    res.redirect(redirectUrl);
};

module.exports.logOut = (req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","You are succesfully logged out!");
        res.redirect("/listings");
    })
};