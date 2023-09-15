import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { ClerkProvider, SignedIn } from "@clerk/nextjs";
import NavBar from "@/components/NavBar";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

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
        <body className={`${montserrat.variable} font-sans`}>
          <SignedIn>
            <NavBar />
          </SignedIn>
          <div className="mx-0 sm:mx-12 md:mx-32 lg:mx-60 my-2">{children}</div>
        </body>
      </html>
    </ClerkProvider>
  );
}
