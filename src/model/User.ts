import mongoose from "mongoose";
import { Schema } from "mongoose";

const UserSchema=new Schema({
  name:{
    required:[true,"Name field is requrired"],
    type:Schema.Types.String
  },
  email:{
    required:[true,"Email field is requrired"],
    type:Schema.Types.String,
    unique:true,
    trim:true
  },
  password:{
    required:[true,"Password field is requrired"],
    type:Schema.Types.String
  }
})

export const User=mongoose.models.User || mongoose.model("User",UserSchema)