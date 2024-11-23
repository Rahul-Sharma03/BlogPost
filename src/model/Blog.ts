import mongoose from "mongoose";
import { Schema } from "mongoose";

const BlogSchema=new Schema({
  title:{
    type:Schema.Types.String,
    required:[true,"title is required"]
  },
  slug:{
    type:Schema.Types.String,
    required:[true,"Slug is required"]
  }
})

export const Blog=mongoose.models.Blog || mongoose.model("Blog",BlogSchema)
