const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
// Mongo Atlas
require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(`mongodb://zuhri:${process.env.MONGO_PASSWORD}@cluster0-shard-00-00-67zih.mongodb.net:27017,cluster0-shard-00-01-67zih.mongodb.net:27017,cluster0-shard-00-02-67zih.mongodb.net:27017/mangayuk?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin`);

const index = require('./routes/index');
const users = require('./routes/users');
const manga = require('./routes/manga');

const app = express();

app.use(cors())
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/manga', manga);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
      message: err.message,
      error: err
    })
  })
}

// error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.send({
    message: err.message,
    error: {}
  })
})

module.exports = app;
