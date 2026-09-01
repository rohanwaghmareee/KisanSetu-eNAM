"use client"
import { useState } from "react"
import { Navbar } from "@/components/Navbar"
import { useToast } from "@/hooks/use-toast"

const buyersByCrop: any = {
  Soybean: [
    { id:"b1", name:"AgroPure Foods Pvt Ltd", type:"Processor", need:"50 MT Soybean / week", price:"₹4,950/q", value:4950, rating:4.8, loc:"Pune MIDC", phone:"98xxxx x210", pay:"T+1 • 99.2%", verified:true },
    { id:"b2", name:"Sahyadri FPO Federation", type:"FPO Aggregator", need:"200 q Soybean A-grade", price:"₹4,900/q", value:4900, rating:4.9, loc:"Baramati", phone:"98xxxx x342", pay:"T+0 • 98.5%", verified:true },
    { id:"b3", name:"NCDEX Institutional Buyer", type:"Institutional", need:"100 MT consistent", price:"₹5,020/q", value:5020, rating:4.7, loc:"Pan-India", phone:"98xxxx x998", pay:"T+2 • 99.8%", verified:true },
  ],
  Cotton: [{ id:"c1", name:"Vardhaman Textiles", type:"Processor", need:"30 MT Cotton / week", price:"₹7,550/q", value:7550, rating:4.6, loc:"Nagpur", pay:"T+1 • 97.2%", verified:true }],
  Onion: [{ id:"o1", name:"Nashik Exporters Co-op", type:"Exporter", need:"100 q Onion A", price:"₹1,990/q", value:1990, rating:4.8, loc:"Lasalgaon", pay:"T+1 • 98%", verified:true }],
}

export default function BuyersPage() {
  const { toast } = useToast()
  const [crop, setCrop] = useState("Soybean")
  const [showOffer, setShowOffer] = useState<any>(null)
  const [qty, setQty] = useState("10")
  const [offers, setOffers] = useState<any[]>([])
  const [showCred, setShowCred] = useState<any>(null)
  const data = buyersByCrop[crop] || buyersByCrop.Soybean

  const send = () => {
    if(!showOffer) return
    const o={id:Date.now().toString(), buyer:showOffer.name, qty, price:showOffer.value, status:"Sent • T+1"}
    setOffers(p=>[o,...p]); try{const prev=JSON.parse(localStorage.getItem("ks_offers")||"[]"); localStorage.setItem("ks_offers", JSON.stringify([o,...prev]))}catch{}
    toast({title:"Offer sent!", description:`${qty}q to ${showOffer.name} @ ${showOffer.price}`}); setShowOffer(null)
  }

  return (
    <div className="min-h-screen bg-[#FFFCF5]">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-wrap items-end gap-3">
          <h1 className="text-3xl font-black">Verified Buyers</h1>
          <span className="bg-emerald-600 text-white rounded-full px-3 py-1 text-xs font-bold">✓ KYC • GSTIN • FSSAI</span>
          <div className="ml-auto flex bg-white border rounded-full p-1">
            {["Soybean","Cotton","Onion"].map(c=> <button key={c} onClick={()=>setCrop(c)} className={`px-4 py-1.5 rounded-full text-xs font-bold ${crop===c?"bg-zinc-900 text-white":"text-zinc-600"}`}>{c}</button>)}
          </div>
        </div>
        <p className="mt-2 text-sm text-zinc-600">Processors, FPO aggregators, institutional & exporters — all verified, payment reliability tracked via Firebase <code>offers</code> collection.</p>

        <div className="mt-6 space-y-3">
          {data.map((b:any)=>(
            <div key={b.id} className="bg-white border rounded-2xl p-5 flex gap-4 hover:shadow-md transition">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-600 to-lime-500 flex items-center justify-center text-white font-black">{b.name[0]}</div>
              <div className="flex-1">
                <div className="flex flex-wrap gap-2 items-center"><div className="font-black">{b.name}</div>{b.verified&&<span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-bold">✓ Verified</span>}<span className="text-xs bg-zinc-100 px-2 py-0.5 rounded-full">{b.type}</span><span className="text-xs">⭐ {b.rating}</span></div>
                <div className="text-xs text-zinc-600 mt-1">{b.need} • <b className="text-emerald-700">{b.price}</b> • {b.loc} • {b.pay}</div>
                <div className="mt-3 flex gap-2"><button onClick={()=>setShowOffer(b)} className="px-4 py-1.5 bg-emerald-700 text-white rounded-full text-xs font-bold">Send Offer</button><button onClick={()=>setShowCred(b)} className="px-4 py-1.5 bg-white border rounded-full text-xs font-bold">View credentials</button><span className="ml-auto text-xs text-zinc-500 hidden sm:inline">Payment: <b className="text-emerald-700">{b.pay}</b></span></div>
              </div>
            </div>
          ))}
        </div>

        {offers.length>0 && <div className="mt-6 bg-white border rounded-2xl p-5"><div className="font-black text-sm">My Offers ({offers.length})</div><div className="mt-2 space-y-1">{offers.map((o:any)=><div key={o.id} className="text-xs bg-zinc-50 border rounded-full px-3 py-2 flex justify-between"><span>{o.qty}q → {o.buyer} @ ₹{o.price}</span><span className="text-emerald-700">{o.status}</span></div>)}</div></div>}

        <div className="mt-6 bg-zinc-900 text-white rounded-2xl p-5 flex flex-wrap gap-3 items-center text-sm">
          <span className="bg-lime-400 text-zinc-900 px-3 py-1 rounded-full font-black">FPO Aggregates Demand</span> 100 MT consistent volume unlocks institutional premium
          <a href="/fpo" className="ml-auto bg-white text-zinc-900 px-4 py-2 rounded-full font-bold">Go to FPO →</a>
        </div>
      </div>

      {showOffer && <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={()=>setShowOffer(null)}><div className="bg-white rounded-[20px] max-w-md w-full p-6" onClick={e=>e.stopPropagation()}><h3 className="font-black">Offer to {showOffer.name}</h3><label className="block mt-3 text-sm font-bold">Qty (q)<input value={qty} onChange={e=>setQty(e.target.value)} className="mt-1 w-full border rounded-xl px-3 py-2"/></label><div className="mt-2 text-xs bg-zinc-50 border rounded-xl p-2">Total: ₹{(parseInt(qty||"0")*showOffer.value).toLocaleString("en-IN")}</div><button onClick={send} className="mt-4 w-full py-3 bg-emerald-700 text-white rounded-xl font-bold">Send Offer</button></div></div>}
      {showCred && <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={()=>setShowCred(null)}><div className="bg-white rounded-[20px] max-w-md w-full p-6" onClick={e=>e.stopPropagation()}><h3 className="font-black">{showCred.name}</h3><div className="mt-3 space-y-2 text-sm"><div className="bg-emerald-50 border rounded-xl p-3">✓ Verified • GSTIN 27AABCT1234H • FSSAI • 99% on-time</div><div className="border rounded-xl px-3 py-2 flex justify-between"><span>Type</span><b>{showCred.type}</b></div><div className="border rounded-xl px-3 py-2 flex justify-between"><span>Rating</span><b>⭐ {showCred.rating}</b></div></div><button onClick={()=>setShowCred(null)} className="mt-4 w-full py-3 bg-zinc-900 text-white rounded-xl font-bold">Close</button></div></div>}
    </div>
  )
}
