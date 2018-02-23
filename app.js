const express = require('express');
const path = require('path');
const http = require('http');
const app = express();
const server = require('http').Server(app);
var bodyparser = require('body-parser');
const send = require('./serverjs/mail.js');

var urlParser = bodyparser.urlencoded({extended:false});
app.use('/resources',express.static(path.join(__dirname,'resources')));
app.set('views',__dirname+'/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine','html')
//Get request matching
app.get('/' ,function(req,res){
  res.render('home',{result:"",result1:""});
});
app.post('/' ,urlParser, function(req,res){
  console.log(req.body);
  send.sendMail(req.body,function(result){
    if(result){
      res.render('home',{result:"light",result1:"Message Sent"});
    }
    else{
      res.render('home',{result:"warning",result1:"Message Not Sent"});
    }
  });
  
});
const port = process.env.PORT || 8080;
app.listen(port, function() {
console.log('Express server running on '+port);
})
