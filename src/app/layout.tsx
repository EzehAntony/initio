import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit( {
  subsets: [ "latin" ],
  weight: [ "100", "200", "300", "400", "500", "600", "700", "800", "900" ],
} );

export const metadata: Metadata = {
  title: "Initio",
  description: "Your all-in-one social media video downloader",
};

export default function RootLayout ( {
  children,
}: Readonly<{
  children: React.ReactNode;
}> ) {
  return (
    <html lang="en">
      <body
        className={ `${ outfit.className } antialiased` }
      >
        { children }
      </body>
    </html>
  );
}
