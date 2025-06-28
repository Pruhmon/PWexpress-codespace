//include Express
const express = require('express');

//server will listen on this port
const port = 3000;

//create instance of Express app
const app = express();
const data = require("./test.json");
//includes .env file for credentials
require('dotenv').config();
//manages database connectivity
require('./models/mongoose');

app.set("view engine", "ejs");
app.use(express.static("public")); 

//allows us to delete records
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

//create session data
const session = require('express-session');
app.use(session({ secret: 'secret', resave: false, saveUninitialized: true }));
app.use(express.urlencoded({ extended: true }));

//pass session data to routes
app.use((req, res, next) => {
  res.locals.message = req.session.message;
  delete req.session.message;
  next();
});

const recipeRoutes = require('./routes/recipes');
app.use('/recipes', recipeRoutes);

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


