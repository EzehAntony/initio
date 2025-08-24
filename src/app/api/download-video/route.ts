import { spawn } from "child_process";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { url } = await req.json();

  if (!url || typeof url !== "string") {
    return NextResponse.json(
      { error: "No valid URL provided" },
      { status: 400 }
    );
  }

  const ytDlpPath =
    "C:\\Users\\NAZVILE\\AppData\\Roaming\\Python\\Python313\\Scripts\\yt-dlp.exe";

  return new Promise<NextResponse>((resolve) => {
    const ytDlp = spawn(ytDlpPath, ["-f", "best", "-o", "-", url]);

    const chunks: Uint8Array[] = [];

    ytDlp.stdout.on("data", (data) => {
      chunks.push(data);
    });

    ytDlp.stderr.on("data", (data) => {
      console.error("yt-dlp stderr:", data.toString());
    });

    ytDlp.on("close", (code) => {
      if (code === 0) {
        resolve(
          new NextResponse(Buffer.concat(chunks), {
            status: 200,
            headers: {
              "Content-Type": "video/mp4",
              "Content-Disposition": "attachment; filename=video.mp4",
            },
          })
        );
      } else {
        resolve(
          NextResponse.json(
            { error: `yt-dlp exited with code ${code}` },
            { status: 500 }
          )
        );
      }
    });

    ytDlp.on("error", (err) => {
      console.error("yt-dlp error:", err);
      resolve(
        NextResponse.json(
          { error: "Failed to process YouTube video", details: err.message },
          { status: 500 }
        )
      );
    });
  });
}
