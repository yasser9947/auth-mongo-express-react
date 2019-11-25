const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Game = require('../model/Game');

router.post('/new' , (req,res)=>{

    newGame = req.body
    Game.create(newGame)
    .then(game => res.send('added hage sescufully'))
    .catch(err => res.send(err))

})
router.get('/allgame' , (req,res)=>{

    
    Game.find()
    .then(games => res.json(games))
    .catch(err => res.send(err))

})

router.get('/:id' , (req,res)=>{

   
    Game.findById(req.param.id)
    .then(games => res.json(games))
    .catch(err => res.send(err))

})





module.exports = router
