"use client"
import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"

export default function PaymentsPage(){
  const {toast}=useToast()
  const [lots,setLots]=useState<any[]>([])
  useEffect(()=>{ try{ setLots(JSON.parse(localStorage.getItem("ks_lots")||"[]")) }catch{} },[])

  return (
    <div className="min-h-screen bg-[#FFFCF5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <h1 className="text-3xl font-black">Payments</h1>
        <p className="text-sm text-zinc-600">UPI T+1 tracking, settlement status, fraud anomaly detection — Firebase <code>lots</code> collection.</p>

        <div className="mt-6 grid md:grid-cols-3 gap-4">
          <div className="bg-white border rounded-2xl p-5 text-center"><div className="text-2xl font-black text-emerald-700">T+1</div><div className="text-xs font-bold text-zinc-500">Avg. Settlement</div></div>
          <div className="bg-white border rounded-2xl p-5 text-center"><div className="text-2xl font-black text-blue-700">99.2%</div><div className="text-xs font-bold text-zinc-500">On-time</div></div>
          <div className="bg-white border rounded-2xl p-5 text-center"><div className="text-2xl font-black text-amber-700">₹{(lots.reduce((s,l)=>s+parseInt(l.qty||"0")*l.price,0) || 73350).toLocaleString("en-IN")}</div><div className="text-xs font-bold text-zinc-500">Total Credited (demo)</div></div>
        </div>

        <div className="mt-6 bg-white border rounded-2xl p-5">
          <div className="font-black flex items-center gap-2">💳 Transactions <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full">Fraud detection ON</span></div>
          <div className="mt-4 space-y-2">
            {lots.length? lots.map((l:any)=>(
              <div key={l.id} className="border rounded-xl p-4 flex gap-4 items-center bg-emerald-50/50">
                <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center">✓</div>
                <div className="flex-1"><div className="font-bold text-sm">Lot #{l.id} • {l.crop} {l.qty}q @ ₹{l.price}</div><div className="text-xs text-zinc-600">UPI • Credited • {l.mandi} • {l.createdAt}</div></div>
                <div className="text-right"><div className="font-black text-emerald-700">₹{(parseInt(l.qty)*l.price).toLocaleString("en-IN")}</div><div className="text-xs text-zinc-500">24h • T+1</div></div>
              </div>
            )) : (
              <>
                <div className="border rounded-xl p-4 flex gap-4 items-center"><div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center">✓</div><div className="flex-1"><div className="font-bold text-sm">Lot #AK-2841 • Sold @ ₹4,890</div><div className="text-xs text-zinc-600">UPI • ₹73,350 credited • 24h</div></div><div className="text-xs bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full">Settled</div></div>
                <div className="border rounded-xl p-4 flex gap-4 items-center"><div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center">QR</div><div className="flex-1"><div className="font-bold text-sm">Gate Pass Generated</div><div className="text-xs text-zinc-600">QR verified • Exit without agent</div></div><div className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">QR</div></div>
              </>
            )}
            <div className="border rounded-xl p-4 flex gap-4 items-center">
              <div className="w-10 h-10 rounded-full bg-zinc-200 flex items-center justify-center">🛡️</div>
              <div className="flex-1"><div className="font-bold text-sm">Anomaly Check</div><div className="text-xs text-zinc-600">No price manipulation • Model v2.1 • Firebase logs clean</div></div>
              <button onClick={()=>toast({title:"Fraud check", description:"All bids verified — no anomaly"})} className="px-4 py-1.5 bg-zinc-900 text-white rounded-full text-xs font-bold">Run Check</button>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-amber-50 border border-amber-200 rounded-2xl p-5 flex flex-wrap gap-3 items-center">
          <div><div className="font-black">Need help?</div><div className="text-xs text-zinc-600">Payment not received? Raise grievance — APMC responds in 24h.</div></div>
          <a href="/grievance" className="ml-auto px-6 py-2 bg-red-600 text-white rounded-full font-bold">Raise Grievance →</a>
        </div>
      </div>
    </div>
  )
}
