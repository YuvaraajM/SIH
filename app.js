var express = require("express"),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');
var LocalStrategy = require("passport-local").Strategy;
var passport = require("passport");
var passportLocalMongoose = require("passport-local-mongoose");
require('dotenv/config');
var User = require("./models/user.js");

var app = express();

app.set("view-engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

//MongoDB Conection
const URI = process.env.DB_CONNECTION;

const connectDB = async () => {
    await mongoose.connect(URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    });
    console.log("DB connected!.....");
};
connectDB();
//Passport
app.use(require('express-session')({
    secret: "hello everyone",
    resave: false,
    saveUninitialized: false
}));
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(passport.initialize());
app.use(passport.session());

// var regSchema = new mongoose.Schema({
//     username: String,
//     password: String,
//     phoneNo: String
// });

// var Reg = new mongoose.model("Reg", regSchema);

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.get("/home", function (req, res) {
    res.render("index");
});

app.get("/signup", (req, res) => {
    res.render("signup.ejs");
});

app.post("/signup", (req, res) => {
//     Reg.create(req.body.reg, (err, newUser) => {
//         if (err) {
//             console.log("Error in user creation");
//         } else {
//             res.redirect("/");
//         }
//     });
// });
    req.body.username
    req.body.password
    User.register(new User({ username: req.body.username }), req.body.password, (err, user) => {
        if (err) {
            console.log(err);
            res.redirect("/signup");
        }
        passport.authenticate("local")(req, res, function () {
        res.redirect("/");
        });
    });
});

app.get("/signin", (req, res) => {
    res.render("signin.ejs");
});

// app.post("/signin", (req, res) => {
    // var username = req.body.username;
    // var password = req.body.password;
    // Reg.findOne({ username: username, password: password },(err)=>{
    //     if (err) {
    //          res.redirect("/signin");
    //     }
    //     else {
    //         res.redirect("/");
    //     }
    // })
        // .then(user => {
            // if (!user) {
            //     res.redirect("/signin");
            // }
            // else {
            //     res.redirect("/");
            // }
        // });
// });


app.post("/signin", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/signin"
}), function (req,res) {
    res.redirect("/");
});

app.get("/about", (req, res) => {
    res.render("about.ejs");
});

app.listen(process.env, function () {
    console.log("Server is Running!");
});