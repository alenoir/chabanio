var gzippo = require('gzippo');
var morgan = require('morgan');
var express = require('express');
var app = express();
 
app.use(morgan('dev'));
app.use(gzippo.staticGzip("" + __dirname + "/dist"));
app.listen(process.env.PORT || 5000);