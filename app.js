const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require ('mongoose');

const app = express();

app.set('view engine' , 'ejs');

app.use(bodyParser.urlencoded({
  extended:true
}));

mongoose.connect('mongodb://localhost:270137/wikiDB'{
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.listen(3000,function{
  console.log("App is running on Port 3000");
})
