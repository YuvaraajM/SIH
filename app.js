var express=require("express"),
    mongoose=require('mongoose'),
    bodyParser=require('body-parser');

var app=express();

app.set("view-engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.render("index.ejs");
});

app.get("/home",function(req,res){
    res.render("index");
});

app.get("/signup",(req,res)=>{
    res.render("signup.ejs");
});

app.get("/signin",(req,res)=>{
    res.render("signin.ejs");
});

app.get("/about",(req,res)=>{
    res.render("about.ejs");
});

app.listen("3000",function(){
    console.log("Server is Running!");
});