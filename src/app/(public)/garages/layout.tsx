import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cashless Garage Locator | Verified Network Hospitals",
  description: "Find verified cashless garages for Tata AIG, ICICI Lombard, and Reliance General. Search by city and car brand to ensure your claim is cashless.",
  keywords: ["Cashless Garages", "Network Garages India", "Car Repair Insurance", "Tata AIG Garages", "ICICI Lombard Network", "Hyundai Cashless Garage", "Maruti Service Center"],
  openGraph: {
    title: "Cashless Garage Locator - TheInsuranceGuy",
    description: "Don't get tricked by 'reimbursement' claims. Check which garages are actually cashless near you.",
  },
};

export default function GaragesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}