import { Navbar } from "@/components/Navbar"
import Link from "next/link"

export const metadata = { title: "Problem — KisanSetu | e-NAM Gaps" }

export default function ProblemPage() {
  return (
    <div className="min-h-screen bg-[#FFFCF5]">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="inline-flex items-center gap-2 bg-white border border-amber-200 rounded-full px-3 py-1.5 text-xs font-semibold shadow-sm">
          <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" /> Problem Statement • Market Linkages & Price Discovery
          <Link href="/solution" className="bg-emerald-600 text-white px-3 py-1 rounded-full hover:bg-emerald-700">See Solution →</Link>
        </div>
        <h1 className="mt-4 text-4xl font-black">Why e-NAM alone isn&apos;t enough</h1>
        <p className="mt-2 text-zinc-600 max-w-2xl">12 documented gaps from field studies. e-NAM provides infrastructure — the <b>last-mile gap</b> between portal and farmer is where value is lost. We target the top 3 for hackathon impact.</p>

        <div className="mt-8 grid md:grid-cols-3 gap-4">
          {[
            { n: "01", title: "Low digital literacy → Voice AI", desc: "Portal has many menus & technical terms. Smallholders need mandi staff/agents to operate. Voice in Marathi/Hindi removes literacy barrier.", color: "emerald", icon: "🎙️", impact: "High", fix: "Bolke Becho • STT + TTS" },
            { n: "02", title: "Quality uncertainty → Vision grading", desc: "Buyers don’t trust displayed quality. Assaying infra weak & manual. Leads to low bids & disputes.", color: "amber", icon: "📷", impact: "High", fix: "Photo → Grade • 12k Agmark dataset" },
            { n: "03", title: "Price uncertainty → Sell-time AI", desc: "Price info ≠ best price. Farmers sell immediately due to liquidity/storage fear, weak bargaining power.", color: "blue", icon: "📊", impact: "High", fix: "WAIT vs SELL • LSTM forecast" },
          ].map(c => (
            <div key={c.n} className={`rounded-[20px] p-6 border-2 ${c.color === "emerald" ? "bg-emerald-50 border-emerald-200" : c.color === "amber" ? "bg-amber-50 border-amber-200" : "bg-blue-50 border-blue-200"}`}>
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-white border flex items-center justify-center text-lg">{c.icon}</div>
                <span className="text-xs font-black bg-white border rounded-full px-3 py-1">PRIORITY #{c.n} • {c.impact}</span>
              </div>
              <div className="mt-4 font-black text-lg leading-tight">{c.title}</div>
              <div className="mt-2 text-sm text-zinc-700 leading-relaxed">{c.desc}</div>
              <div className="mt-3 bg-white border rounded-xl px-3 py-2 text-xs font-bold">✓ Fix: {c.fix}</div>
              <Link href="/demo" className="mt-3 inline-block bg-zinc-900 text-white rounded-full px-4 py-1.5 text-xs font-bold hover:bg-black">Try live demo →</Link>
            </div>
          ))}
        </div>

        <h2 className="mt-10 text-2xl font-black">All 12 gaps documented</h2>
        <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
          {[
            { t: "Not farmer-friendly UI", d: "Many sections, dashboards, tech terminology. Low-literacy farmers struggle.", s: "UI/UX" },
            { t: "Digital literacy dependency", d: "Need mandi staff/agents for registration & transactions.", s: "Access" },
            { t: "Internet / connectivity dependency", d: "Real-time bidding fails in low rural connectivity.", s: "Infra" },
            { t: "Mobile app limited", d: "Assaying, lot, weighment, bill, payment need desktop, not mobile.", s: "Mobile" },
            { t: "Quality / assaying problem", d: "No trust that displayed quality = physical produce.", s: "Trust" },
            { t: "Physical mandi dependency", d: "Still must bring produce to physical APMC.", s: "Logistics" },
            { t: "Logistics not solved", d: "Transport, storage, cold-chain, delivery remain manual pain.", s: "Supply chain" },
            { t: "Uneven state implementation", d: "Effectiveness depends on APMC reforms, varies by state.", s: "Policy" },
            { t: "Intermediary dependence", d: "Commission agents still needed for tech & transactions.", s: "Market" },
            { t: "Price ≠ guaranteed best price", d: "Demand, quality, location still decide outcome.", s: "Price" },
            { t: "Complex 12-step workflow", d: "Registration → gate exit = delays & human intervention.", s: "Workflow" },
            { t: "Technical reliability", d: "App crashes, e-auction failures reported.", s: "Tech" },
          ].map(x => (
            <div key={x.t} className="bg-white border rounded-2xl p-4 flex gap-3 hover:shadow-sm">
              <span className="shrink-0 w-7 h-7 rounded-full bg-red-50 border border-red-200 flex items-center justify-center text-xs">✕</span>
              <div>
                <div className="font-bold leading-tight">{x.t} <span className="text-[10px] bg-zinc-100 rounded-full px-2 py-0.5">{x.s}</span></div>
                <div className="text-xs text-zinc-600 mt-1">{x.d}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-amber-50 border-2 border-amber-200 rounded-[20px] p-6 flex flex-wrap gap-4 items-center">
          <div>
            <div className="font-black text-amber-900">Biggest opportunity for hackathon</div>
            <div className="text-sm text-zinc-700 mt-1">Don&apos;t replace e-NAM — <b>augment</b> it. “How to make e-NAM accessible to low-digital-literacy farmers?”</div>
          </div>
          <Link href="/solution" className="ml-auto px-6 py-3 bg-zinc-900 text-white rounded-full font-bold hover:bg-black">Our Solution →</Link>
        </div>

        <div className="mt-6 flex flex-wrap gap-3 text-xs">
          <Link href="/" className="px-4 py-2 bg-white border rounded-full font-bold">← Home</Link>
          <Link href="/demo" className="px-4 py-2 bg-emerald-600 text-white rounded-full font-bold">Try Live Demo</Link>
          <Link href="/workflow" className="px-4 py-2 bg-white border rounded-full font-bold">See Workflow →</Link>
        </div>
      </div>
    </div>
  )
}
