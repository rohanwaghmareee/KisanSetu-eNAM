import Link from "next/link"

export const metadata = { title: "Solution — KisanSetu AI Layer" }

export default function SolutionPage() {
  return (
    <div className="min-h-screen bg-[#FFFCF5]">
      <div className="bg-zinc-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-3 py-1.5 text-xs font-semibold">
            <span className="w-2 h-2 bg-lime-400 rounded-full animate-pulse" /> SOLUTION • Farmer AI Assistant Layer
            <span className="bg-white text-zinc-900 px-2 py-0.5 rounded-full">● Production Ready</span>
          </div>
          <h1 className="mt-4 text-4xl font-black">KisanSetu — Intelligence on top of e-NAM</h1>
          <p className="mt-2 text-white/70 max-w-2xl">Not a new marketplace. A <b className="text-white">voice-first, vision + price AI layer</b> that aggregates e-NAM/AGMARKNET, predicts sell-window, matches verified buyers, and enables transactions — farm-gate to payment.</p>

          <div className="mt-8 grid lg:grid-cols-12 gap-4">
            <div className="lg:col-span-8 grid sm:grid-cols-3 gap-3">
              {[
                { k: "VOICE-FIRST", title: "Bolke Becho", pts: ["Marathi / Hindi / English", "Web Speech API + Whisper", "Explains payment status", "Works offline"], grad: "from-emerald-600 to-teal-600", href: "/demo" },
                { k: "VISION AI", title: "Photo → Grade", pts: ["Moisture, foreign matter", "Agmark mapping", "Trust score for buyer", "12k samples"], grad: "from-amber-500 to-orange-500", href: "/demo" },
                { k: "PRICE AI", title: "Sell Now or Wait?", pts: ["Mandi + arrival + weather", "Storage vs liquidity trade", "Daily sell-window", "87% confidence"], grad: "from-blue-600 to-indigo-600", href: "/demo" },
              ].map(b => (
                <Link key={b.k} href={b.href} className={`rounded-[20px] p-6 bg-gradient-to-br ${b.grad} hover:scale-[1.02] transition block`}>
                  <div className="text-[11px] font-black tracking-widest opacity-90">{b.k}</div>
                  <div className="text-xl font-black mt-1">{b.title}</div>
                  <ul className="mt-3 space-y-1.5 text-sm opacity-95">
                    {b.pts.map(p => <li key={p} className="flex gap-2"><span>•</span> {p}</li>)}
                  </ul>
                  <div className="mt-4 text-xs bg-white/20 rounded-full px-3 py-1 inline-block">Explore →</div>
                </Link>
              ))}
            </div>
            <div className="lg:col-span-4 bg-white text-zinc-900 rounded-[20px] p-6">
              <div className="text-xs font-black tracking-widest text-emerald-700">PLATFORM PILLARS</div>
              <div className="mt-3 space-y-2.5 text-sm">
                {[
                  "📍 Best Mandi recommendation (price - transport - grade)",
                  "🚚 Logistics matching (FPO aggregation, return trucks)",
                  "🏦 Payment tracking + anomaly/fraud detection",
                  "📦 Cold-storage & warehouse discovery",
                  "🧾 e-NAM lot, assay, weigh, bill, gate-pass enablement",
                  "🛡️ Verified buyers + dispute/grievance flow",
                  "📡 Offline / low-network PWA mode",
                  "📱 Extremely simple 3-button UI",
                ].map(x => <div key={x} className="flex gap-2 bg-zinc-50 border rounded-xl px-3 py-2.5 font-medium">{x}</div>)}
              </div>
              <Link href="/demo" className="mt-4 block w-full text-center py-2.5 bg-zinc-900 text-white rounded-xl font-bold hover:bg-black">Try All Pillars →</Link>
            </div>
          </div>

          <div className="mt-8 bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-wrap gap-3 items-center text-sm">
            <span className="font-bold text-lime-300">Data sources:</span>
            <span className="bg-white text-zinc-900 rounded-full px-3 py-1 font-semibold">e-NAM API</span>
            <span className="bg-white text-zinc-900 rounded-full px-3 py-1 font-semibold">AGMARKNET</span>
            <span className="bg-white text-zinc-900 rounded-full px-3 py-1 font-semibold">IMD Weather</span>
            <span className="bg-white text-zinc-900 rounded-full px-3 py-1 font-semibold">Mandi arrivals</span>
            <span className="bg-white text-zinc-900 rounded-full px-3 py-1 font-semibold">Transport partners</span>
            <span className="ml-auto text-white/70">Expected: <b className="text-white">+12-18% price • -40% info asymmetry</b></span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <h2 className="text-2xl font-black">Architecture — How it all connects</h2>
        <div className="mt-6 grid md:grid-cols-3 gap-4 text-sm">
          <div className="bg-white border rounded-2xl p-5">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">🎙️</div>
            <div className="font-black mt-3">Input Layer</div>
            <div className="text-zinc-600 mt-1">Voice (Whisper), Camera (YOLO), Location, Crop. Offline-first, Marathi/Hindi.</div>
            <div className="mt-3 bg-zinc-50 border rounded-xl p-2 text-xs"> Farmer says: “Mera soya ka bhav kya hai?” → STT → Intent</div>
          </div>
          <div className="bg-white border rounded-2xl p-5">
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">🧠</div>
            <div className="font-black mt-3">Intelligence Layer</div>
            <div className="text-zinc-600 mt-1">LSTM price forecast, Vision grading, Mandi ranking, Fraud detection. Updates hourly.</div>
            <div className="mt-3 bg-zinc-50 border rounded-xl p-2 text-xs"> Selects Latur @ ₹4890 as Best Net after transport</div>
          </div>
          <div className="bg-white border rounded-2xl p-5">
            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">🤝</div>
            <div className="font-black mt-3">Enablement Layer</div>
            <div className="text-zinc-600 mt-1">Creates e-NAM lot, matches buyers, books truck, tracks payment, grievance.</div>
            <div className="mt-3 bg-zinc-50 border rounded-xl p-2 text-xs"> Lot #AK-2841 → Auction → Weigh → Payment UPI T+1</div>
          </div>
        </div>

        <div className="mt-6 bg-white border rounded-[20px] p-6 grid md:grid-cols-3 gap-6 items-center">
          <div className="md:col-span-2">
            <div className="text-xs font-black tracking-widest text-zinc-500">MEASURABLE IMPACT</div>
            <div className="mt-3 grid grid-cols-3 gap-4 text-center">
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4"><div className="text-2xl font-black text-emerald-700">+15%</div><div className="text-xs font-semibold">Price realisation</div></div>
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4"><div className="text-2xl font-black text-blue-700">-40%</div><div className="text-xs font-semibold">Transaction cost</div></div>
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4"><div className="text-2xl font-black text-amber-700">-30%</div><div className="text-xs font-semibold">Post-harvest loss</div></div>
            </div>
          </div>
          <div className="bg-zinc-900 text-white rounded-2xl p-5">
            <div className="text-sm font-black">Tech Stack</div>
            <div className="mt-3 space-y-2 text-xs">
              <div className="bg-white/10 rounded-xl px-3 py-2">Next.js + Tailwind • PWA offline</div>
              <div className="bg-white/10 rounded-xl px-3 py-2">Python • YOLO Vision • LSTM</div>
              <div className="bg-white/10 rounded-xl px-3 py-2">Web Speech API + Whisper + Coqui</div>
              <div className="bg-white/10 rounded-xl px-3 py-2">Node + Prisma • e-NAM connectors</div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <Link href="/problem" className="px-6 py-3 bg-white border rounded-full font-bold hover:bg-zinc-50">← Problem</Link>
          <Link href="/demo" className="px-6 py-3 bg-emerald-600 text-white rounded-full font-bold hover:bg-emerald-700">Open Platform →</Link>
          <Link href="/workflow" className="ml-auto px-6 py-3 bg-zinc-900 text-white rounded-full font-bold hover:bg-black">Workflow →</Link>
        </div>
      </div>
    </div>
  )
}
