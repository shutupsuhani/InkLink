const express=require('express')
const mongoose=require('mongoose')
const dotenv=require('dotenv')
const bcrypt=require('bcrypt')
dotenv.config()
const app=express()
app.use(express.json())


mongoose.connect(process.env.MONGO);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
    console.log("Connected to MongoDB");
});


app.listen(process.env.PORT,()=>{
    console.log("app is running");
})

app.get("/",(req,res)=>{
    res.json("Hello");
})

