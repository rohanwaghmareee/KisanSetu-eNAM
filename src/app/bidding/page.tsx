"use client"
import { useState, useEffect } from "react"
import { Navbar } from "@/components/Navbar"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

export default function BiddingPage(){
  const {toast}=useToast()
  const [lots,setLots]=useState<any[]>([])
  const [bid,setBid]=useState(4935)
  const [history,setHistory]=useState<number[]>([4850,4890,4910,4935])
  useEffect(()=>{ try{setLots(JSON.parse(localStorage.getItem("ks_lots")||"[]"))}catch{}; const iv=setInterval(()=>{ setBid(b=>{ const nb=b+Math.floor(Math.random()*30-10); setHistory(h=>[...h.slice(-7),nb]); return nb}); },4000); return()=>clearInterval(iv)},[])
  const lot=lots[0] || {id:"AK-2841", crop:"Soybean", qty:"12", mandi:"Latur", price:4890}

  return (
    <div className="min-h-screen bg-[#FFFCF5]">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <h1 className="text-3xl font-black">Live Bidding</h1>
        <p className="text-sm text-zinc-600">Real-time auction • Voice alerts in Marathi/Hindi • Firebase live sync</p>

        <div className="mt-6 grid lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 bg-white border rounded-[20px] p-6">
            <div className="flex items-center gap-2"><span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" /> <span className="font-black">Auction — Lot #{lot.id}</span> <span className="ml-auto text-xs bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full">● Live</span></div>
            <div className="mt-3 bg-zinc-900 text-white rounded-2xl p-5 text-center">
              <div className="text-xs opacity-70">Current Highest Bid</div>
              <div className="text-4xl font-black mt-1">₹{bid.toLocaleString("en-IN")}/q</div>
              <div className="text-xs opacity-70 mt-1">{lot.crop} • {lot.qty}q • {lot.mandi} • AgroPure Foods</div>
              <div className="mt-4 h-16 flex items-end gap-1 justify-center">{history.map((v,i)=><div key={i} className="w-6 rounded-t bg-lime-400" style={{height:`${((v-4800)/200)*100}%`}} />)}</div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2">
              <button onClick={()=>toast({title:"Bid accepted!", description:`₹${bid}/q — payment T+1`})} className="py-3 bg-emerald-600 text-white rounded-xl font-black">Accept ₹{bid}</button>
              <button onClick={()=>{ const c=bid+50; setBid(c); setHistory(h=>[...h,c]); toast({title:"Counter sent", description:`₹${c}/q`})}} className="py-3 bg-amber-500 text-white rounded-xl font-bold">Counter +₹50</button>
              <button onClick={()=>toast({title:"Watching", description:"We'll notify on new bid"})} className="py-3 bg-white border rounded-xl font-bold">Wait</button>
            </div>
            <div className="mt-3 text-xs bg-zinc-50 border rounded-xl p-3 flex gap-2"><span>🔊 Voice:</span><button onClick={()=>{ if("speechSynthesis" in window){ const u=new SpeechSynthesisUtterance(`New bid ${bid} rupees`); u.lang="en-IN"; speechSynthesis.speak(u)} }} className="underline font-bold">Play bid alert</button><span className="ml-auto">Auto-bids every 4s</span></div>
          </div>
          <div className="bg-white border rounded-2xl p-5">
            <div className="font-black">Bid History</div>
            <div className="mt-3 space-y-2 max-h-[300px] overflow-auto">
              {history.slice().reverse().map((b,i)=><div key={i} className="flex justify-between border rounded-xl px-3 py-2 text-sm"><span>Buyer {String.fromCharCode(65+i)} • {new Date().toLocaleTimeString()}</span><b>₹{b}</b></div>)}
            </div>
            <Link href="/payments" className="mt-4 block w-full text-center py-2 bg-zinc-900 text-white rounded-xl font-bold">After Accept → Payments</Link>
          </div>
        </div>

        <div className="mt-6 bg-white border rounded-2xl p-5">
          <div className="font-black">My Lots for Bidding ({lots.length})</div>
          <div className="mt-3 grid sm:grid-cols-2 gap-2">
            {lots.length? lots.map((l:any)=><div key={l.id} className="border rounded-xl px-3 py-2 flex justify-between"><span className="font-bold text-sm">#{l.id} • {l.crop} {l.qty}q</span><span className="text-xs bg-zinc-900 text-white px-2 py-1 rounded-full">Live</span></div>): <div className="text-sm text-zinc-500 border-2 border-dashed rounded-xl p-4 text-center col-span-2">No lots — create in <Link href="/sell" className="underline">Sell Produce</Link></div>}
          </div>
        </div>
      </div>
    </div>
  )
}
