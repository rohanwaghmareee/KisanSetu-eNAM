"use client"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

export default function WarehousePage(){
  const {toast}=useToast()
  const [booked,setBooked]=useState<any[]>([])
  const wh=[
    { name:"Maharashtra State Warehousing", loc:"Pune • 3km", cap:"10,000 MT", rate:"₹42/q / 7 days", type:"e-NWR • WDRA", avail:"2,400 MT free" },
    { name:"Cold Storage — Sahyadri", loc:"Baramati • 12km", cap:"2,000 MT Cold", rate:"₹120/q / 7 days", type:"Cold • e-NWR", avail:"340 MT free" },
    { name:"Private Silo — Adani", loc:"Latur • 8km", cap:"50,000 MT", rate:"₹38/q / 7 days", type:"e-NWR • Pledge", avail:"8,900 MT free" },
  ]
  const book=(w:any)=>{ setBooked(p=>[{id:Date.now().toString(), w:w.name, rate:w.rate},...p]); toast({title:"Warehouse booked!", description:`${w.name} — ${w.rate} • e-NWR generated`})}
  return (
    <div className="min-h-screen bg-[#FFFCF5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <h1 className="text-3xl font-black">Warehouse / e-NWR</h1>
        <p className="text-sm text-zinc-600">Store produce, generate e-NWR (Electronic Negotiable Warehouse Receipt), pledge for loan via e-NAM.</p>

        <div className="mt-6 grid md:grid-cols-3 gap-4">
          {wh.map(w=>(
            <div key={w.name} className="bg-white border rounded-2xl p-5">
              <div className="font-black leading-tight">{w.name}</div>
              <div className="text-xs text-zinc-600 mt-1">{w.loc} • {w.cap}</div>
              <div className="mt-3 bg-zinc-50 border rounded-xl p-3 text-xs"><div>Rate: <b>{w.rate}</b></div><div>Type: <b>{w.type}</b></div><div>Available: <b className="text-emerald-700">{w.avail}</b></div></div>
              <button onClick={()=>book(w)} className="mt-3 w-full py-2.5 bg-amber-500 text-white rounded-xl font-bold">Book & Generate e-NWR</button>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-white border rounded-2xl p-5">
          <div className="font-black">What is e-NWR?</div>
          <p className="text-sm text-zinc-600 mt-1">Electronic Negotiable Warehouse Receipt — digital token for stored produce. Pledge to bank for 70-80% loan, trade on commodity exchange, no distress sale.</p>
          <div className="mt-3 flex gap-2 text-xs">
            <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full font-bold">✓ WDRA Registered</span>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-bold">✓ e-NAM Linked</span>
            <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full font-bold">✓ Bank Pledge</span>
          </div>
        </div>

        {booked.length>0 && <div className="mt-6 bg-zinc-900 text-white rounded-2xl p-5"><div className="font-black">My e-NWRs ({booked.length})</div><div className="mt-2 space-y-1">{booked.map((b:any)=><div key={b.id} className="text-xs bg-white/10 rounded-full px-3 py-2">📜 {b.w} • {b.rate} • e-NWR# {b.id.slice(-6)}</div>)}</div></div>}
      </div>
    </div>
  )
}
