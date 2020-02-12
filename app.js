const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require ('mongoose');

const app = express();

app.set('view engine' , 'ejs');

app.use(bodyParser.urlencoded({
  extended:true
}));

mongoose.connect("mongodb://localhost:27017/wikiDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const articleSchema =  {
  title: String,
  content: String
};

const Article = mongoose.model("Article", articleSchema);

app.get("/articles", function(req, res) {
  Article.find(function(err, foundArticles) {
    if(!err) {
      console.log("200");
      res.send(foundArticles);
    } else {
      console.log("Something went wrong");
    }
  });
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
