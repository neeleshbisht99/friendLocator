const express = require('express');
const joi =require('@hapi/joi');
const router = express.Router();

const db=require('../db');
const messages=db.get('messages');

const schema = joi.object().keys({
    name: joi.string().alphanum().min(1).max(30).required(),
    message: joi.string().min(1).max(100).required(),
    latitude:joi.number().required().min(-90).max(90),
    longitude:joi.number().required().min(-180).max(180),
});

router.get('/',(req, res,next) => {
 messages.find({})
   .then((docs)=>{
     res.send(docs)})
});

router.post('/',(req,res,next)=>{
  console.log(req.body);
   const result=joi.validate(req.body,schema);
    if(result.error===null)
    {
      const userMessage = {
         name:req.body.name,
         message:req.body.message,
         latitude:req.body.latitude,
         longitude:req.body.longitude,
         date:new Date()
      };
      messages
      .insert(userMessage)
      .then(insertedMessage =>{
        res.json(insertedMessage);
      });
    }
    else{
      next(result.error);
    }
});

module.exports = router;
