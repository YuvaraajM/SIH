var express = require("express"),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

var app = express();

app.set("view-engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


//MongoDB Conection
const URI = 'mongodb+srv://Yuva_User:Yuva_User@datastore-fnmex.mongodb.net/test?retryWrites=true&w=majority';

const connectDB = async () => {
    await mongoose.connect(URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    });
    console.log("DB connected!.....");
};
connectDB();

var regSchema = new mongoose.Schema({
    username: String,
    password: String,
    phoneNo: String
});

var Reg = new mongoose.model("Reg", regSchema);

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
    Reg.create(req.body.reg,(err,newUser)=>{
        if(err){
            console.log("Error in user creation");
        }else{
            res.redirect("/");
        }
    });
    // var username = req.body.username;
    // var password = req.body.password;
    // Reg.findOne({ username: username })
    //     .then(userDoc => {
    //         if (userDoc) {
    //             return res.redirect("/signup");
    //         }
    //         var hashedPassword= bcrypt.hash(password, 12);
    //             const register = new Reg({
    //                 username: username,
    //                 password: hashedPassword
    //         });
    //         return register.save();
    //     });
});

app.post("/signin", (req, res) => {
    var username = req.body.username;
    var password = req.body.password;


    // console.log(username,password);
    Reg.findOne({ username:username, password: password })
        .then(user => {
            if (!user) {
                res.redirect("/signin");
            }
            else {
                res.redirect("/");
            }
        });
    // var cursor = collection('regSchema').find({username:this.username ,password:this.password});
    // if(cursor){
    //     res.render("/");
    // }else{
    //     res.render("/signin");
    // }
})
app.get("/signin", (req, res) => {
    res.render("signin.ejs");
});

app.get("/about", (req, res) => {
    res.render("about.ejs");
});

app.listen("3000", function () {
    console.log("Server is Running!");
});