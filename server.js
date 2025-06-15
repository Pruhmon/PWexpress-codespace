//include Express
const express = require('express');

//server will listen on this port
const port = 3000;

//create instance of Express app
const app = express();
const data = require("./test.json");
app.set("view engine", "ejs");
app.use(express.static("public")); 
//index/home URL
app.get('/',(req,res)=>{
  res.render("pages/index", {title:"Home"});
});

//about page/url
app.get('/about',(req,res)=>{
  res.render("pages/about", {title:"about"});
});

app.get('/valorant',(req,res)=>{
  res.render("pages/valorant", {title:"valorant"});
});

app.get('/obama',(req,res)=>{
  res.render("pages/obama", {title:"obama"});
});

// Users list page
app.get("/users", (req, res) => {
  res.render("users/index", {
    title: "Users",
    users: data,
  });
});

// User view page
app.get("/users/view/:id", (req, res) => {
  const user = data.find(u => u.id == req.params.id);
  res.render("users/view", {
    title: "User Page",
    user,
    bio_data: user.bio_data,
  });
});
//Set server to listen for requests
app.listen(port, () => {
  console.log(`Server running at port: ${port}`);
});

