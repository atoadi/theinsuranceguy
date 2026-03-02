import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Extended Warranty Shield | Luxury & Standard Cars",
  description: "Protect your engine, gearbox, and electronics. Specialized warranty coverage for luxury cars (>50L) and standard vehicles.",
  keywords: ["Car Extended Warranty", "Luxury Car Warranty India", "Engine Protection Cover", "Gearbox Warranty"],
};

export default function WarrantyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}