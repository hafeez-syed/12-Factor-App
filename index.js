const path = require('path');
const express = require('express');
const proxy = require('express-http-proxy');
const morgan = require('morgan');
const baseImageUrl = process.env.BASE_IMAGE_URL;
const proxyBaseImageUrl = baseImageUrl
  ? proxy(baseImageUrl, {
      proxyReqPathResolver: function (req) {
        const newPath = baseImageUrl + req.path;
        console.log(`Proxying requests from ${req.path} to ${newPath}`);
        return baseImageUrl;//newPath;
      }
    })
  : express.static(path.join(__dirname, 'public/images'));

  const app = express();

app.use(morgan('combined'));
app.use('/images', proxyBaseImageUrl);

app.get('/', function (req, res) {
  var imgPath = baseImageUrl ? '/images' : '/images/herman.jpg';
  res.send('<h1>Hello from Herman</h1><img src="' + imgPath + '" />');
})

app.listen(8888, () => console.log('Web server running on port 8888'));

/*
require('dotenv').config();

var MongoClient = require('mongodb').MongoClient;

MongoClient.connect(process.env.MONGO_URI, function(err, db) {
  if (err) {
    console.log('Cannot connect to MongoDB!', err);
  } else {
    console.log('Connected to MongoDB!');
  }
});
*/