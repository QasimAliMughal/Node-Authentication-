const express = require('express');
const app = express();
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const posts = require('./routers/posts');

dotenv.config();
const registerRouter = require('./routers/register');



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/',registerRouter);
app.use('/',posts);



app.get('/',function(req,res){
    res.send("welcome you big shit!");
});

mongoose.connect(process.env.DB_CONNECTION_TWO,{useNewUrlParser:true,useUnifiedTopology:true},()=>{
    console.log('connected successfully!');
    
});

app.listen(5000,()=>{
    console.log('server started to listen at 5000');
    
});