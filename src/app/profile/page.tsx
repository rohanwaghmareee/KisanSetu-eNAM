"use client"
import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

export default function ProfilePage(){
  const {toast}=useToast()
  const [name,setName]=useState("Ramesh Patil")
  const [phone,setPhone]=useState("98xxxx x012")
  const [village,setVillage]=useState("Akola, Maharashtra")
  const [lots,setLots]=useState<any[]>([])
  useEffect(()=>{ try{ setLots(JSON.parse(localStorage.getItem("ks_lots")||"[]")); const n=localStorage.getItem("ks_profile_name"); if(n) setName(n)}catch{} },[])
  const save=()=>{ localStorage.setItem("ks_profile_name", name); toast({title:"Profile saved", description:name})}

  return (
    <div className="min-h-screen bg-[#FFFCF5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <h1 className="text-3xl font-black">Farmer Profile</h1>
        <p className="text-sm text-zinc-600">KYC • e-NAM linked • Lots & transactions • Firebase Auth (Anonymous)</p>

        <div className="mt-6 grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 bg-white border rounded-[20px] p-6 text-center">
            <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-emerald-600 to-lime-500 flex items-center justify-center text-white text-2xl font-black">{name[0]}</div>
            <div className="mt-3 font-black text-lg">{name}</div>
            <div className="text-xs text-zinc-600">{village} • {phone}</div>
            <div className="mt-2 inline-block bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-xs font-bold">✓ e-NAM Verified • Aadhaar linked</div>
            <div className="mt-4 space-y-2 text-left">
              <label className="block text-xs font-bold">Name<input value={name} onChange={e=>setName(e.target.value)} className="mt-1 w-full border rounded-xl px-3 py-2 text-sm"/></label>
              <label className="block text-xs font-bold">Phone<input value={phone} onChange={e=>setPhone(e.target.value)} className="mt-1 w-full border rounded-xl px-3 py-2 text-sm"/></label>
              <label className="block text-xs font-bold">Village<input value={village} onChange={e=>setVillage(e.target.value)} className="mt-1 w-full border rounded-xl px-3 py-2 text-sm"/></label>
              <button onClick={save} className="w-full py-2 bg-zinc-900 text-white rounded-xl font-bold">Save Profile</button>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2 text-center">
              <div className="bg-zinc-50 border rounded-xl p-3"><div className="font-black text-emerald-700">{lots.length}</div><div className="text-xs">Lots</div></div>
              <div className="bg-zinc-50 border rounded-xl p-3"><div className="font-black text-blue-700">2.0 acre</div><div className="text-xs">Land</div></div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white border rounded-2xl p-5">
              <div className="font-black">📜 e-NAM & KYC</div>
              <div className="mt-3 grid sm:grid-cols-2 gap-3 text-xs">
                <div className="border rounded-xl p-3"><div className="font-bold">Aadhaar</div><div className="text-zinc-600">XXXX XXXX 1234 • Verified</div></div>
                <div className="border rounded-xl p-3"><div className="font-bold">e-NAM ID</div><div className="text-zinc-600">MH-AK-2841 • Active</div></div>
                <div className="border rounded-xl p-3"><div className="font-bold">Bank (for payments)</div><div className="text-zinc-600">SBI • UPI: ramesh@upi • T+1</div></div>
                <div className="border rounded-xl p-3"><div className="font-bold">FPO</div><div className="text-zinc-600">Sahyadri FPO • Baramati • Member</div></div>
              </div>
            </div>

            <div className="bg-white border rounded-2xl p-5">
              <div className="font-black">My Lots & Transactions ({lots.length})</div>
              <div className="mt-3 space-y-2 max-h-[260px] overflow-auto">
                {lots.length? lots.map((l:any)=><div key={l.id} className="border rounded-xl px-3 py-2 flex justify-between"><span className="text-sm font-bold">#{l.id} • {l.crop} {l.qty}q • {l.mandi}</span><span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full">₹{l.price}</span></div>): <div className="text-sm text-zinc-500 border-2 border-dashed rounded-xl p-4 text-center">No transactions yet — <Link href="/sell" className="underline">Sell now</Link></div>}
              </div>
              <div className="mt-3 flex gap-2">
                <Link href="/payments" className="flex-1 text-center py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold">View Payments →</Link>
                <Link href="/grievance" className="flex-1 text-center py-2 bg-white border rounded-xl text-xs font-bold">Grievance</Link>
              </div>
            </div>

            <div className="bg-zinc-900 text-white rounded-2xl p-5 flex gap-3 items-center">
              <div><div className="font-black">Need help?</div><div className="text-xs opacity-70">Voice assistant in Marathi/Hindi — tap mic on any page or use Chatbot 💬</div></div>
              <Link href="/mandi-bhav" className="ml-auto bg-white text-zinc-900 px-4 py-2 rounded-full font-bold text-xs">Mandi Bhav</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
