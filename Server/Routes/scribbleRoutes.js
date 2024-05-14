const express=require("express");
const router=express.Router();
const Scribble=require('../Model/Scribble.js');

router.post('/create',async (req,res)=>{
       const {title,content,userId}=req.body;

       try{
         const newScribble=new Scribble({title,content,userId})
         await newScribble.save();

         res.status(201).json({ status: 'success', data: newScribble });
       } catch(err){
            res.status(500).json({ status: 'error', message: 'Failed to create scribble' });
       }
})

module.exports=router;








