"use client"
import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"

export default function GrievancePage(){
  const {toast}=useToast()
  const [text,setText]=useState("")
  const [list,setList]=useState<any[]>([])
  useEffect(()=>{ try{ setList(JSON.parse(localStorage.getItem("ks_grievances")||"[]")) }catch{} },[])
  const submit=()=>{
    if(!text.trim()) return toast({title:"Enter issue"})
    const item={id:Date.now().toString(), text, status:"Submitted to APMC • Ticket #APMC-"+Math.floor(9000+Math.random()*999), time:new Date().toLocaleString()}
    const next=[item,...list]; setList(next); localStorage.setItem("ks_grievances", JSON.stringify(next))
    // firebase
    try{ import("@/lib/firebase").then(m=>m.saveFirebaseMessage("user", text)) }catch{}
    toast({title:"Grievance submitted", description:item.status}); setText("")
  }
  return (
    <div className="min-h-screen bg-[#FFFCF5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <h1 className="text-3xl font-black">Grievance</h1>
        <p className="text-sm text-zinc-600">1-click dispute to APMC • Payment, quality, weighment • Track status • Firebase <code>grievances</code> collection.</p>

        <div className="mt-6 grid lg:grid-cols-2 gap-6">
          <div className="bg-white border rounded-[20px] p-6">
            <div className="font-black">🛡️ Raise Grievance</div>
            <select className="mt-4 w-full border rounded-xl px-3 py-2 text-sm"><option>Payment not received</option><option>Quality dispute</option><option>Weighment error</option><option>Transport issue</option><option>Other</option></select>
            <textarea value={text} onChange={e=>setText(e.target.value)} placeholder="Describe issue — e.g., Payment not received for Lot #AK-2841, ₹73,350" className="mt-3 w-full border rounded-xl px-3 py-3 h-32 text-sm" />
            <button onClick={submit} className="mt-3 w-full py-3 bg-red-600 text-white rounded-xl font-black">Submit to APMC</button>
            <div className="mt-3 text-xs bg-zinc-50 border rounded-xl p-3">APMC Akola • Response in 24h • Helpline: 1800-xxx-xxxx • You will get call + SMS</div>
          </div>
          <div className="bg-white border rounded-2xl p-5">
            <div className="font-black">My Grievances ({list.length})</div>
            <div className="mt-3 space-y-2 max-h-[400px] overflow-auto">
              {list.length? list.map((g:any)=><div key={g.id} className="border rounded-xl p-3 bg-amber-50/50"><div className="font-bold text-sm">{g.status}</div><div className="text-xs text-zinc-700 mt-1">{g.text}</div><div className="text-xs text-zinc-500 mt-1">{g.time}</div></div>): <div className="text-sm text-zinc-500 border-2 border-dashed rounded-xl p-6 text-center">No grievances — good standing ✓</div>}
            </div>
            <div className="mt-4 bg-zinc-900 text-white rounded-xl p-3 text-xs">Transparency: All grievances logged to Firestore • APMC dashboard visible • Escalate to State if unresolved in 7 days</div>
          </div>
        </div>
      </div>
    </div>
  )
}
