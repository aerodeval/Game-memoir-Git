import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });



export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
  
      <body className={inter.className}>
        <div className="dboard-main ">
        <Toaster position="bottom-center" />

        {children} 
        {/* {dashboard} */}
   
        </div>
 </body>

    </html>
  );
}
