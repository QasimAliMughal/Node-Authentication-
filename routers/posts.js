const express = require('express');
const router = express();
const verify = require('./verifyToken');

const posts = [
    {title:"firstPost",description:"First Post Description"},
    {title:"secondPost",description:"Second Post Description"}
];


router.get('/posts',verify,(req,res)=>{

    res.json(posts);


});

module.exports = router;