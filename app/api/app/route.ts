import { NextResponse } from "next/server";
import { connectDB } from "@/db";
import Project from "@/models/project";
import Blog from "@/models/blog";

export async function GET() {
  try {
    await connectDB(); // Ensure MongoDB connection

    // Count documents in each collection
    const projectCount = await Project.countDocuments();
    const blogCount = await Blog.countDocuments();

    return NextResponse.json({
      project: projectCount,
      blog: blogCount,
    });
  } catch (error) {
    console.error("Error fetching counts:", error);
    return NextResponse.json({ message: "Error fetching counts", error }, { status: 500 });
  }
}
