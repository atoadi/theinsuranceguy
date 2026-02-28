import type { Metadata } from "next";
import { Outfit, Playfair_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import Navbar from "../components/layout/navbar";
import Footer from "../components/layout/Footer";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";

// FIX 1: Add 'swap' to prevent render blocking
const outfit = Outfit({ 
  subsets: ["latin"], 
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap" 
});

const playfair = Playfair_Display({ 
  subsets: ["latin"], 
  variable: "--font-playfair",
  style: ["normal", "italic"],
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.theinsuranceguy.in'), 
  title: {
    default: "TheInsuranceGuy | Expert Car Insurance Advisory India",
    template: "%s | TheInsuranceGuy"
  },
  description: "Stop overpaying for dealer quotes. We provide unbiased car insurance advisory, verified cashless garage lists, and claim assistance for Indian car owners.",
  keywords: ["Car Insurance India", "TheInsuranceGuy", "Zero Dep Insurance", "Tata AIG Cashless", "ICICI Lombard", "Car Insurance Claims", "EV Insurance India"],
  authors: [{ name: "TheInsuranceGuy" }],
  creator: "TheInsuranceGuy",
  publisher: "TheInsuranceGuy",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.theinsuranceguy.in",
    title: "TheInsuranceGuy - Private Intelligence for Car Owners",
    description: "Your dealer quote is likely overpriced. Check the math with India's first Private Intelligence Engine.",
    siteName: "TheInsuranceGuy",
    images: [
      {
        url: "/og-image.jpg", 
        width: 1200,
        height: 630,
        alt: "TheInsuranceGuy Dashboard",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "InsuranceAgency",
    "name": "TheInsuranceGuy",
    "image": "https://www.theinsuranceguy.in/logo.png",
    "description": "Expert car insurance advisory for Indian car owners.",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "IN"
    },
    "priceRange": "₹₹",
    "email": "hello@theinsuranceguy.in",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "09:00",
      "closes": "20:00"
    }
  };

  return (
    <html lang="en" className={`${outfit.variable} ${playfair.variable}`}>
      <head>
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" 
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased bg-white text-slate-900 overflow-x-hidden">
        {/* ANALYTICS ENGINES */}
        <GoogleAnalytics />
        <Analytics />
        
        {/* FIX 2: REMOVED DUPLICATE SpeedInsights here, keeping only the one at bottom */}
        
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <SpeedInsights />
      </body>
    </html>
  );
}