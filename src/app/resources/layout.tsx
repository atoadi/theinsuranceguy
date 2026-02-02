import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Insurance Knowledge Hub | Unbiased Guides",
  description: "Read the truth about car insurance. Expert guides on Zero Depreciation, Return to Invoice (RTI), and how to handle claims without losing money.",
  keywords: ["Car Insurance Blog", "Insurance Tips India", "Zero Dep vs Comprehensive", "Return to Invoice Meaning", "Car Insurance Claim Guide"],
};

export default function ResourcesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}