require('dotenv').config();
const express = require('express');
const photos = require("./data/photos.json");
const albums =require("./data/albums.json");
const users = require("./data/users.json");
const jwt = require("jsonwebtoken");

const app = express();

app.use(express.json());

app.post('/login', function(req,res){

  const userId = req.body.userId;
  const this_user = {userId: userId};
  const accessToken = jwt.sign(this_user, process.env.TOKEN);
  res.json({accessToken: accessToken});
  

});


app.get('/users',function(req,res){

  res.json(users);  

});

app.get('/albums',authen, function(req,res){

  res.json(albums.filter(albums=>albums.userId == req.this_user.userId));  

});


app.get('/photos',authen, function(req,res){

  res.json(photos.filter(photos=>photos.albumId == req.this_user.userId));  

});


app.get('/albums/:id',authen,function(req,res){

  let id = req.params.id;
  console.log(id);
  res.json(albums.filter(albums=>albums.id == id));  

});


app.get('/photos/:id',authen,function(req,res){

  let id = req.params.id;
  res.json(photos.filter(photos=>photos.id == id));  

});


function authen(req,res,next){
  const authHeader = req.headers['authorization'];
  if(!authHeader) return res.sendStatus(401);//token is null
  const token = authHeader.split(' ')[1];
  jwt.verify(token, process.env.TOKEN, function(err,this_user){
    if(err) return res.sendStatus(403);//incorrect token
    req.this_user = this_user;
    next();
  })
}


module.exports = app.listen(3000);