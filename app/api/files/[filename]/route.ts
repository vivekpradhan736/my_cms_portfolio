import { NextRequest } from "next/server";
import { getGridFSBucket } from "@/db";

export async function GET(req: NextRequest, { params }: { params: { filename: string } }) {
  try {
    const bucket = await getGridFSBucket();
    const downloadStream = bucket.openDownloadStreamByName(params.filename);

    // Create a readable stream to pipe the GridFS stream into the response
    const stream = new ReadableStream({
      start(controller) {
        downloadStream.on("data", (chunk) => controller.enqueue(chunk));
        downloadStream.on("end", () => controller.close());
        downloadStream.on("error", (err) => controller.error(err));
      },
    });

    return new Response(stream, {
      status: 200,
      headers: { "Content-Type": "application/octet-stream" },
    });
  } catch (error) {
    console.error("File retrieval error:", error);
    return new Response(JSON.stringify({ message: "File not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }
}
