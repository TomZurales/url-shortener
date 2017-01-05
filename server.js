var express = require('express');
var path = require('path');
var pug = require('pug');
var mongodb = require('mongodb');
var app = express();

var url = process.env.MONGOLAB_URI;
var MongoClient = mongodb.MongoClient;
var url_num = 1;

clearDB();

app.set('views', path.join(__dirname, 'views'));
app.set('port', (process.env.PORT || 5000));

app.set('view engine', 'pug');

app.get('/', function(req, res){
  res.render('index');
});

app.get('/new/:input_url*', function(req, res){
  var original_url = req.url.slice(5);
  var short_object;
  if(validURL(original_url)){
    MongoClient.connect(url, function (err, db) {
      if (err){
        console.log('Unable to connect to the mongoDB server. Error:', err);
      }
      else{
        console.log('Connection established');
        var urls = db.collection('urls');
        short_object = { "original_url": original_url, "short_id": padToFour(url_num)};
        url_num++;
        urls.insert(short_object, function (err, result) {
          if (err){
            console.log(err);
          }
          else{
            console.log('Inserted new URL into database');
            console.log(short_object);
          }
        });
        db.close();
      }
    });
    res.end(JSON.stringify({ "original_url": original_url, "short_id": 'http://localhost:5000/' + String(padToFour(url_num))}));
  }
  else{
    res.end(JSON.stringify({"original_url": 'invalid_url', "short_url": null}));
  }
});

app.get('/:url_code', function(req, res){
  var url_code = req.params.url_code;
  MongoClient.connect(url, function (err, db) {
    if (err){
      console.log('Unable to connect to the mongoDB server. Error:', err);
    }
    else{
      var urls = db.collection('urls');
      urls.findOne({"short_id": url_code}, function(err, result) {
        if (err){
          console.log(err);
        };
        if (result) {
          console.log('Found ' + result);
          console.log('Redirecting to: ' + result.original_url);
          res.redirect(result.original_url);
        }
        else {
          res.send({"error": "This url is not on the database."});
        }
      });
    }
  });
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

//Helper Functions Time!!!
function padToFour(number) {
  if (number<=9999) { number = ("000"+number).slice(-4); }
  return number;
}

function clearDB() {
  MongoClient.connect(url, function (err, db) {
    if (err){
      console.log('Unable to connect to the mongoDB server. Error:', err);
    }
    else{
      console.log('Connection established to', url);
      var urls = db.collection('urls');
      urls.drop(function(err, data){
        if(err){
          console.log("Database Cleared!")
        }
      });
      db.close();
    }
  });
}

function validURL(str) {
  var pattern = new RegExp( '(http|ftp|https)://[\\w-]+(\\.[\\w-]+)+([\\w-.,@?^=%&:/~+#-]*[\\w@?^=%&;/~+#-])?' );
  return pattern.test(str);
}
