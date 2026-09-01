"use client"
import { useState, useEffect } from "react"
import { Navbar } from "@/components/Navbar"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

export default function FpoPage() {
  const { toast } = useToast()
  const [lots, setLots] = useState<any[]>([])
  const [pooled, setPooled] = useState(22)
  const [members, setMembers] = useState(14)

  useEffect(() => {
    try { const l = JSON.parse(localStorage.getItem("ks_lots") || "[]"); setLots(l) } catch {}
  }, [])

  const totalQty = lots.reduce((s, l) => s + parseInt(l.qty || "0"), 0) + pooled
  const premium = totalQty * 90

  return (
    <div className="min-h-screen bg-[#FFFCF5]">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-3xl font-black">FPO Dashboard</h1>
          <span className="bg-lime-500 text-zinc-900 rounded-full px-3 py-1 text-xs font-black">Aggregator • Sahyadri FPO</span>
          <span className="bg-white border rounded-full px-3 py-1 text-xs font-bold">{members} members • {pooled} MT pooled</span>
        </div>
        <p className="mt-2 text-zinc-600">Aggregate smallholder lots, unlock institutional premium, share logistics. Firebase collection: <code>lots</code> where grade = A/A+.</p>

        <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border rounded-2xl p-5 text-center"><div className="text-2xl font-black text-emerald-700">{totalQty} q</div><div className="text-xs font-bold text-zinc-500">Pooled Volume</div></div>
          <div className="bg-white border rounded-2xl p-5 text-center"><div className="text-2xl font-black text-lime-600">₹{premium.toLocaleString("en-IN")}</div><div className="text-xs font-bold text-zinc-500">Premium Unlocked</div><div className="text-[11px] text-zinc-400">+₹90/q</div></div>
          <div className="bg-white border rounded-2xl p-5 text-center"><div className="text-2xl font-black text-amber-600">₹55/q</div><div className="text-xs font-bold text-zinc-500">Shared Transport</div><div className="text-[11px] text-zinc-400">vs ₹300/q solo</div></div>
          <div className="bg-white border rounded-2xl p-5 text-center"><div className="text-2xl font-black text-blue-700">NCDEX</div><div className="text-xs font-bold text-zinc-500">Institutional Buyer</div><div className="text-[11px] text-zinc-400">100 MT demand</div></div>
        </div>

        <div className="mt-6 grid lg:grid-cols-2 gap-4">
          <div className="bg-white border rounded-2xl p-5">
            <div className="font-black">👥 Member Lots ({lots.length})</div>
            <div className="mt-3 space-y-2 max-h-[340px] overflow-auto">
              {lots.length ? lots.map((l: any) => (
                <div key={l.id} className="border rounded-xl px-3 py-2 flex justify-between items-center">
                  <div><div className="font-bold text-sm">#{l.id} • {l.crop} • {l.qty}q • {l.grade}</div><div className="text-xs text-zinc-600">{l.mandi} • Farmer: Ramesh • {l.status}</div></div>
                  <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full">In Pool</span>
                </div>
              )) : <div className="text-sm text-zinc-500 border-2 border-dashed rounded-xl p-6 text-center">No member lots yet — <Link href="/demo" className="underline text-emerald-700">Create in Demo</Link></div>}
              <div className="border-2 border-dashed border-lime-300 bg-lime-50 rounded-xl p-3 flex justify-between items-center">
                <div><div className="font-bold text-sm">+ Add Your Lot</div><div className="text-xs text-zinc-600">Pooling closes today 6pm • Truck leaves 4pm</div></div>
                <Link href="/demo" className="px-4 py-1.5 bg-lime-600 text-white rounded-full text-xs font-bold">Add →</Link>
              </div>
            </div>
          </div>
          <div className="bg-zinc-900 text-white rounded-2xl p-5">
            <div className="font-black">🚚 Logistics & Payment — FPO Advantage</div>
            <div className="mt-4 bg-white text-zinc-900 rounded-2xl p-4 space-y-2 text-sm">
              <div className="flex justify-between border-b pb-2"><span>Moshi → Latur (22 MT)</span><b>₹1,200 shared</b></div>
              <div className="flex justify-between border-b pb-2"><span>Per quintal</span><b className="text-emerald-700">₹55/q</b> <span className="text-xs line-through text-zinc-400">₹300/q solo</span></div>
              <div className="flex justify-between"><span>Payment</span><b>T+0 • FPO escrow • 99.8% on-time</b></div>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <button onClick={() => toast({ title: "FPO Pool Joined", description: `${pooled} MT → Institutional buyer notified` })} className="py-2.5 bg-lime-500 text-zinc-900 rounded-xl font-black">Join Pool</button>
              <button onClick={() => toast({ title: "Invite sent", description: "Link copied for 14 members" })} className="py-2.5 bg-white text-zinc-900 rounded-xl font-bold">Invite Members</button>
            </div>
            <div className="mt-3 text-xs opacity-70">Verified buyer: NCDEX • 100 MT • ₹5,020/q • Pan-India • Premium +₹90/q for A-grade pooled lots.</div>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <Link href="/admin" className="px-6 py-3 bg-white border rounded-full font-bold">← Admin</Link>
          <Link href="/demo" className="px-6 py-3 bg-emerald-600 text-white rounded-full font-bold">Live Demo →</Link>
          <Link href="/" className="ml-auto px-6 py-3 bg-zinc-900 text-white rounded-full font-bold">Home</Link>
        </div>
      </div>
    </div>
  )
}
