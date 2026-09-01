"use client"
import { useState } from "react"
import { Navbar } from "@/components/Navbar"
import { useToast } from "@/hooks/use-toast"

export default function LogisticsPage(){
  const {toast}=useToast()
  const [bookings,setBookings]=useState<any[]>([])
  const book=(q:string)=>{ const b={id:Date.now().toString(), q, time:new Date().toLocaleString()}; setBookings(p=>[b,...p]); toast({title:"Booked!", description:q + " — driver will call"})}
  return (
    <div className="min-h-screen bg-[#FFFCF5]">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <h1 className="text-3xl font-black">Logistics</h1>
        <p className="text-sm text-zinc-600">Truck booking, shared FPO transport, cold-chain — compare & book in one tap.</p>

        <div className="mt-6 grid md:grid-cols-3 gap-4">
          {[
            { r:"Moshi → Latur • 6MT", p:"₹1,800", t:"Mahindra Bolero • Today 4pm", s:"₹300/q" },
            { r:"FPO Pool → Latur • 22MT", p:"₹1,200 (shared)", t:"Shared • -33% via FPO", s:"₹55/q" },
            { r:"Cold Chain • 6MT", p:"₹2,400", t:"Reefer • 3km ext", s:"₹400/q" },
          ].map(q=>(
            <div key={q.r} className="bg-white border rounded-2xl p-5">
              <div className="font-black text-sm">{q.r}</div>
              <div className="text-xs text-zinc-600 mt-1">{q.t} • {q.s}</div>
              <div className="mt-3 text-xl font-black">{q.p}</div>
              <button onClick={()=>book(`${q.r} ${q.p}`)} className="mt-3 w-full py-2.5 bg-emerald-700 text-white rounded-xl font-bold">Book Now</button>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-white border rounded-2xl p-5">
          <div className="font-black">Compare Quotes</div>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-zinc-50"><tr><th className="text-left px-3 py-2">Provider</th><th className="text-left px-3 py-2">Price</th><th className="text-left px-3 py-2">ETA</th><th className="text-left px-3 py-2">Action</th></tr></thead>
              <tbody>
                {[
                  ["Local Truck Union","₹1,800","4 hrs"],
                  ["Sahyadri FPO Logistics","₹1,200","6 hrs • Verified"],
                  ["Cold Chain Express","₹2,400","2 hrs • Cold"],
                ].map(([a,b,c])=> <tr key={a} className="border-t"><td className="px-3 py-2 font-bold">{a}</td><td className="px-3 py-2">{b}</td><td className="px-3 py-2 text-xs">{c}</td><td className="px-3 py-2"><button onClick={()=>book(`${a} ${b}`)} className="px-3 py-1 bg-zinc-900 text-white rounded-full text-xs font-bold">Book</button></td></tr>)}
              </tbody>
            </table>
          </div>
        </div>

        {bookings.length>0 && <div className="mt-6 bg-emerald-50 border border-emerald-200 rounded-2xl p-5"><div className="font-black">My Bookings ({bookings.length})</div><div className="mt-2 space-y-1">{bookings.map((b:any)=><div key={b.id} className="text-xs bg-white border rounded-full px-3 py-2">✓ {b.q} • {b.time}</div>)}</div></div>}
      </div>
    </div>
  )
}
