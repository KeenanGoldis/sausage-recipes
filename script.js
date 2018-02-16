var express = require('express');
var mysql = require('mysql');
var app = express();

var connection = mysql.createPool({
  //properties...
  connectionLimit: 50,
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'sausagerecipes'
});

//tempCont is used so that the server won't crash if too many people use it at the same time.
//https://www.youtube.com/watch?v-hGZX_SA7IYg at 18 minutes for explanation..
app.get('/', function (request, response){
connection.getConnection(function(error, tempCont){
  if(!!error) {
    tempCont.release();
    console.log('Error');
  } else {
    console.log('Connected!');
    tempCont.query("SELECT * FROM allsausagerecipes", function(error, rows, fields){
      tempCont.release();
      if(!!error) {
        console.log('Error in the query');
      } else {
        response.json(rows);
      }
    });
    }
  });
});
app.listen(1337);
