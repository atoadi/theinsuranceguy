export const siteConfig = {
  brand: {
    name: "TheInsuranceGuy.",
    logo: "TheInsuranceGuy.",
    emergencyPhone: "1800-XXX-XXXX", // Add your real number
  },
  navLinks: [
    { label: "Private Car", href: "/private-car" },
    { label: "Warranty", href: "/warranty" },
    { label: "Garages", href: "/garages" },
    { label: "Resources", href: "/resources" },
  ],
  hero: {
    headline: "Your Dealer Said It’s 'Cashless'.",
    highlight: "Check Again.",
    subtext: "Buying from the showroom doesn't guarantee cashless claims. It depends on the insurer's active tie-up, not the dealer's promise. We check the real list.",
    primaryCTA: "Audit My Dealer Quote",
    secondaryCTA: "Read The Truth",
  },
  trustBar: {
    label: "ADVISING OWNERS OF",
    brands: ["MERCEDES-BENZ", "BMW", "TATA", "AUDI", "MAHINDRA"],
  },
  footer: {
    copyright: `© ${new Date().getFullYear()} TheInsuranceGuy. Pan India Advisory.`,
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" }, // Fixed this link too
      { label: "Terms of Service", href: "/terms" },
    ],
  },
};

export type SiteConfig = typeof siteConfig;