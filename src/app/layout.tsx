import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ThemePrivider from "@/theme";
import { ClerkProvider } from "@clerk/nextjs";
import { connectMongoDB } from "@/config/mongodb";
import CustomLayout from "@/custom-layouts";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "رزرو وقت آنلاین",
  description: "ساخته شده توسط محمد حسین مرادی",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  await connectMongoDB();

  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ThemePrivider>
            <CustomLayout>
              {children}
            </CustomLayout>
          </ThemePrivider>
        </body>
      </html>
    </ClerkProvider>
  );
}
