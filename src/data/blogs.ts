// 1. Use 'export type' to ensure Turbopack treats this strictly as metadata
export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  tag: string;
  tagColor: 'emerald' | 'ruby' | 'amber' | 'slate';
  date: string;
  readTime: string;
  content: string; 
}

// 2. The Data Array
export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "cashless-vs-reimbursement",
    title: "Cashless vs. Reimbursement: The Real Difference",
    excerpt: "Why the '15-Day Refund' is a myth and how the GST trap can hold your money hostage for months.",
    tag: "Claims",
    tagColor: "emerald",
    date: "Jan 12, 2026",
    readTime: "2 mins ",
    content: `
      <p>We recently handled a claim that was a perfect case study on the difference between "Cashless" and "Reimbursement."</p>
      <p>It started with a choice. My client’s car met with an accident, and they had two options: the Authorized Service Center (which was cashless) or their Trusted Local Garage (which was not).</p>
      <p>They chose the local garage. Financially, it was smart—the bill was nearly 50% lower. But while the repair was great, the paperwork was a struggle.</p>

      <h2 class="text-xl font-bold mt-6 mb-2 text-slate-800">The "15-Day" Myth vs. Reality</h2>
      <p>When you pay out of pocket, you think, "I’ll get the refund in 15 days." That’s the theory. But here, we had to wait for everything else. The garage took days to email the insurer. The surveyor visited late. Then, the surveyor fell sick.</p>
      
      <div class="my-8 p-6 bg-emerald-50 border-l-4 border-emerald-600 rounded-r-xl">
        <strong class="block text-emerald-900 mb-2 font-bold">The Hidden Deduction:</strong> 
        The garage added "Courier Charges" for parts. The insurer rejected that immediately. In a cashless claim, you never see these costs. In reimbursement, you pay them.
      </div>

      <h2 class="text-xl font-bold mt-6 mb-2 text-slate-800">The GST Trap</h2>
      <p>The car is fixed, but the payment is stuck. Why? The GST Rule. The insurer approved the repair amount but cannot release the 18% GST component yet. They have to wait for the garage to pay the tax to the government first.</p>
      <p>So instead of a simple refund, the client became a temporary Project Manager for 2 months.</p>

      <h2 class="text-xl font-bold mt-6 mb-2 text-slate-800">What This Means For You</h2>
      <ul class="list-disc ml-5 space-y-2">
        <li><strong>Local Garage (Reimbursement):</strong> Save money on the bill, get custom work, but wait 30-60 days for money.</li>
        <li><strong>Network Dealer (Cashless):</strong> Pay more premium, but ignore GST rules and sick surveyors.</li>
      </ul>
      <p class="mt-4 italic">We solve this by verifying the map before we sell. We don't look at brochures; we check if the garage near you has an active tie-up right now.</p>
    `
  },
  {
    slug: "loss-business-paradox",
    title: "The 'Loss Business' Paradox",
    excerpt: "Why claiming for a ₹5,000 dent might actually cost you ₹15,000 in future premiums.",
    tag: "Strategy",
    tagColor: "ruby",
    date: "Jan 05, 2026",
    readTime: "2 mins",
    content: `
      <p>In the insurance world, there is a fine line between a smart claim and a financial disaster. We recently handled a case for a Tata Harrier that illustrates this perfectly.</p>
      
      <h2 class="text-xl font-bold mt-6 mb-2 text-slate-800">The Entry Fee: Compulsory Deductible</h2>
      <p>Most people forget the "Entry Fee." For SUVs over 1500cc, the IRDAI mandates a <strong>Compulsory Deductible of ₹2,000</strong>. If you have a ₹5,000 scratch, you pay ₹2,000 upfront. You are doing all that paperwork just to get ₹3,000 back.</p>

      <div class="my-8 p-6 bg-rose-50 border-l-4 border-rose-600 rounded-r-xl">
        <h3 class="text-rose-900 font-bold mb-3 text-lg underline">The "Small Claim" Math:</h3>
        <ul class="list-none p-0 space-y-2">
          <li>❌ <span class="font-semibold text-rose-800">₹2,000</span> Out-of-pocket (Deductible)</li>
          <li>❌ <span class="font-semibold text-rose-800">₹3,555</span> Lost NCB (No Claim Bonus)</li>
          <li>❌ <span class="font-semibold text-rose-800">₹10,000</span> High-Risk Renewal Loading</li>
          <li class="pt-2 border-t border-rose-200 mt-2 text-lg"><strong>Total Outflow: ₹15,555</strong> <span class="text-sm font-normal">(to get back ₹3,000)</span></li>
        </ul>
      </div>

      <h2 class="text-xl font-bold mt-6 mb-2 text-slate-800">The Renewal Shock</h2>
      <p>A policy with a claim history is priced differently. For this Harrier, a clean renewal was <strong>₹31,000</strong>. With one small claim? It surged to <strong>₹41,000</strong>. The insurer flags you as "High Risk."</p>

      <h2 class="text-xl font-bold mt-6 mb-2 text-slate-800">The Golden Rule</h2>
      <p>Insurance is for <strong>catastrophes</strong>, not maintenance. If the damage is under ₹15,000, pay cash. It hurts today, but it saves your history and your future wallet.</p>
    `
  },
  {
    slug: "comprehensive-trap",
    title: "Is 'Comprehensive' Enough?",
    excerpt: "The plastic trap that standard policies hide. Why 50% of your bumper bill is often rejected.",
    tag: "Coverage",
    tagColor: "amber",
    date: "Dec 28, 2025",
    readTime: "2 mins",
    content: `
      <p>The most dangerous phrase I hear is: <em>"Just give me full insurance."</em> Six months later, a client crashes, gets a ₹50,000 bill, and is shocked to find they must pay ₹15,000 themselves.</p>

      <h2 class="text-xl font-bold mt-6 mb-2 text-slate-800">The Plastic Trap</h2>
      <p>Standard "Comprehensive" insurance follows an old rule: For any <strong>plastic, rubber, or nylon part</strong>, the insurer only pays <strong>50%</strong>.</p>
      
      <div class="grid grid-cols-2 gap-4 my-6">
        <div class="p-3 bg-amber-50 rounded border border-amber-200 text-center">
          <p class="font-bold text-amber-800">Front Bumper</p>
          <p class="text-xs">You pay 50%</p>
        </div>
        <div class="p-3 bg-amber-50 rounded border border-amber-200 text-center">
          <p class="font-bold text-amber-800">LED Lights</p>
          <p class="text-xs">You pay 50%</p>
        </div>
      </div>

      <div class="my-8 p-6 bg-slate-50 border-l-4 border-slate-600 rounded-r-xl">
        <strong class="block text-slate-900 mb-2 font-bold italic">The ₹500 Bolt Problem:</strong> 
        Even with Zero Dep, you get stuck with "Consumables"—nuts, bolts, and oil. These add-ons cost less than a cup of coffee but save thousands in a major repair.
      </div>

      <h2 class="text-xl font-bold mt-6 mb-2 text-slate-800">Age Limits</h2>
      <p>Most agents say Zero Dep ends at 5 years. That’s false—we can offer it up to <strong>10 years</strong>. However, after Year 7, we help you decide if it's still worth the premium cost based on the car's market value.</p>
    `
  },
  {
    slug: "road-tax-theft",
    title: "Do You Get Your Road Tax Back?",
    excerpt: "If your car is stolen, standard IDV won't cover the ₹1 Lakh+ you paid in RTO taxes. Here is the fix.",
    tag: "Theft",
    tagColor: "ruby",
    date: "Dec 15, 2025",
    readTime: "2 mins",
    content: `
      <p>When a car is stolen, the check from the insurer usually feels "light." This is because of the gap between the <strong>IDV</strong> and the <strong>On-Road Price</strong>.</p>

      <div class="flex flex-col md:flex-row gap-4 my-8">
        <div class="flex-1 p-4 bg-slate-100 rounded-lg text-center border-b-4 border-slate-400">
          <span class="text-xs uppercase text-slate-500 font-bold tracking-widest">Standard IDV</span>
          <p class="text-2xl font-bold text-slate-800">₹6.59 Lakhs</p>
        </div>
        <div class="flex-1 p-4 bg-green-100 rounded-lg text-center border-b-4 border-green-500">
          <span class="text-xs uppercase text-green-600 font-bold tracking-widest">Invoice Price</span>
          <p class="text-2xl font-bold text-green-800">₹9.00 Lakhs</p>
        </div>
      </div>

      <h2 class="text-xl font-bold mt-6 mb-2 text-slate-800">The Unrecoverable Loss</h2>
      <p>Standard insurance does <strong>not</strong> refund RTO charges or Road Tax. You essentially paid the government for a 15-year permit, but if your car is stolen in Year 2, you lose that entire tax investment.</p>

      <h2 class="text-xl font-bold mt-6 mb-2 text-slate-800">The Fix: RTI</h2>
      <p><strong>Return to Invoice (RTI)</strong> bridges this gap. It resets the clock to Day One. I insist on this cover for the first 3 years of any new car to protect that ₹1 Lakh+ road tax bill from vanishing.</p>
    `
  }
];