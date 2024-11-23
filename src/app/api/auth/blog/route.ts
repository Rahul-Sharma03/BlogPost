import { connect } from "@/database/mongo.config";
import { NextResponse, NextRequest } from "next/server";
import vine, { errors } from "@vinejs/vine";
import { blogSchema } from "@/validator/authSchema";
import ErrorReporter from "@/validator/ErrorReporter";
import { Blog } from "@/model/Blog";
// import mongoose from "mongoose";

//for db connection
connect();

type Blog = {
  title: string;
  slug: string;
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    // validation
    const validator = vine.compile(blogSchema);
    validator.errorReporter = () => new ErrorReporter();
    const output = await validator.validate(body);
    // console.log("output is ",output)

    await Blog.create(output);
    return NextResponse.json(
      { status: 200, message: "Blog created successfully" },
      { status: 200 }
    );
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

export async function GET() {
  try {
    const data: Blog[] = await Blog.find();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Error in blog database" });
  }
}

