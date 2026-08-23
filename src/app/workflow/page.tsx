"use client"
import { useState } from "react"
import { Navbar } from "@/components/Navbar"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

const steps = [
  { t: "Registration", d: "Aadhaar + e-NAM", desc: "One-time voice-guided KYC. Offline save.", icon: "🪪" },
  { t: "Mandi Gate", d: "Voice entry", desc: "Say 'Moshi entry karo' → QR gate pass.", icon: "🚪" },
  { t: "Lot Create", d: "Photo → Grade", desc: "Upload crop → AI grade → Create lot.", icon: "📦" },
  { t: "Assaying", d: "AI + lab", desc: "Vision + Agmark lab cross-check.", icon: "🔬" },
  { t: "Auction", d: "Live bids voice", desc: "Real-time bids, voice notifies in Marathi.", icon: "🔨" },
  { t: "Weighment", d: "Auto record", desc: "Weight auto-captured, no manual entry.", icon: "⚖️" },
  { t: "Sale Bill", d: "Voice explain", desc: "Bill explained via voice in farmer lang.", icon: "🧾" },
  { t: "Payment + Gate", d: "QR Exit", desc: "UPI T+1, QR exit without agent.", icon: "💰" },
]

export default function WorkflowPage() {
  const { toast } = useToast()
  const [active, setActive] = useState<number | null>(null)
  const [completed, setCompleted] = useState<number[]>([])

  const speak = (text: string) => {
    if ("speechSynthesis" in window) {
      const u = new SpeechSynthesisUtterance(text)
      u.lang = "en-IN"; u.rate = 0.95; speechSynthesis.speak(u)
    }
  }

  const handleStep = (i: number) => {
    setActive(i)
    const s = steps[i]
    speak(`Step ${i + 1}: ${s.t}. ${s.desc}`)
    toast({ title: `Step ${i + 1}: ${s.t}`, description: s.desc })
    if (!completed.includes(i)) setCompleted(prev => [...prev, i])
  }

  return (
    <div className="min-h-screen bg-[#FFFCF5]">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="inline-flex items-center gap-2 bg-white border border-amber-200 rounded-full px-3 py-1.5 text-xs font-semibold">
          <span className="w-2 h-2 bg-emerald-600 rounded-full animate-pulse" /> WORKFLOW • 8 steps vs e-NAM 12 steps
          <span className="bg-zinc-900 text-white px-3 py-1 rounded-full">{completed.length}/8 completed</span>
        </div>
        <h1 className="mt-4 text-4xl font-black">Transaction Workflow — Fully voice guided</h1>
        <p className="mt-2 text-zinc-600 max-w-2xl">Simplified from 12 to 8 steps. Each step has voice explanation, offline cache, and 1-tap grievance. Click any step to try.</p>

        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {steps.map((s, i) => {
            const done = completed.includes(i)
            const isActive = active === i
            return (
              <button key={s.t} onClick={() => handleStep(i)} className={`relative bg-white border rounded-2xl p-4 text-center hover:shadow-md transition ${isActive ? "border-emerald-500 ring-2 ring-emerald-200" : ""} ${done ? "border-emerald-300" : ""}`}>
                {done && <span className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-600 text-white rounded-full flex items-center justify-center text-xs">✓</span>}
                <div className={`w-10 h-10 mx-auto rounded-xl flex items-center justify-center text-lg ${isActive ? "bg-emerald-600 text-white" : "bg-zinc-100"}`}>{s.icon}</div>
                <div className="mt-2 font-black text-sm leading-tight">{s.t}</div>
                <div className="text-xs text-zinc-500">{s.d}</div>
                <div className="mt-2 text-[10px] font-bold text-emerald-700">▶ Voice</div>
              </button>
            )
          })}
        </div>

        {active !== null && (
          <div className="mt-6 bg-white border-2 border-emerald-200 rounded-[20px] p-6 flex gap-4 items-start">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center text-xl">{steps[active].icon}</div>
            <div className="flex-1">
              <div className="text-xs font-black tracking-widest text-emerald-700">STEP {active + 1} OF 8 • {completed.includes(active) ? "✓ Completed" : "Active"}</div>
              <div className="text-xl font-black mt-1">{steps[active].t} — {steps[active].d}</div>
              <div className="text-sm text-zinc-600 mt-1">{steps[active].desc} — All data cached for offline, syncs when online.</div>
              <div className="mt-3 flex gap-2">
                <button onClick={() => handleStep(Math.max(0, active - 1))} disabled={active === 0} className="px-4 py-2 bg-white border rounded-full text-sm font-bold disabled:opacity-40">← Prev</button>
                <button onClick={() => handleStep(Math.min(7, active + 1))} disabled={active === 7} className="px-4 py-2 bg-zinc-900 text-white rounded-full text-sm font-bold disabled:opacity-40">Next →</button>
                <button onClick={() => { speak(steps[active].desc); toast({ title: "Playing voice", description: steps[active].desc }) }} className="px-4 py-2 bg-emerald-600 text-white rounded-full text-sm font-bold">🔊 Replay voice</button>
              </div>
            </div>
            <div className="hidden sm:block w-40 bg-zinc-50 border rounded-2xl p-3 text-center">
              <div className="text-xs font-bold">Progress</div>
              <div className="mt-2 h-2 bg-zinc-200 rounded-full overflow-hidden"><div className="h-full bg-emerald-600" style={{ width: `${((completed.length) / 8) * 100}%` }} /></div>
              <div className="mt-1 text-xs text-zinc-600">{completed.length}/8</div>
              {completed.length === 8 && <div className="mt-2 text-xs bg-lime-100 text-lime-800 rounded-full px-2 py-1 font-bold">🎉 Workflow complete!</div>}
            </div>
          </div>
        )}

        <div className="mt-6 bg-zinc-900 text-white rounded-2xl p-4 flex flex-wrap gap-3 items-center text-sm">
          <button onClick={() => { toast({ title: "Offline mode", description: "Prices cached for 2G — try airplane mode!" }); speak("Offline mode active") }} className="bg-emerald-500 text-white px-4 py-1.5 rounded-full font-bold hover:bg-emerald-600">📡 Offline mode • Tap to test</button>
          <span className="bg-amber-500 text-white px-4 py-1.5 rounded-full font-bold">3 big buttons: Bhav Jano • Becho • Paisa Dekho</span>
          <span className="ml-auto opacity-80">Voice explains each step in Marathi/Hindi • <Link href="/demo" className="underline">Try in Live Demo →</Link></span>
        </div>

        <div className="mt-8 flex gap-3">
          <Link href="/solution" className="px-6 py-3 bg-white border rounded-full font-bold">← Solution</Link>
          <Link href="/demo" className="px-6 py-3 bg-emerald-600 text-white rounded-full font-bold hover:bg-emerald-700">Go to Live Demo →</Link>
          <Link href="/" className="ml-auto px-6 py-3 bg-zinc-900 text-white rounded-full font-bold">Home ↑</Link>
        </div>
      </div>
    </div>
  )
}
