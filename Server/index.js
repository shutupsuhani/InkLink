const express=require('express')
const mongoose=require('mongoose')
const dotenv=require('dotenv')
const userRouter=require('./Routes/authRoutes')
const scribbleRouter=require('./Routes/scribbleRoutes')
const fileuploadRouter=require('./Routes/fileuploadRoutes')

const convertRouter=require('./Routes/convertRoutes.js')
const compressRouter=require('./Routes/compressRoutes.js')

const fs=require('fs')
const { google }=require('googleapis')
const cors=require('cors');

dotenv.config()
const app=express()
app.use(express.json())

const corsOptions = {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE","PUT"],
    credentials: true
};

app.use(cors(corsOptions));


mongoose.connect(process.env.MONGO);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
    console.log("Connected to MongoDB");
});

app.use("/api/auth/",userRouter);
app.use("/api/scribble/",scribbleRouter)
app.use("/api/file",fileuploadRouter);
app.use("/api/fileCompress",compressRouter);
app.use("/api/fileConvert",convertRouter);

app.listen(process.env.PORT,()=>{
    console.log("app is running");
})

app.get("/",(req,res)=>{
    res.json("Hello");
})

