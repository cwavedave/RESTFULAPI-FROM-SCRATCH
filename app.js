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

app.route("/articles")


.get(function(req, res) {
  Article.find(function(err, foundArticles) {
    if(!err) {
      console.log("200");
      res.send(foundArticles);
    } else {
      console.log("Something went wrong");
    }
  });
})

.post(function(req,res) {
  console.log(req.body.title);
  console.log(req.body.content);

const post = Article ({
  title:req.body.title,
  content:req.body.content
    });

 post.save(function(err) {
   if (!err) {
     res.send("Successfully added a new article") }
     else {
    console.log(err);
     res.send(err);
          }
   });
  })

  .delete(function(req,res) {
    Article.deleteMany(function(err) {
      if(!err) {
        res.send("Successfully deleted all articles")
    }
      else {
        res.send(err);
      }
    })
  });


  app.route("/articles/:articleName")


  .get(function(req,res) {
    Article.findOne({title:req.params.articleName},function(err,foundArticle) {
      if (foundArticle) {
        res.send(foundArticle);
      } else {
          res.send("No Articles found matching that title");
        }
      })
  })



app.listen(3000, function() {
  console.log("Server started on port 3000");
});
