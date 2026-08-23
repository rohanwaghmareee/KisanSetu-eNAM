"use client"
import { useState, useEffect, useRef } from "react"
import { askGemini } from "@/lib/gemini"
import { saveChatMessage } from "@/lib/supabase"
import { saveFirebaseMessage } from "@/lib/firebase"

type Msg = { role: "user" | "assistant"; content: string }

export function Chatbot() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState("")
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: "assistant", content: "🙏 Namaste! I'm KisanSetu AI — ask me mandi bhav, best mandi, quality check, transport or buyers. Try: 'Soybean ka bhav?' Voice also works 🎙️" }
  ])
  const [loading, setLoading] = useState(false)
  const [listening, setListening] = useState(false)
  const listRef = useRef<HTMLDivElement>(null)
  const recRef = useRef<any>(null)

  useEffect(() => { listRef.current?.scrollTo(0, listRef.current.scrollHeight) }, [msgs, loading])
  useEffect(() => {
    try {
      const h = JSON.parse(localStorage.getItem("ks_chat_history") || "[]")
      if (h.length) setMsgs(h.slice(-12).map((m: any) => ({ role: m.role, content: m.content })))
    } catch {}
  }, [])

  const send = async (text?: string) => {
    const q = (text || input).trim()
    if (!q || loading) return
    setInput("")
    const next: Msg[] = [...msgs, { role: "user", content: q }]
    setMsgs(next); setLoading(true)
    saveChatMessage("user", q); saveFirebaseMessage("user", q)
    const reply = await askGemini(q, next.map(m => ({ role: m.role, content: m.content })))
    const withReply: Msg[] = [...next, { role: "assistant", content: reply }]
    setMsgs(withReply); setLoading(false)
    saveChatMessage("assistant", reply, { model: "gemini-1.5-flash" }); saveFirebaseMessage("assistant", reply, { model: "gemini-1.5-flash" })
    // speak reply short
    if ("speechSynthesis" in window && reply.length < 300) {
      const u = new SpeechSynthesisUtterance(reply.replace(/[*#]/g, "").slice(0, 180))
      u.lang = "en-IN"; u.rate = 0.95; speechSynthesis.speak(u)
    }
  }

  const handleVoice = () => {
    const SR: any = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    if (!SR) { setInput("Soybean ka bhav kya hai?"); return }
    if (listening) { recRef.current?.stop(); setListening(false); return }
    const rec = new SR(); rec.lang = "en-IN"; rec.interimResults = false
    rec.onstart = () => setListening(true)
    rec.onresult = (e: any) => { const t = e.results[0][0].transcript; setInput(t); setTimeout(() => send(t), 200) }
    rec.onend = () => setListening(false)
    rec.onerror = () => setListening(false)
    recRef.current = rec; rec.start()
  }

  return (
    <>
      {/* Floating button */}
      <button onClick={() => setOpen(v => !v)} className={`fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full shadow-xl flex items-center justify-center text-xl transition ${open ? "bg-zinc-900 text-white" : "bg-gradient-to-br from-emerald-600 to-lime-500 text-white hover:scale-105"}`} aria-label="Chat">
        {open ? "✕" : "💬"}
        {!open && <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse border-2 border-white" />}
      </button>

      {/* Chat window */}
      {open && (
        <div className="fixed bottom-20 right-4 sm:right-5 z-50 w-[92vw] sm:w-[380px] h-[520px] bg-white rounded-[20px] border shadow-2xl flex flex-col overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-700 to-lime-600 text-white p-4 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">🤖</div>
            <div className="flex-1">
              <div className="font-black text-sm leading-none">KisanSetu AI</div>
              <div className="text-[11px] opacity-90">Powered by Gemini • Firebase • Supabase • Voice</div>
            </div>
            <span className="text-[10px] bg-white text-emerald-700 px-2 py-1 rounded-full font-bold">● LIVE</span>
          </div>

          <div ref={listRef} className="flex-1 overflow-auto p-3 space-y-3 bg-[#F7F8F3]">
            {msgs.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[82%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${m.role === "user" ? "bg-emerald-600 text-white rounded-br-sm" : "bg-white border shadow-sm rounded-bl-sm"}`}>
                  {m.content}
                </div>
              </div>
            ))}
            {loading && <div className="flex justify-start"><div className="bg-white border rounded-2xl px-3 py-2 text-sm">● ● ● typing...</div></div>}
            <div className="flex flex-wrap gap-1.5 pt-2">
              {["Soybean ka bhav?", "Best mandi?", "Quality check", "Truck book karo"].map(q => (
                <button key={q} onClick={() => send(q)} className="text-xs bg-white border rounded-full px-3 py-1.5 font-semibold hover:bg-zinc-50">{q}</button>
              ))}
            </div>
          </div>

          <div className="p-3 bg-white border-t flex gap-2">
            <button onClick={handleVoice} className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${listening ? "bg-red-500 text-white animate-pulse" : "bg-zinc-100 hover:bg-zinc-200"}`} title="Voice">🎤</button>
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} placeholder="Type in Hindi / Marathi / English..." className="flex-1 border rounded-full px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" />
            <button onClick={() => send()} disabled={!input.trim() || loading} className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center disabled:opacity-40 hover:bg-emerald-700">➤</button>
          </div>
          <div className="px-3 pb-2 text-[10px] text-zinc-500 text-center">Gemini 1.5 Flash • Firebase + Supabase • GitHub Pages</div>
        </div>
      )}
    </>
  )
}
