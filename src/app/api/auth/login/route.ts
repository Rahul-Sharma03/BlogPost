import {connect} from "@/database/mongo.config"
import { NextRequest, NextResponse } from "next/server"
import { loginSchema } from "@/validator/authSchema"
import vine,{errors} from "@vinejs/vine"
import ErrorReporter from "@/validator/ErrorReporter"
import bcrypt from "bcryptjs"
import {User} from "@/model/User"


//for db connection
connect()

export async function POST(request:NextRequest){
   try{
    const body=await request.json()

   //validation
   const validator = vine.compile(loginSchema)
   validator.errorReporter = () => new ErrorReporter()
   const output = await validator.validate(body)
   const user=await User.findOne({email:output.email})
   if(user){
      const checkpassword=bcrypt.compareSync(output.password!,user.password)
      if(checkpassword){
        return NextResponse.json({
          status:200,
          message:"user Logged in"
        },{status:200})
      }
      return NextResponse.json({
        status:400,
        errors:{
          email:"please check your credentials"
        }
      },{status:200})
   }
   return NextResponse.json({
    status:400,
    errors:{
      email:"no account found with this user"
    }
   },{status:200})

   }
   catch(error){
    if (error instanceof errors.E_VALIDATION_ERROR) {
     return NextResponse.json({status:400,errors:error.messages},{status:200})
    }
  }
}