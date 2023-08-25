import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "./(components)/NavBar";
import { ClerkProvider, SignedIn } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Recom",
  description: "User based anime recommendation",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <SignedIn>
            <NavBar />
          </SignedIn>
          <div className="mx-0 sm:mx-12 md:mx-32 lg:mx-60 my-2">{children}</div>
        </body>
      </html>
    </ClerkProvider>
  );
}
