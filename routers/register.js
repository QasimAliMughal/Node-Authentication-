const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {registerValidation} = require('../validation');


router.post('/register', async (req,res)=>{
    // res.json({message: "Welcome to our website"});
    try{
        const {error} = await registerValidation(req.body);
        if (error) return res.send(error.details[0].message)

        //now => save the schema to database
        //try that slow MONGODB ATLAST TOO hahahaha

        const emailExist = await User.findOne({email:req.body.email})
        if(emailExist) return res.json({message: "Email exists already!!"})


        try {
        
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password,salt);
            const newUser = new User({
                username:req.body.username,
                email:req.body.email,
                password:hashedPassword
            });
        
            const savedUser = await newUser.save();
            res.json(savedUser)


        } catch (error) {

            res.json({error:error})
            
        }
        



    }
    catch(error){
        // console.log('Error occurred!'+error);
        res.send('Error occurred!'+error);
        
    }
});


router.post('/login',async (req,res)=>{

    const {error} = await registerValidation(req.body);
    if(error) return res.send(error.details[0].message)

    const user = await User.findOne({email:req.body.email})
    if(!user) return res.send("Invalid Email")

    const validPassword = await bcrypt.compare(user.password,req.body.password)
    if(!validPassword) return res.send("Invalid Password")


    const token = jwt.sign({_id:user._id},process.env.SECRET_TOKEN);
    res.status(200).header('auth-token',token).send(token);


    res.send('logged in successfully!')


});




module.exports = router;