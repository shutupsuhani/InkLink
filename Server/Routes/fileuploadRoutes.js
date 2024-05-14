const express=require('express')
const app=express()
const multer=require('multer')
const upload=multer({dest:'uploads/'})
const router=express.Router()

router.post('/upload',upload.single('file'),async(req,res)=>{
    try {
        // Check if file was uploaded
        if (!req.file) {
          return res.status(400).send('No file uploaded');
        }
    
        // Access the uploaded file details
        const { originalname, mimetype, size, path } = req.file;
        console.log('Uploaded file:', originalname, mimetype, size);
    
        // Send success response
        res.send("File Uploaded Successfully");
      } catch (err) {
        // Handle any errors that occur during file upload
        console.error("File upload error:", err);
        res.status(500).send("File upload failed");
      }
})


module.exports=router;