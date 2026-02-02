import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Private Car Insurance Audit | New & Used Cars",
  description: "Get a comprehensive audit of your car insurance quote. We check for hidden deductibles, missing add-ons, and overpriced premiums.",
  keywords: ["Car Insurance Audit", "New Car Insurance Quote", "Used Car Insurance India", "Vehicle Insurance Renewal"],
};

export default function PrivateCarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}