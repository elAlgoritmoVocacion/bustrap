var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cfenv = require('cfenv');
var watson = require('watson-developer-cloud');
var fs = require('fs');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();


var speech_to_text = watson.speech_to_text({
  url: 'https://stream.watsonplatform.net/speech-to-text/api',
  username: 'a578e4e0-da93-4f1f-86f0-9fc21ec34253',
  password: 'ZhDnx3dawEZq',
  version: 'v1'
});

var params = {
  content_type: 'audio/wav',
  continuous: true,
  interim_results: true
};

// Create the stream.
var recognizeStream = speech_to_text.createRecognizeStream(params);

// Pipe in the audio.
//fs.createReadStream('output.wav').pipe(recognizeStream);

// Pipe out the transcription to a file.
recognizeStream.pipe(fs.createWriteStream('transcription.txt'));

// Get strings instead of buffers from 'data' events.
recognizeStream.setEncoding('utf8');

// Listen for events.
recognizeStream.on('data', function(event) { onEvent('Data:', event); });
recognizeStream.on('results', function(event) { onEvent('Results:', event); });
recognizeStream.on('error', function(event) { onEvent('Error:', event); });
recognizeStream.on('close-connection', function(event) { onEvent('Close:', event); });

// Displays events on the console.
function onEvent(name, event) {
    console.log(name, JSON.stringify(event, null, 2));
};

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});




module.exports = app;
app.listen(3000);
