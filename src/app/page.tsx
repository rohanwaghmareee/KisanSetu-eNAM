"use client"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"

export default function HomePage() {
  const { toast } = useToast()
  const [lots, setLots] = useState<any[]>([])
  useEffect(() => { try { setLots(JSON.parse(localStorage.getItem("ks_lots")||"[]")) } catch {} }, [])

  const modules = [
    { href: "/mandi-bhav", icon: "📊", title: "Mandi Bhav", desc: "Live AGMARKNET prices • 1,368 mandis", color: "emerald" },
    { href: "/buyers", icon: "🤝", title: "Verified Buyers", desc: "Processors • FPO • Institutional", color: "blue" },
    { href: "/sell", icon: "📦", title: "Sell Produce", desc: "Lot + Quality AI grading", color: "amber" },
    { href: "/bidding", icon: "🔨", title: "Live Bidding", desc: "Real-time bids • Voice alerts", color: "emerald" },
    { href: "/fpo", icon: "👥", title: "FPO Aggregation", desc: "Pool 22 MT • +₹90/q premium", color: "lime" },
    { href: "/logistics", icon: "🚚", title: "Logistics", desc: "Truck • Shared • Cold chain", color: "orange" },
    { href: "/warehouse", icon: "🏭", title: "Warehouse / e-NWR", desc: "Storage • e-NWR pledge", color: "amber" },
    { href: "/payments", icon: "💰", title: "Payments", desc: "UPI T+1 • Fraud check", color: "emerald" },
    { href: "/grievance", icon: "🛡️", title: "Grievance", desc: "APMC 1-click dispute", color: "red" },
    { href: "/profile", icon: "👨‍🌾", title: "Farmer Profile", desc: "KYC • Lots • History", color: "zinc" },
    { href: "/schemes", icon: "📜", title: "Schemes", desc: "PM-Kisan • MSP • Subsidies", color: "blue" },
  ]

  return (
    <div className="min-h-screen bg-[#FFFCF5]">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-amber-50 to-lime-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-10">
          <div className="inline-flex items-center gap-2 bg-white border rounded-full px-3 py-1 text-xs font-bold shadow-sm">
            <span className="w-2 h-2 bg-emerald-600 rounded-full animate-pulse" /> Bharat Market Network • Live • Firebase: kisansetu-enam-2026
          </div>
          <h1 className="mt-4 text-4xl sm:text-5xl font-black leading-tight">Market Intelligence & <span className="text-emerald-700">Transaction</span> <span className="text-amber-600">Enablement</span> for Every Farmer</h1>
          <p className="mt-3 text-zinc-600 max-w-2xl">From mandi price to payment — voice-first in Marathi/Hindi, AI price prediction, quality vision, verified buyers, logistics, warehouse e-NWR. Built on e-NAM, ready for market.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/mandi-bhav" className="px-7 py-3 bg-emerald-700 text-white rounded-full font-bold hover:bg-emerald-800">Check Mandi Bhav →</Link>
            <Link href="/sell" className="px-7 py-3 bg-amber-500 text-white rounded-full font-bold hover:bg-amber-600">Sell Produce</Link>
            <Link href="/buyers" className="px-7 py-3 bg-white border rounded-full font-bold hover:bg-zinc-50">Find Buyers</Link>
          </div>
          <div className="mt-8 grid grid-cols-3 gap-3 max-w-lg">
            <div className="bg-white border rounded-2xl p-4 text-center"><div className="text-2xl font-black text-emerald-700">1,368</div><div className="text-xs font-bold text-zinc-500">Mandis</div></div>
            <div className="bg-white border rounded-2xl p-4 text-center"><div className="text-2xl font-black text-amber-600">+15%</div><div className="text-xs font-bold text-zinc-500">Price uplift</div></div>
            <div className="bg-white border rounded-2xl p-4 text-center"><div className="text-2xl font-black">{lots.length || 0}</div><div className="text-xs font-bold text-zinc-500">Your lots</div></div>
          </div>
        </div>
      </section>

      {/* Modules Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-black">Final Platform — 11 Modules</h2>
          <span className="bg-zinc-900 text-white rounded-full px-3 py-1 text-xs font-bold">Production Ready</span>
        </div>
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {modules.map(m => (
            <Link key={m.href} href={m.href} className="bg-white border rounded-2xl p-5 hover:shadow-md transition group">
              <div className="w-10 h-10 rounded-xl bg-zinc-50 border flex items-center justify-center text-xl group-hover:scale-110 transition">{m.icon}</div>
              <div className="mt-3 font-black">{m.title}</div>
              <div className="text-xs text-zinc-600 mt-1">{m.desc}</div>
              <div className="mt-3 text-xs font-bold text-emerald-700">Open →</div>
            </Link>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-zinc-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <h2 className="text-2xl font-black">How it works — Farm gate to payment</h2>
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 text-xs">
            {["Mandi Bhav\nLive prices","Sell Produce\nLot + Quality","Live Bidding\nVoice bids","FPO / Logistics\nPool & truck","Warehouse\nStore + e-NWR","Payments\nUPI T+1"].map((s,i) => (
              <div key={s} className="bg-white/10 border border-white/20 rounded-2xl p-4 text-center">
                <div className="w-8 h-8 mx-auto rounded-full bg-white text-zinc-900 flex items-center justify-center font-black">{i+1}</div>
                <div className="mt-2 font-bold whitespace-pre-line">{s}</div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3 justify-center">
            <Link href="/mandi-bhav" className="px-6 py-3 bg-emerald-600 text-white rounded-full font-bold">Start with Mandi Bhav</Link>
            <Link href="/profile" className="px-6 py-3 bg-white text-zinc-900 rounded-full font-bold">Farmer Profile</Link>
          </div>
        </div>
      </section>

      <footer className="max-w-7xl mx-auto px-4 sm:px-6 py-6 text-xs text-zinc-500 flex flex-wrap gap-4 justify-center border-t mt-8">
        <span>© 2026 KisanSetu Technologies Pvt. Ltd.</span>
        <span>•</span>
        <span>Firebase: kisansetu-enam-2026 • Firestore live</span>
        <span>•</span>
        <a href="https://github.com/rohanwaghmareee/KisanSetu-eNAM" className="underline">GitHub</a>
      </footer>
    </div>
  )
}
