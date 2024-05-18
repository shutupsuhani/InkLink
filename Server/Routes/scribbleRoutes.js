const express = require("express");
const router = express.Router();
const Scribble = require("../Model/Scribble.js");
const mongoose = require("mongoose");

//create a scribble
router.post("/create/:id", async (req, res) => {
  const { title, content } = req.body;
  const userId = req.params.id; // Assuming user ID is passed as a parameter

  try {
    const newScribble = new Scribble({ title, content, userId });
    await newScribble.save();
    console.log(newScribble)
    res.status(201).json({ status: "success", data: newScribble });
  } catch (err) {
    console.error("Error occurred while creating a scribble:", err);
    res
      .status(500)
      .json({ status: "error", message: "Failed to create scribble" });
  }
});

// get all the scribbles of authenticated user

router.get("/getallscribbles/:id", async (req, res) => {
  console.log("accepting the request to get all the scribbles of the user");
  try {
    // Fetch scribbles belonging to the authenticated user
    const userId = req.params.id; // Assuming user ID is stored in _id field of req.user
    const scribbles = await Scribble.find( {userId} );
    res.json(scribbles);
    console.log("found all the scribbles of the user");
  } catch (err) {
    res
      .status(500)
      .json({ status: "error", message: "failed to get all scribbles" });
  }
     
});

//get a scribbles of authenticated user

router.get("/getscribble/:_id", async (req, res) => {
 
  try {
    const ScribbleId = req.params._id;
    if (!mongoose.Types.ObjectId.isValid(ScribbleId)) {
      return res.status(400).json({ error: "objectId is not valid" });
    }

    const scribble = await Scribble.findById(ScribbleId);
    res.json(scribble);
  } catch (err) {
    res
      .status(500)
      .json({ status: "error", message: "failed to get the scribble" });
  }
});

//delete a scribble

router.delete("/delete/:_id",async (req,res)=>{
    try{
      const scribble=await Scribble.findById(req.params._id);
       
      if(!scribble){
         return res.status(401).json({error:'scribble not found'})
      }

        await scribble.deleteOne();
        res.json({ message: 'scribble deleted successfully', scribble });

    } catch(err){
      res
      .status(500)
      .json({ status: "error", message: "failed to delete the scribble" });
    }
})

module.exports = router;
