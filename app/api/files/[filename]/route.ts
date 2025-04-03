import { NextRequest, NextResponse } from "next/server";
import { getGridFSBucket } from "@/db";

export async function GET(req: NextRequest, { params }: { params: { filename: string } }) {
  try {
    const bucket = await getGridFSBucket();
    const downloadStream = bucket.openDownloadStreamByName(params.filename);

    return new NextResponse(downloadStream, {
      status: 200,
      headers: { "Content-Type": "application/octet-stream" },
    });
  } catch (error) {
    console.error("File retrieval error:", error);
    return NextResponse.json({ message: "File not found" }, { status: 404 });
  }
}
