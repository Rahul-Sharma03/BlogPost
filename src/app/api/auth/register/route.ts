import {connect} from "@/database/mongo.config"
import { NextRequest,NextResponse } from "next/server";
import vine,{errors} from '@vinejs/vine'
import { registerSchema } from "@/validator/authSchema";
import {User} from "@/model/User"
import ErrorReporter from "@/validator/ErrorReporter";
import bcrypt from "bcryptjs"
//for db connection
connect()

export async function POST(request: NextRequest){
  try {
    const body = await request.json();
    // console.log(body)

    // validation
    const validator = vine.compile(registerSchema);
    validator.errorReporter = () => new ErrorReporter();
    const output = await validator.validate(body);

    // check if email is present in the database
    const user = await User.findOne({ email: output.email });
    if (user) {
      return NextResponse.json(
        {
          status: 400,
          errors: {
            email: "Email is already taken",
          },
        },
        { status: 200 }
      );
    } else {
      // hash the password
      const salt = bcrypt.genSaltSync(10);
      output.password = bcrypt.hashSync(output.password, salt);
      await User.create(output);
      return NextResponse.json(
        { status: 200, message: "Account created successfully, please login" },
        { status: 200 }
      );
    }
  } catch (error) {
    // Handle validation errors
    if (error instanceof errors.E_VALIDATION_ERROR) {
      return NextResponse.json(
        { status: 400, errors: error.messages },
        { status: 200 }
      );
    }
    // Handle all other errors
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { status: 500, message: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
