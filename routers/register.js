const express = require('express');
const router = express.Router();
const User = require('../models/User');

const {registerValidation} = require('../validation');


router.post('/api/auth', async (req,res)=>{
    // res.json({message: "Welcome to our website"});
    try{
        const value = await registerValidation(req.body);
        res.send(value);
        //now => save the schema to database
        //try that slow MONGODB ATLAST TOO hahahaha
    }
    catch(error){
        // console.log('Error occurred!'+error);
        res.send('Error occurred!'+error);
        
    }
});

module.exports = router;