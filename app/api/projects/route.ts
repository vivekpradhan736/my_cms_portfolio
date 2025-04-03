import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

import { NextResponse } from "next/server";
import { connectDB } from "@/db";
import Project from "@/models/project";
import { nanoid } from "nanoid";

export async function POST(req: Request) {
  try {
    await connectDB(); // Connect to MongoDB

    const data = await req.json();
    console.log("data", data)

    // Ensure slug_url is not null or empty
    if (!data.slug_url) {
      data.slug_url = `project-${nanoid(10)}`; // Generate a unique slug
    }

    // Create and save the new project
    const newProject = await Project.create(data);

    return NextResponse.json({ data: newProject }, { status: 201 });
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json({ message: "Error creating project", error }, { status: 500 });
  }
}

export async function GET(req: Request) {
    try {
      await connectDB(); // Connect to MongoDB
  
      // Extract query parameters
      const { searchParams } = new URL(req.url);
      const id = searchParams.get("id");
      const term = searchParams.get("term") || "";
      const page = parseInt(searchParams.get("page") || "0");
      const limit = parseInt(searchParams.get("limit") || "10");
  
      // Pagination logic
      const skip = page * limit;
  
      let response;
  
      if (id) {
        // Fetch a single project by ID
        response = await Project.findById(id);
        if (!response) {
          return NextResponse.json({ message: "Project not found" }, { status: 404 });
        }
      } else {
        // Fetch projects with search term and pagination
        response = await Project.find({ title: { $regex: term, $options: "i" } }) // Case-insensitive search
          .skip(skip) // Pagination skip
          .limit(limit); // Pagination limit
      }
  
      return NextResponse.json(response);
    } catch (error) {
      console.error("Error fetching projects:", error);
      return NextResponse.json({ message: "Error fetching projects", error }, { status: 500 });
    }
  }

  export async function PATCH(req: Request) {
    try {
      await connectDB(); // Connect to MongoDB
  
      // Extract query parameters
      const { searchParams } = new URL(req.url);
      const id = searchParams.get("id");
  
      if (!id) {
        return NextResponse.json({ message: "Missing project ID" }, { status: 400 });
      }
  
      const data = await req.json();
  
      // Find and update the project
      const updatedProject = await Project.findByIdAndUpdate(id, data, { new: true });
  
      if (!updatedProject) {
        return NextResponse.json({ message: "Project not found" }, { status: 404 });
      }
  
      return NextResponse.json({ data: updatedProject });
    } catch (error) {
      console.error("Error updating project:", error);
      return NextResponse.json({ message: "Error updating project", error }, { status: 500 });
    }
  }

  export async function DELETE(req: Request) {
    try {
      await connectDB(); // Connect to MongoDB
  
      const data = await req.json();
      const { id } = data;
  
      if (!id) {
        return NextResponse.json({ message: "Missing project ID" }, { status: 400 });
      }
  
      // Find and delete the project
      const deletedProject = await Project.findByIdAndDelete(id);
  
      if (!deletedProject) {
        return NextResponse.json({ message: "Project not found" }, { status: 404 });
      }
  
      return new NextResponse(null, { status: 204 }); // 204 No Content (successful delete)
    } catch (error) {
      console.error("Error deleting project:", error);
      return NextResponse.json({ message: "Error deleting project", error }, { status: 500 });
    }
  }