import { NextRequest, NextResponse } from "next/server";
import {connectDB} from "@/db";
import User from "@/models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const POST = async (req: NextRequest) => {
  try {
    await connectDB();

    const { email, password } = await req.json(); // Parse JSON body

    if (!email || !password) {
      return NextResponse.json({ msg: "Email and password required!" }, { status: 400 });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ msg: "Please register first!" }, { status: 400 });
    }

    const passwordMatched = await bcrypt.compare(password, user.password);

    if (!passwordMatched) {
      return NextResponse.json({ msg: "Invalid Credentials!" }, { status: 400 });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET as string, {
      expiresIn: "30d",
    });

    // ✅ Set JWT token in HTTP-only cookie
    const response = NextResponse.json({ msg: "Logged in Successfully!", user: user }, { status: 201 });

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
