import React from "react";
import { Car, RefreshCw, ShieldCheck, ArrowRight } from "lucide-react";
import Link from "next/link"; // Changed to Next Link for speed

const services = [
  {
    title: "The Dealer Challenge",
    description: "Dealers overcharge by 40% for 'peace of mind.' We offer the exact same cashless coverage for significantly less.",
    icon: <Car className="text-brand-primary" size={32} />,
    link: "/private-car", // FIXED
    featured: false,
  },
  {
    title: "The Zero-Dep Loophole",
    description: "Bought a pre-loved car? Most insurers deny Zero Dep. We unlock it and get you 100% parts cover where others fail.",
    icon: <RefreshCw className="text-white" size={32} />,
    link: "/private-car", // FIXED
    featured: true, 
  },
  {
    title: "Luxury Warranty",
    description: "Save up to ₹2 Lakhs instantly. We cover Engine, Gearbox, and Suspension for a fraction of dealership costs.",
    icon: <ShieldCheck className="text-brand-primary" size={32} />,
    link: "/warranty", // FIXED
    featured: false,
  },
];

export const ServiceGrid = () => {
  return (
    <section className="bg-white py-24">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {services.map((service, index) => (
            <Link
              href={service.link}
              key={index}
              className={`relative flex flex-col rounded-3xl p-10 transition-all hover:-translate-y-2 group ${
                service.featured
                  ? "bg-brand-primary text-white shadow-2xl"
                  : "bg-slate-50 border border-slate-200 text-brand-dark hover:border-emerald-500 hover:shadow-xl"
              }`}
            >
              {service.featured && (
                <span className="absolute top-6 right-6 rounded-full bg-white/20 px-3 py-1 text-[10px] font-bold uppercase tracking-widest">
                  Exclusive Access
                </span>
              )}
              <div className="mb-6 transform group-hover:scale-110 transition-transform">{service.icon}</div>
              <h3 className={`font-serif text-2xl mb-4 ${service.featured ? "text-white" : "text-brand-dark"}`}>
                {service.title}
              </h3>
              <p className={`mb-8 leading-relaxed ${service.featured ? "text-slate-200" : "text-slate-600"}`}>
                {service.description}
              </p>
              <div
                className={`mt-auto flex items-center gap-2 font-bold ${
                  service.featured ? "text-white" : "text-brand-primary"
                }`}
              >
                Learn More <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};