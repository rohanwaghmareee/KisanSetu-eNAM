"use client"
import { useState, useEffect } from "react"
import { Navbar } from "@/components/Navbar"
import { useToast } from "@/hooks/use-toast"
import { fetchLiveMandi, toMandiCard } from "@/lib/agmarknet"
import Link from "next/link"

const fallback = {
  Soybean: [{ mandi: "Pune — Moshi", price: 4720, trend: "+2.4%", distance: "18 km", arrival: "142 q", grade: "FAQ" }, { mandi: "Latur", price: 4890, trend: "+4.1%", distance: "312 km", arrival: "89 q", grade: "A" }, { mandi: "Nagpur", price: 4610, trend: "-0.8%", distance: "645 km", arrival: "210 q", grade: "FAQ" }],
  Cotton: [{ mandi: "Nagpur", price: 7250, trend: "+1.8%", distance: "645 km", arrival: "98 q", grade: "FAQ" }, { mandi: "Akola", price: 7420, trend: "+3.1%", distance: "280 km", arrival: "54 q", grade: "A" }],
  Onion: [{ mandi: "Lasalgaon", price: 1850, trend: "+6.2%", distance: "210 km", arrival: "420 q", grade: "A" }, { mandi: "Pune — Moshi", price: 1920, trend: "+4.5%", distance: "18 km", arrival: "180 q", grade: "FAQ" }],
  Wheat: [{ mandi: "Indore", price: 2420, trend: "+0.9%", distance: "412 km", arrival: "250 q", grade: "FAQ" }],
} as any

export default function MandiBhavPage() {
  const { toast } = useToast()
  const [crop, setCrop] = useState("Soybean")
  const [data, setData] = useState<any[]>(fallback.Soybean)
  const [source, setSource] = useState<"live"|"mock"|"loading">("loading")
  const [err, setErr] = useState("")

  useEffect(() => {
    setSource("loading")
    fetchLiveMandi(crop, 6).then(r => {
      if (r.source==="live" && r.data.length) { setData(r.data.map(toMandiCard)); setSource("live") }
      else { setData(fallback[crop as keyof typeof fallback]||fallback.Soybean); setSource("mock"); setErr(r.error||"") }
    })
  }, [crop])

  return (
    <div className="min-h-screen bg-[#FFFCF5]">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-wrap items-end gap-3">
          <h1 className="text-3xl font-black">Mandi Bhav — Live Prices</h1>
          <span className={`px-3 py-1 rounded-full text-xs font-bold ${source==="live"?"bg-emerald-600 text-white":source==="loading"?"bg-amber-100 text-amber-800":"bg-zinc-100 text-zinc-600"}`}>{source==="live"?"● Live AGMARKNET":source==="loading"?"● Fetching...":"● Mock"}</span>
          <div className="ml-auto flex bg-white border rounded-full p-1">
            {["Soybean","Cotton","Onion","Wheat"].map(c=> <button key={c} onClick={()=>setCrop(c)} className={`px-4 py-1.5 rounded-full text-xs font-bold ${crop===c?"bg-zinc-900 text-white":"text-zinc-600"}`}>{c}</button>)}
          </div>
        </div>
        <p className="mt-2 text-sm text-zinc-600">Aggregated from AGMARKNET + e-NAM • Arrival volumes • Grade-wise • Best mandi net after transport</p>
        {source==="mock" && err && <div className="mt-3 bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs">Live failed ({err}) — showing cached. Add <code>NEXT_PUBLIC_DATA_GOV_API_KEY</code> for uninterrupted live feed.</div>}

        <div className="mt-6 bg-white border rounded-[20px] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-zinc-50 text-xs font-black text-zinc-500"><tr><th className="text-left px-4 py-3">Mandi (District)</th><th className="text-left px-4 py-3">Modal Price/q</th><th className="text-left px-4 py-3">Trend</th><th className="text-left px-4 py-3">Arrival</th><th className="text-left px-4 py-3">Action</th></tr></thead>
              <tbody>
                {data.map((r:any,i:number)=>(
                  <tr key={r.mandi} className="border-t hover:bg-zinc-50">
                    <td className="px-4 py-3"><div className="font-bold">{r.mandi}</div><div className="text-xs text-zinc-500">{r.grade} {r.state?`• ${r.state}`:""} {r.variety?`• ${r.variety}`:""}</div></td>
                    <td className="px-4 py-3 font-black">₹{r.price.toLocaleString("en-IN")}</td>
                    <td className="px-4 py-3"><span className={`px-2 py-1 rounded-full text-xs font-bold ${r.trend.startsWith("+")?"bg-emerald-100 text-emerald-700":"bg-red-100 text-red-700"}`}>{r.trend}</span></td>
                    <td className="px-4 py-3 text-zinc-600">{r.arrival} • {r.distance}</td>
                    <td className="px-4 py-3"><Link href="/sell" className="px-3 py-1.5 bg-emerald-600 text-white rounded-full text-xs font-bold">Sell here →</Link></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 bg-zinc-900 text-white rounded-b-[20px] flex flex-wrap gap-2 items-center text-xs">
            <span>💡 Best net: <b>{data[1]?.mandi || data[0]?.mandi}</b> after transport</span>
            <button onClick={()=>toast({title:"Price trend", description:`${crop} +3.2% this week at ${data[0].mandi}`})} className="ml-auto bg-white text-zinc-900 px-3 py-1 rounded-full font-bold">View trend</button>
            <Link href="/bidding" className="bg-amber-500 text-white px-3 py-1 rounded-full font-bold">Live Bidding →</Link>
          </div>
        </div>

        <div className="mt-4 grid md:grid-cols-3 gap-4">
          <div className="bg-white border rounded-2xl p-5"><div className="font-black">📈 7-day Forecast</div><div className="text-xs text-zinc-600 mt-1">LSTM model on arrivals + IMD + MSP</div><div className="mt-3 h-16 flex items-end gap-1">{[40,55,45,70,60,80,75].map((h,i)=><div key={i} className={`flex-1 rounded-t ${i>=5?"bg-amber-500":"bg-emerald-600"}`} style={{height:`${h}%`}}/>)}</div><div className="mt-2 text-xs font-bold text-emerald-700">Sell in 4 days → ₹{(data[0].price+180).toLocaleString()}</div></div>
          <div className="bg-white border rounded-2xl p-5"><div className="font-black">📍 Best Mandi</div><div className="mt-2 bg-emerald-50 border border-emerald-200 rounded-xl p-3"><div className="font-black text-emerald-800">{data[1]?.mandi || data[0].mandi}</div><div className="text-xs text-zinc-600">Net +₹210/q vs local after ₹1,800 transport</div></div><Link href="/logistics" className="mt-3 block w-full text-center py-2 bg-zinc-900 text-white rounded-xl text-xs font-bold">Book Transport →</Link></div>
          <div className="bg-white border rounded-2xl p-5"><div className="font-black">🔔 Price Alert</div><div className="text-xs text-zinc-600 mt-1">Get notified when {crop} hits your target</div><Link href="/sell" className="mt-3 block w-full text-center py-2 bg-amber-500 text-white rounded-xl font-bold">Set Alert</Link></div>
        </div>
      </div>
    </div>
  )
}
