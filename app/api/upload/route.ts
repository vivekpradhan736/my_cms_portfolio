import { NextRequest, NextResponse } from "next/server";
import { getGridFSBucket } from "@/db"; // Ensure this function initializes GridFS
import { Readable } from "stream";

export async function POST(req: NextRequest) {
  try {
    console.log("Upload request received");
    console.log("Upload 2");
    // ✅ Ensure Content-Type is multipart/form-data
    const contentType = req.headers.get("content-type") || "";
    console.log("Upload 3");
    if (!contentType.includes("multipart/form-data")) {
      console.log("Upload 4");
      return NextResponse.json(
        { message: "Invalid Content-Type. Use multipart/form-data." },
        { status: 400 }
      );
    }
    console.log("test 1")

    const bucket = await getGridFSBucket();
    console.log("test 2")

    // ✅ Parse FormData correctly
    const formData = await req.formData();
    const file = formData.get("file") as File;
    console.log("test 3")

    if (!file) {
      console.log("test 4")
      return NextResponse.json({ message: "No file uploaded" }, { status: 400 });
    }
    console.log("test 5")

    // ✅ Convert Blob to Buffer
    const buffer = Buffer.from(await file.arrayBuffer());
    console.log("test 6")

    // ✅ Create a Readable Stream for GridFS
    const readableStream = new Readable();
    console.log("test 7")
    readableStream.push(buffer);
    readableStream.push(null);
    console.log("test 8")

    // ✅ Generate a unique filename
    const filename = `${Date.now()}-${file.name}`;
    const uploadStream = bucket.openUploadStream(filename, { contentType: file.type });

    // ✅ Pipe file stream into GridFS storage
    readableStream.pipe(uploadStream);

    console.log(`File uploaded: ${filename}`);

    return NextResponse.json({ filename, url: `/api/files/${filename}` }, { status: 200 });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
