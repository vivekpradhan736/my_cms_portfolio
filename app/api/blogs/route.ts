import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

import { NextResponse } from "next/server";
import {connectDB} from "@/db";
import Blog from "@/models/blog";

export async function POST(req: Request) {
  try {
    await connectDB(); // Connect to MongoDB

    const { title, content, description, cover_url } = await req.json();
    console.log("title",title)
    console.log("content",content)
    console.log("description",description)
    console.log("cover_url",cover_url)

    // Create and save the new blog post
    const newBlog = await Blog.create({
      title,
      content,
      description,
      cover_url,
    });

    return NextResponse.json({ data: newBlog }, { status: 201 });
  } catch (error) {
    console.error("Error creating blog:", error);
    return NextResponse.json({ message: "Error creating blog post", error }, { status: 500 });
  }
}


export async function GET(request: Request) {
  try {
    // Connect to MongoDB
    await connectDB();

    // Parse query parameters from URL
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const term = searchParams.get("term") || "";
    const page = parseInt(searchParams.get("page") || '0');
    const limit = parseInt(searchParams.get("limit") || '10');

    // Pagination logic
    const skip = page * limit; // Number of documents to skip
    const programLimit = limit; // Limit of documents to return

    let response;

    if (id) {
      // Fetch a single blog by ID
      response = await Blog.findById(id);
      if (!response) {
        return NextResponse.json({ message: "Blog not found" }, { status: 404 });
      }
    } else {
      // Fetch blogs with search term and pagination
      response = await Blog.find({ title: { $regex: term, $options: "i" } }) // Case-insensitive search
        .skip(skip) // Pagination skip
        .limit(programLimit); // Pagination limit
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json({ message: "Error fetching blogs", error }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    await connectDB(); // Connect to MongoDB

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ message: "Missing blog ID" }, { status: 400 });
    }

    const data = await req.json();

    // Find and update the blog post
    const updatedBlog = await Blog.findByIdAndUpdate(id, data, { new: true });

    if (!updatedBlog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({ data: updatedBlog });
  } catch (error) {
    console.error("Error updating blog:", error);
    return NextResponse.json({ message: "Error updating blog post", error }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    await connectDB(); // Connect to MongoDB

    const data = await req.json();
    const { id } = data;

    if (!id) {
      return NextResponse.json({ status: "error", message: "Missing blog ID" }, { status: 400 });
    }

    // Find and delete the blog post
    const deletedBlog = await Blog.findByIdAndDelete(id);

    if (!deletedBlog) {
      return NextResponse.json({ status: "error", message: "Blog not found" }, { status: 404 });
    }

    return new NextResponse(null, { status: 204 }); // 204 No Content (successful delete)
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json({ status: "error", message: "Error deleting blog post", error }, { status: 500 });
  }
}