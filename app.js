//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const app = express();
app.use(express.json()); 
app.use(express.urlencoded({extended: true}));
const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
/*const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/blog", {useNewUrlParser: true, useUnifiedTopology: true});
const postSchema = {
  title: String,
  content: String
}
const Post = mongoose.model(
  "Post", postSchema
);*/
const defaultPost = [homeStartingContent, aboutContent, contactContent];
app.get("/", function(req, res){
  /*Post.find({}, function(err, foundPost){
    if(foundPost.length === 0){
      Post.insertMany(defaultPost, function(err){
        if(!err){
          res.redirect("/");
          console.log(err);
        }else{
          console.log("success");
        }
      });
      res.redirect("/");
    }else{
      res.render("home", {start: homeStartingContent, newPost: posts});
    }
  });*/
  res.render("home", {start: homeStartingContent, newPost: posts});
});
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
const posts= [];

app.get("/about", function(req, res){
  res.render("about", {about: aboutContent});
});
 
app.get("/contact", function(req, res){
  res.render("contact", {contact: contactContent});
});
app.get("/compose", function(req, res){
  res.render("compose");
});
app.post("/compose", function(req, res){
  let inpt = req.body.title;
  let text = req.body.text;
  const post = {
    title: inpt,
    content: text
  }
  posts.push(post);
  res.redirect("/");

});
app.get("/posts/:postName", function(req, res){
   const requestTitle = _.lowerCase(req.params.postName);
   posts.forEach(function(post){
     const storedTitle = _.lowerCase(post.title);
     const storedContent = post.content;
     if(storedTitle === requestTitle){
       console.log("match found");
       res.render("post", {theTitle: storedTitle, theContent: storedContent})
     }
   });
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
