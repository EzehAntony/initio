export const runtime = "nodejs"; // 👈 required!

import { NextRequest } from "next/server";
import { spawn } from "child_process";

export async function POST ( req: NextRequest ): Promise<Response> {
    try {
        const { url } = await req.json();

        if ( !url || typeof url !== "string" ) {
            return new Response( JSON.stringify( { error: "Invalid URL" } ), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            } );
        }

        const ytDlp = spawn( "yt-dlp", [ "-f", "best", "-o", "-", url ] );

        if ( !ytDlp.stdout ) {
            return new Response( JSON.stringify( { error: "Could not stream video" } ), {
                status: 500,
                headers: { "Content-Type": "application/json" },
            } );
        }

        const webStream = new ReadableStream( {
            start ( controller ) {
                ytDlp.stdout!.on( "data", ( chunk ) => controller.enqueue( chunk ) );
                ytDlp.stdout!.on( "end", () => controller.close() );
                ytDlp.stdout!.on( "error", ( err ) => controller.error( err ) );
            },
        } );

        return new Response( webStream, {
            headers: {
                "Content-Type": "video/mp4",
                "Content-Disposition": `attachment; filename="video-${ Date.now() }.mp4"`,
            },
        } );
    } catch ( err ) {
        const error = err instanceof Error ? err : new Error( String( err ) );
        console.error( error );
        return new Response(
            JSON.stringify( { error: "Server Error", details: error.message } ),
            {
                status: 500,
                headers: { "Content-Type": "application/json" },
            }
        );
    }
}