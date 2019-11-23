const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


process.env.SECRET_KEY = 'secret'
// register
router.post('/register', (req, res) => {
    const newUser = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
    }

    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    newUser.password = hash
                    User.create(newUser)
                        .then(user => res.json({ msg: "user created", userInf: newUser }))
                        .catch(err => res.send(err))
                })

            }
            else {
                res.send(`email used !!! chang the email ` + user)
            }

        }).catch(err => res.send(err))
})
// login
router.post('/login', (req, res) => {

    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                if (bcrypt.compareSync( req.body.password,user.password)) {
                    user.password = ""
                    var paylod = { user }
                    let token = jwt.sign(paylod, process.env.SECRET_KEY, { expiresIn: 1440 })
                    res.send(token)
                }
                //    if password not the same 
                else {
                    res.send("password is not currect")
                }
            }
            else {
                res.send("email is not found")
            }
        }).catch(err => res.send(err))
})

// get user 
// router.get('/profile' , (req , res)=>{
//     var decoded = jwt.verify(req.body.token , 'secret')
// console.log(decoded);

//     User.findById(decoded.user._id)
//     .then(user => user?  res.json(decoded.user) : res.send("token is not correct"))
//     .catch(err => res.send("err"))

// })


module.exports = router
