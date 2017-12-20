var express = require('express');
var router = express.Router();
var jswt = require('jsonwebtoken');





const User = require('../model/users')

router.get('/', function(req, res){
    res.send("hello! the api is at http://localhost/api");
})

router.get('/users', function(req, res){
    User.find({}, function(err, users){
        res.json(users);
    })
})

router.get('/setup', function(req, res){
    var newUser1 = new User({
        name: 'Gabriel Ezenwankwo',
        password: 'password',
        admin: true
    })    
    newUser1.save(function(err, user){
        if(err){
            console.log(err);
        } else{
            console.log("user saved successfully");
            res.json({success: true})
            res.json(user)
        }
    })

    })    
    
router.post('/authenticate', function(req, res){
    User.findOne({name:req.body.name}, function(err, user){
        if(err){
            console.log(err)
        } 
        if(!user){
            res.json({success: false, message: "Authentication Failed. user not found"})
        } else if(user){
            if(user.password != req.body.password){
                res.json({success: false, message: "Authentication Failed. wrong passowrd"})
            } else {
                const payload ={
                    admin: user.admin
                };

                var token = jswt.sign(payload, 'iloveschotchyscotch');
                res.json({
                    success: true, 
                    message: "Enjoy your token!",
                    token: token
                })
            }
        }
    })
})



module.exports = router