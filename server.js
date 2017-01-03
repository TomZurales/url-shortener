var express = require('express');
var path = require('path');
var pug = require('pug');
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('port', (process.env.PORT || 5000));

app.set('view engine', 'pug');

app.get('/', function(req, res){
  res.render('index')
});

//------------------------------------------------------------------------

/*lets require/import the mongodb native drivers.
var mongodb = require('mongodb');

//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;

// Connection URL. This is where your mongodb server is running.

//(Focus on This Variable)
var url = process.env.MONGOLAB_URI;
//(Focus on This Variable)

// Use connect method to connect to the Server
  MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    console.log('Connection established to', url);

    // do some work here with the database.

    //Close connection
    db.close();
  }
});

//-------------------------------------------------------------------------------*/

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
