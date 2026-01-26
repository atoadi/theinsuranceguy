import { Outfit, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "../components/layout/navbar"; 
import Footer from "../components/layout/Footer"; 

const outfit = Outfit({ 
  subsets: ["latin"], 
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700", "800"] 
});

const playfair = Playfair_Display({ 
  subsets: ["latin"], 
  variable: "--font-playfair",
  style: ["normal", "italic"] 
});

export const metadata = {
  title: "TheInsuranceGuy | Expert Advisory",
  description: "Private Intelligence Engine for Car Insurance in India",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${outfit.variable} ${playfair.variable}`}>
      <head>
        {/* FIXED: Removed non-standard attributes causing Firefox warnings */}
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" 
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body className="font-sans antialiased bg-white text-slate-900">
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );

  
}
