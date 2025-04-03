import { NextRequest, NextResponse } from "next/server";
import {connectDB} from "@/db";
import User from "@/models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const POST = async (req: NextRequest) => {
  try {
    await connectDB();

    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ msg: "All Fields are Mandatory!" }, { status: 400 });
    }

    const emailExists = await User.findOne({ email });

    if (emailExists) {
      return NextResponse.json({ msg: "User already Registered!" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    const result = await newUser.save();

    const token = jwt.sign({ userId: result._id }, process.env.JWT_SECRET as string, {
      expiresIn: "30d",
    });

    // ✅ Set JWT token in HTTP-only cookie
    const response = NextResponse.json({ msg: "Registered Successfully!" }, { status: 201 });

    response.cookies.set("token", token, {
      httpOnly: true, // Prevents client-side access (more secure)
      secure: process.env.NODE_ENV === "production", // Ensures HTTPS in production
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: "/", // Available across the entire site
      sameSite: "strict", // Prevents CSRF attacks
    });

    return response;
  } catch (error) {
    return NextResponse.json({ msg: "Server error", error }, { status: 500 });
  }
};
