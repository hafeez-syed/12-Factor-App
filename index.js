const path = require('path');
const express = require('express');
const proxy = require('express-http-proxy');
const baseImageUrl = process.env.BASE_IMAGE_URL;
const proxyBaseImageUrl = baseImageUrl
  ? proxy(baseImageUrl, {
      proxyReqPathResolver: function (req) {
        const newPath = baseImageUrl + req.path;
        console.log(newPath);
        return newPath;
      }
    })
  : express.static(path.join(__dirname, 'public/images'));
const app = express();

app.use('/images', proxyBaseImageUrl);

app.listen(8880);










require('dotenv').config();

var MongoClient = require('mongodb').MongoClient;

MongoClient.connect(process.env.MONGO_URI, function(err, db) {
  if (err) {
    console.log('Cannot connect to MongoDB!', err);
  } else {
    console.log('Connected to MongoDB!');
  }
});
