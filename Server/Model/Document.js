const mongoose=require('mongoose')


const Document=new mongoose.Schema({
      title:{type:string, required:true},
      description: { type: String },
      fileUrl:{type:string, required:true},
      fileType: { type: String, required: true },
      fileSize: { type: Number, required: true },
      userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
      createdAt: { type: Date, default: Date.now }
})

module.exports=mongoose.model("Document",Document);