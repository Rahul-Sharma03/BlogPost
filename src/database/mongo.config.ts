import mongoose from "mongoose"

export function connect(){
  mongoose.connect(process.env.MONGO_URI!,{
    tls:true
  })
  .then(()=>console.log("database connected successfully"))
  .catch((err)=>console.log("error in database connecton",err)) 
}