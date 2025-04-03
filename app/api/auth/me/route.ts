import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/models/user";
import {connectDB} from "@/db";
import { cookies } from "next/headers";

export const GET = async (req: NextRequest) => {
  try {
    await connectDB();

    // ✅ Get the token from cookies
    const token = cookies().get("token")?.value;

    if (!token) {
      return NextResponse.json({ msg: "Unauthorized" }, { status: 401 });
    }

    // ✅ Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string };

    // ✅ Fetch user details from MongoDB
    const user = await User.findById(decoded.userId).select("-password"); // Exclude password

    if (!user) {
      return NextResponse.json({ msg: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ msg: "Invalid token", error }, { status: 401 });
  }
};
