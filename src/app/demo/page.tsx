"use client"
import { useState, useEffect, useRef } from "react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import { fetchLiveMandi, toMandiCard } from "@/lib/agmarknet"

const mandiDataByCrop: Record<string, any[]> = {
  Soybean: [
    { mandi: "Pune — Moshi", price: 4720, trend: "+2.4%", distance: "18 km", arrival: "142 q", grade: "FAQ" },
    { mandi: "Latur", price: 4890, trend: "+4.1%", distance: "312 km", arrival: "89 q", grade: "A" },
    { mandi: "Nagpur", price: 4610, trend: "-0.8%", distance: "645 km", arrival: "210 q", grade: "FAQ" },
    { mandi: "Indore — Lasudia", price: 4955, trend: "+3.2%", distance: "412 km", arrival: "176 q", grade: "A+" },
    { mandi: "Akola", price: 4780, trend: "+1.1%", distance: "280 km", arrival: "64 q", grade: "FAQ" },
  ],
  Cotton: [
    { mandi: "Nagpur", price: 7250, trend: "+1.8%", distance: "645 km", arrival: "98 q", grade: "FAQ" },
    { mandi: "Akola", price: 7420, trend: "+3.1%", distance: "280 km", arrival: "54 q", grade: "A" },
    { mandi: "Yavatmal", price: 7180, trend: "-0.5%", distance: "320 km", arrival: "112 q", grade: "FAQ" },
  ],
  Onion: [
    { mandi: "Lasalgaon", price: 1850, trend: "+6.2%", distance: "210 km", arrival: "420 q", grade: "A" },
    { mandi: "Pimpalgaon", price: 1780, trend: "+2.1%", distance: "195 km", arrival: "310 q", grade: "FAQ" },
    { mandi: "Pune — Moshi", price: 1920, trend: "+4.5%", distance: "18 km", arrival: "180 q", grade: "FAQ" },
  ],
  Wheat: [
    { mandi: "Indore", price: 2420, trend: "+0.9%", distance: "412 km", arrival: "250 q", grade: "FAQ" },
    { mandi: "Nagpur", price: 2380, trend: "+1.2%", distance: "645 km", arrival: "140 q", grade: "A" },
    { mandi: "Akola", price: 2455, trend: "+2.0%", distance: "280 km", arrival: "76 q", grade: "A+" },
  ],
}
const buyerDataByCrop: Record<string, any[]> = {
  Soybean: [
    { id: "b1", name: "AgroPure Foods Pvt Ltd", type: "Processor", need: "50 MT Soybean / week", price: "₹4,950/q", priceValue: 4950, verified: true, rating: 4.8, location: "Pune MIDC", phone: "98xxxx x210", payment: "T+1 • 99.2% on-time" },
    { id: "b2", name: "Sahyadri FPO Federation", type: "FPO Aggregator", need: "200 q Soybean A-grade", price: "₹4,900/q", priceValue: 4900, verified: true, rating: 4.9, location: "Baramati", phone: "98xxxx x342", payment: "T+0 • 98.5% on-time" },
    { id: "b3", name: "NCDEX Institutional Buyer", type: "Institutional", need: "100 MT consistent", price: "₹5,020/q", priceValue: 5020, verified: true, rating: 4.7, location: "Pan-India", phone: "98xxxx x998", payment: "T+2 • 99.8% on-time" },
  ],
  Cotton: [{ id: "c1", name: "Vardhaman Textiles", type: "Processor", need: "30 MT Cotton / week", price: "₹7,550/q", priceValue: 7550, verified: true, rating: 4.6, location: "Nagpur", phone: "98xxxx x120", payment: "T+1 • 97.2% on-time" }],
  Onion: [{ id: "o1", name: "Nashik Exporters Co-op", type: "Exporter", need: "100 q Onion A", price: "₹1,990/q", priceValue: 1990, verified: true, rating: 4.8, location: "Lasalgaon", phone: "98xxxx x450", payment: "T+1 • 98.0% on-time" }],
  Wheat: [{ id: "w1", name: "ITC Agri Business", type: "Institutional", need: "200 MT Wheat", price: "₹2,510/q", priceValue: 2510, verified: true, rating: 4.9, location: "Indore", phone: "98xxxx x780", payment: "T+1 • 99.5% on-time" }],
}
const priceHistoryByCrop: Record<string, number[]> = {
  Soybean: [4520, 4580, 4610, 4550, 4680, 4720, 4780, 4820, 4890, 4850, 4920, 4955],
  Cotton: [7000, 7100, 7250, 7180, 7350, 7420, 7380, 7450, 7520, 7480, 7550, 7600],
  Onion: [1520, 1650, 1720, 1680, 1850, 1920, 1880, 1950, 2020, 1980, 2050, 2100],
  Wheat: [2280, 2320, 2380, 2350, 2420, 2455, 2430, 2480, 2520, 2490, 2530, 2560],
}

export default function DemoPage() {
  const { toast } = useToast()
  const [activeCrop, setActiveCrop] = useState("Soybean")
  const [lots, setLots] = useState<any[]>(() => { try { return typeof window !== "undefined" ? JSON.parse(localStorage.getItem("ks_lots") || "[]") : [] } catch { return [] } })
  const [showLotModal, setShowLotModal] = useState(false)
  const [selectedMandi, setSelectedMandi] = useState<any>(null)
  const [lotQty, setLotQty] = useState("12")
  const [lotGrade, setLotGrade] = useState("A")
  const [qualityScore, setQualityScore] = useState(0)
  const [qualityImage, setQualityImage] = useState<string | null>(null)
  const [qualityDetails, setQualityDetails] = useState<any>(null)
  const [offers, setOffers] = useState<any[]>([])
  const [showOfferModal, setShowOfferModal] = useState<any>(null)
  const [offerQty, setOfferQty] = useState("10")
  const [showCredModal, setShowCredModal] = useState<any>(null)
  const [showTransportModal, setShowTransportModal] = useState(false)
  const [showQuotesModal, setShowQuotesModal] = useState(false)
  const [transportBookings, setTransportBookings] = useState<any[]>([])
  const [showPriceAlertModal, setShowPriceAlertModal] = useState(false)
  const [priceAlertTarget, setPriceAlertTarget] = useState("5000")
  const [priceAlerts, setPriceAlerts] = useState<any[]>([])
  const [showDisputeModal, setShowDisputeModal] = useState(false)
  const [disputeText, setDisputeText] = useState("")
  const [disputes, setDisputes] = useState<any[]>([])
  const [showFpoModal, setShowFpoModal] = useState(false)
  const [listening, setListening] = useState(false)
  const [transcript, setTranscript] = useState("")
  const recognitionRef = useRef<any>(null)

  const [liveMandi, setLiveMandi] = useState<any[] | null>(null)
  const [liveSource, setLiveSource] = useState<"live" | "mock" | "loading">("loading")
  const [liveError, setLiveError] = useState("")

  useEffect(() => {
    setLiveSource("loading")
    fetchLiveMandi(activeCrop, 5).then(r => {
      if (r.source === "live" && r.data.length) {
        setLiveMandi(r.data.map(toMandiCard)); setLiveSource("live")
      } else {
        setLiveMandi(null); setLiveSource("mock"); setLiveError(r.error || "")
      }
    })
  }, [activeCrop])

  const mandiData = liveMandi || mandiDataByCrop[activeCrop] || mandiDataByCrop.Soybean
  const buyerData = buyerDataByCrop[activeCrop] || buyerDataByCrop.Soybean
  const priceHistory = priceHistoryByCrop[activeCrop] || priceHistoryByCrop.Soybean

  useEffect(() => { localStorage.setItem("ks_lots", JSON.stringify(lots)) }, [lots])

  const speak = (text: string) => { if ("speechSynthesis" in window) { const u = new SpeechSynthesisUtterance(text); u.lang = "en-IN"; speechSynthesis.speak(u) } }
  const handleVoice = () => {
    const SR: any = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    if (SR) {
      const rec = new SR(); rec.lang = "en-IN"; rec.interimResults = true
      rec.onstart = () => { setListening(true); setTranscript("") }
      rec.onresult = (e: any) => { const t = Array.from(e.results).map((r: any) => r[0].transcript).join(""); setTranscript(t); if (e.results[0].isFinal) { toast({ title: "Heard: " + t, description: "Processing..." }); speak("Showing prices") } }
      rec.onend = () => setListening(false)
      rec.onerror = () => setListening(false)
      recognitionRef.current = rec; rec.start(); toast({ title: "Listening...", description: "Bolo — Mera bhav kya hai?" })
    } else { setListening(true); setTimeout(() => { setListening(false); toast({ title: "Voice demo", description: "Simulated — Prices shown" }) }, 2000) }
  }
  const handleCreateLot = () => {
    if (!selectedMandi) return
    const id = `AK-${Math.floor(2800 + Math.random() * 500)}`
    const lot = { id, crop: activeCrop, qty: lotQty, grade: lotGrade, mandi: selectedMandi.mandi, price: selectedMandi.price, status: "Auction in 2 hrs" }
    setLots(prev => [lot, ...prev]); toast({ title: `Lot ${id} created!`, description: `${lotQty}q ${activeCrop} → ${selectedMandi.mandi}` }); setShowLotModal(false)
  }
  const handleSendOffer = () => {
    if (!showOfferModal) return
    const o = { id: Date.now().toString(), buyer: showOfferModal.name, qty: offerQty, price: showOfferModal.priceValue, status: "Sent" }
    setOffers(prev => [o, ...prev]); toast({ title: "Offer sent!", description: `${offerQty}q to ${showOfferModal.name}` }); setShowOfferModal(null)
  }
  const handleBookTransport = (quote: string) => { const b = { id: Date.now().toString(), route: "Moshi → Latur", quote }; setTransportBookings(prev => [b, ...prev]); toast({ title: "Transport booked!", description: quote }); setShowTransportModal(false); setShowQuotesModal(false) }
  const handlePriceAlert = () => {
    setPriceAlerts(prev => [...prev, { target: priceAlertTarget, crop: activeCrop }])
    toast({ title: "Alert set!", description: `${activeCrop} ₹${priceAlertTarget}/q` }); setTimeout(() => toast({ title: "🔔 Price Alert (demo)", description: `${activeCrop} hit ₹${priceAlertTarget}!` }), 3000); setShowPriceAlertModal(false)
  }
  const handleDispute = () => { if (!disputeText.trim()) return; setDisputes(prev => [{ id: Date.now().toString(), text: disputeText, status: "Submitted" }, ...prev]); toast({ title: "Grievance submitted", description: "Ticket #APMC-9921" }); setDisputeText(""); setShowDisputeModal(false) }
  const handleQualityUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return
    const reader = new FileReader(); reader.onload = () => { setQualityImage(reader.result as string); const score = Math.floor(68 + Math.random() * 25); setQualityScore(score); setQualityDetails({ moisture: (10.5 + Math.random() * 1.5).toFixed(1), defects: (1.5 + Math.random() * 2).toFixed(1) }) }
    reader.readAsDataURL(file)
  }

  return (
    <div className="min-h-screen bg-[#FFFCF5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-wrap items-end gap-3">
          <h1 className="text-3xl font-black">Live Demo — Try it like a farmer</h1>
          <span className="bg-emerald-600 text-white rounded-full px-3 py-1 text-xs font-bold">Fully functional • {lots.length} lots • {offers.length} offers</span>
          <div className="ml-auto flex items-center gap-2 bg-white border rounded-full p-1">
            {["Soybean", "Cotton", "Onion", "Wheat"].map(c => (
              <button key={c} onClick={() => { setActiveCrop(c); toast({ title: `${c} selected`, description: "Prices updated" }) }} className={`px-4 py-1.5 rounded-full text-sm font-bold ${activeCrop === c ? "bg-zinc-900 text-white" : "text-zinc-600"}`}>{c}</button>
            ))}
          </div>
        </div>

        {/* Voice bar */}
        <div className="mt-4 bg-white border rounded-2xl p-4 flex flex-wrap gap-3 items-center">
          <span className="font-black">🎙️ Bolke Becho</span>
          <button onClick={handleVoice} className={`px-5 py-2 rounded-full font-bold flex items-center gap-2 ${listening ? "bg-red-500 text-white animate-pulse" : "bg-gradient-to-r from-emerald-600 to-lime-500 text-white"}`}>🎤 {listening ? "Listening..." : "Tap & Speak — 'Mera bhav kya hai?'"} </button>
          {transcript && <span className="bg-zinc-900 text-white rounded-full px-3 py-1 text-xs">“{transcript}”</span>}
          <button onClick={() => speak("Price of Soybean at Latur is 4890")} className="ml-auto text-xs bg-zinc-100 rounded-full px-3 py-1.5 font-bold">🔊 Test voice</button>
        </div>

        <div className="mt-6 grid lg:grid-cols-12 gap-4">
          <div className="lg:col-span-8 bg-white border rounded-[20px] overflow-hidden shadow-sm">
            <div className="px-5 py-4 flex items-center justify-between border-b">
              <div className="font-black flex items-center gap-2">📊 Mandi Price Intelligence — {activeCrop} <span className={`text-xs px-2 py-1 rounded-full font-bold ${liveSource === "live" ? "bg-emerald-600 text-white" : liveSource === "loading" ? "bg-amber-100 text-amber-800" : "bg-zinc-100 text-zinc-600"}`}>{liveSource === "live" ? "● Live AGMARKNET" : liveSource === "loading" ? "● Fetching live..." : "● Mock (live fallback)"}</span></div>
              <div className="text-xs font-semibold text-zinc-500">{mandiData.length} mandis • {liveSource === "live" ? "Just now" : "2 min ago"}</div>
            </div>
            {liveSource === "mock" && liveError && <div className="px-5 py-2 bg-amber-50 border-b text-xs text-amber-800">Live AGMARKNET failed ({liveError}) — showing cached mock. Add <code>NEXT_PUBLIC_DATA_GOV_API_KEY</code> for real feed.</div>}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-zinc-50 text-xs font-black text-zinc-500"><tr><th className="text-left px-4 py-2.5">Mandi</th><th className="text-left px-4 py-2.5">Price/q</th><th className="text-left px-4 py-2.5">Trend</th><th className="text-left px-4 py-2.5">Distance</th><th className="text-left px-4 py-2.5">Action</th></tr></thead>
                <tbody>
                  {mandiData.map((r: any, i: number) => (
                    <tr key={r.mandi} className={`border-t ${i === 1 ? "bg-emerald-50/60" : ""}`}>
                      <td className="px-4 py-3"><div className="font-bold">{r.mandi}</div><div className="text-xs text-zinc-500">{r.arrival} • {r.grade}</div></td>
                      <td className="px-4 py-3 font-black">₹{r.price}</td>
                      <td className="px-4 py-3"><span className={`px-2 py-1 rounded-full text-xs font-bold ${r.trend.startsWith("+") ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}`}>{r.trend}</span></td>
                      <td className="px-4 py-3 text-zinc-600">{r.distance}</td>
                      <td className="px-4 py-3"><button onClick={() => { setSelectedMandi(r); setShowLotModal(true) }} className="px-3 py-1.5 bg-zinc-900 text-white rounded-full text-xs font-bold">Create Lot →</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-5 py-3 bg-amber-50 border-t flex gap-2 items-center">
              <span className="text-xs">💡 Best: <b>{mandiData[1]?.mandi}</b> • FPO saves ₹600</span>
              <button onClick={() => setShowTransportModal(true)} className="ml-auto bg-white border rounded-full px-3 py-1 text-xs font-bold">🚚 Find Truck</button>
            </div>
          </div>

          <div className="lg:col-span-4 bg-zinc-900 text-white rounded-[20px] p-5">
            <div className="text-xs font-black tracking-widest text-lime-400">AI PRICE PREDICTION</div>
            <div className="text-lg font-black mt-1">“Should I sell now or wait?”</div>
            <div className="mt-3 bg-white text-zinc-900 rounded-2xl p-4">
              <div className="flex justify-between text-xs font-bold"><span>Today</span><span className="text-emerald-700">₹{mandiData[0].price}</span></div>
              <div className="mt-3 h-[110px] flex items-end gap-1">
                {priceHistory.map((v, i) => {
                  const min = Math.min(...priceHistory) - 100, max = Math.max(...priceHistory) + 100
                  const h = ((v - min) / (max - min)) * 100
                  return <div key={i} className={`flex-1 rounded-t-lg ${i >= 8 ? "bg-amber-500" : "bg-emerald-600"} ${i === 7 ? "ring-2 ring-zinc-900" : ""}`} style={{ height: `${h}%` }} />
                })}
              </div>
              <div className="mt-2 flex justify-between text-[10px] font-semibold text-zinc-500"><span>12 days ago</span><span className="bg-zinc-900 text-white px-2 py-1 rounded-full">Today</span><span className="text-amber-600">+7d forecast</span></div>
              <div className="mt-3 grid grid-cols-2 gap-2 text-center">
                <div className="bg-emerald-50 border rounded-xl p-2"><div className="text-xs font-bold text-emerald-800">Sell in 4 days</div><div className="text-[11px] text-zinc-600">Exp. ₹{mandiData[0].price + 200}</div></div>
                <div className="bg-white border rounded-xl p-2"><div className="text-xs font-bold">Confidence</div><div className="text-[11px] text-emerald-700 font-black">87% • Low risk</div></div>
              </div>
              <button onClick={() => setShowPriceAlertModal(true)} className="mt-3 w-full py-2.5 bg-amber-500 text-white rounded-xl font-bold">🔔 Notify at target price</button>
              {priceAlerts.length > 0 && <div className="mt-2 text-xs bg-zinc-100 rounded-xl p-2 truncate">🔔 {priceAlerts.map(a => `₹${a.target}`).join(", ")}</div>}
            </div>
          </div>
        </div>

        <div className="mt-4 grid lg:grid-cols-12 gap-4">
          <div className="lg:col-span-5 bg-white border rounded-[20px] p-5">
            <div className="font-black">📷 AI Quality Grading <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full">Offline</span></div>
            <div className="mt-4 border-2 border-dashed border-zinc-300 rounded-2xl p-6 text-center bg-amber-50/50">
              {qualityImage ? <img src={qualityImage} alt="crop" className="w-full h-40 object-cover rounded-xl border" /> : <div className="w-16 h-16 mx-auto bg-white border rounded-2xl flex items-center justify-center text-2xl">🌾</div>}
              <div className="mt-3 font-bold">{qualityImage ? "Photo ready" : "Upload crop photo"}</div>
              <label className="mt-3 inline-block px-5 py-2 bg-zinc-900 text-white rounded-full text-sm font-bold cursor-pointer">Choose photo<input type="file" className="hidden" accept="image/*" onChange={handleQualityUpload} /></label>
              {qualityScore > 0 && <div className="mt-4 bg-white border rounded-xl p-3 text-left"><div className="flex justify-between text-sm font-black"><span>Grade: {qualityScore > 80 ? "A+" : qualityScore > 65 ? "A" : "FAQ"}</span><span className="text-emerald-700">{qualityScore}%</span></div><div className="mt-1 h-2 bg-zinc-100 rounded-full overflow-hidden"><div className="h-full bg-emerald-600" style={{ width: `${qualityScore}%` }} /></div><div className="text-xs text-zinc-600 mt-1">Moisture {qualityDetails?.moisture}% • Defects {qualityDetails?.defects}%</div><button onClick={() => { setSelectedMandi(mandiData[0]); setLotGrade(qualityScore > 80 ? "A+" : "A"); setShowLotModal(true) }} className="mt-2 w-full py-1.5 bg-emerald-600 text-white rounded-full text-xs font-bold">Create Lot with this grade</button></div>}
            </div>
          </div>

          <div className="lg:col-span-7 bg-white border rounded-[20px] p-5">
            <div className="font-black">🤝 Verified Buyer Matching <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{buyerData.length} buyers</span></div>
            <div className="mt-4 space-y-3">
              {buyerData.map((b: any) => (
                <div key={b.id} className="border rounded-2xl p-4 flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-600 to-lime-500 flex items-center justify-center text-white font-black">{b.name[0]}</div>
                  <div className="flex-1">
                    <div className="flex gap-2 items-center"><div className="font-bold text-sm">{b.name}</div><span className="text-[11px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-bold">✓ Verified</span><span className="text-xs bg-zinc-100 px-2 py-0.5 rounded-full">{b.type}</span></div>
                    <div className="text-xs text-zinc-600 mt-1">{b.need} • <b className="text-emerald-700">{b.price}</b></div>
                    <div className="mt-2 flex gap-2"><button onClick={() => setShowOfferModal(b)} className="px-4 py-1.5 bg-emerald-700 text-white rounded-full text-xs font-bold">Send Offer</button><button onClick={() => setShowCredModal(b)} className="px-4 py-1.5 bg-white border rounded-full text-xs font-bold">View credentials</button></div>
                  </div>
                </div>
              ))}
            </div>
            {offers.length > 0 && <div className="mt-3 bg-zinc-50 border rounded-xl p-3 text-xs"><div className="font-black">My Offers ({offers.length})</div>{offers.map((o: any) => <div key={o.id} className="bg-white border rounded-full px-3 py-1 mt-1">{o.qty}q → {o.buyer} • {o.status}</div>)}</div>}
            <button onClick={() => setShowFpoModal(true)} className="mt-3 w-full py-2 bg-zinc-900 text-white rounded-xl font-bold flex justify-center gap-2">FPO Pool: 22 MT • +₹90/q <span className="bg-lime-400 text-zinc-900 px-2 rounded-full">Join →</span></button>
          </div>
        </div>

        <div className="mt-4 grid md:grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-amber-500 to-orange-500 text-white rounded-[20px] p-5">
            <div className="text-xs font-black opacity-90">LOGISTICS & STORAGE</div><div className="text-xl font-black mt-1">Truck + Cold Storage</div>
            <div className="mt-4 bg-white text-zinc-900 rounded-2xl p-4 grid grid-cols-3 gap-3 text-center"><div><div className="font-black">₹1,800</div><div className="text-xs text-zinc-500">Moshi→Latur</div></div><div><div className="font-black">₹42/q</div><div className="text-xs">7-day</div></div><div><div className="font-black">{transportBookings.length || "Cold"}</div><div className="text-xs text-zinc-500">{transportBookings.length ? "booked" : "3km"}</div></div></div>
            <div className="mt-3 flex gap-2"><button onClick={() => setShowTransportModal(true)} className="flex-1 py-2.5 bg-zinc-900 text-white rounded-xl font-bold">Book now</button><button onClick={() => setShowQuotesModal(true)} className="flex-1 py-2.5 bg-white text-zinc-900 rounded-xl font-bold">Compare quotes</button></div>
          </div>
          <div className="bg-white border rounded-[20px] p-5">
            <div className="font-black">💰 Payment & Grievance <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">Fraud on</span></div>
            <div className="mt-4 space-y-2">
              {lots.slice(0, 2).map((l: any) => <div key={l.id} className="border rounded-xl px-3 py-2.5 bg-emerald-50"><div className="font-bold text-xs">Lot #{l.id} • {l.crop} {l.qty}q</div><div className="text-xs text-zinc-600">{l.mandi} • {l.status}</div></div>)}
              {lots.length === 0 && <div className="border rounded-xl px-3 py-2.5 text-xs">Demo: Lot #AK-2841 • UPI ✓ • ₹73,350 credited</div>}
              <div className="border rounded-xl px-3 py-2.5 flex justify-between items-center"><span className="text-xs">Anomaly check: No manipulation</span><button onClick={() => toast({ title: "Fraud check", description: "All bids verified" })} className="text-xs bg-zinc-900 text-white px-2 py-1 rounded-full">Check</button></div>
            </div>
            <button onClick={() => setShowDisputeModal(true)} className="mt-3 w-full py-2 border rounded-xl text-sm font-bold">Raise dispute • APMC ({disputes.length})</button>
            {disputes.length > 0 && <div className="mt-2 text-xs bg-amber-50 border rounded-xl p-2">{disputes[0].text.slice(0, 50)}…</div>}
          </div>
        </div>

        <div className="mt-6 flex gap-3 text-sm">
          <Link href="/" className="px-4 py-2 bg-white border rounded-full font-bold">← Home</Link>
          <Link href="/problem" className="px-4 py-2 bg-white border rounded-full font-bold">Problem</Link>
          <Link href="/workflow" className="px-4 py-2 bg-white border rounded-full font-bold">Workflow →</Link>
        </div>
      </div>

      {/* Modals */}
      {showLotModal && selectedMandi && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={() => setShowLotModal(false)}>
          <div className="bg-white rounded-[20px] max-w-md w-full p-6" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between"><h3 className="font-black">Create Lot — {activeCrop}</h3><button onClick={() => setShowLotModal(false)} className="w-8 h-8 bg-zinc-100 rounded-full">✕</button></div>
            <div className="mt-4 bg-zinc-50 border rounded-xl p-4 space-y-3">
              <div className="flex justify-between text-sm"><span>Mandi</span><b className="text-emerald-700">{selectedMandi.mandi}</b></div>
              <div className="flex justify-between text-sm"><span>Price</span><b>₹{selectedMandi.price}</b></div>
              <label className="block text-sm font-bold">Qty (q)<input value={lotQty} onChange={e => setLotQty(e.target.value)} className="mt-1 w-full border rounded-xl px-3 py-2" /></label>
              <label className="block text-sm font-bold">Grade<select value={lotGrade} onChange={e => setLotGrade(e.target.value)} className="mt-1 w-full border rounded-xl px-3 py-2"><option>FAQ</option><option>A</option><option>A+</option></select></label>
              <div className="text-xs">Est: ₹{(parseInt(lotQty||"0")*selectedMandi.price).toLocaleString("en-IN")}</div>
            </div>
            <button onClick={handleCreateLot} className="mt-4 w-full py-3 bg-emerald-700 text-white rounded-xl font-bold">Confirm</button>
          </div>
        </div>
      )}
      {showOfferModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={() => setShowOfferModal(null)}>
          <div className="bg-white rounded-[20px] max-w-md w-full p-6" onClick={e => e.stopPropagation()}>
            <h3 className="font-black">Offer to {showOfferModal.name}</h3>
            <label className="block mt-3">Qty<input value={offerQty} onChange={e => setOfferQty(e.target.value)} className="mt-1 w-full border rounded-xl px-3 py-2" /></label>
            <div className="mt-2 text-xs bg-zinc-50 border rounded-xl p-2">Total: ₹{(parseInt(offerQty||"0")*showOfferModal.priceValue).toLocaleString("en-IN")}</div>
            <button onClick={handleSendOffer} className="mt-4 w-full py-3 bg-emerald-700 text-white rounded-xl font-bold">Send Offer</button>
          </div>
        </div>
      )}
      {showCredModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={() => setShowCredModal(null)}>
          <div className="bg-white rounded-[20px] max-w-md w-full p-6" onClick={e => e.stopPropagation()}>
            <h3 className="font-black">{showCredModal.name}</h3>
            <div className="mt-3 space-y-2 text-sm">
              <div className="bg-emerald-50 border rounded-xl p-3">✓ Verified • GSTIN verified • {showCredModal.payment}</div>
              <div className="border rounded-xl px-3 py-2 flex justify-between"><span>Type</span><b>{showCredModal.type}</b></div>
              <div className="border rounded-xl px-3 py-2 flex justify-between"><span>Location</span><b>{showCredModal.location}</b></div>
              <div className="border rounded-xl px-3 py-2 flex justify-between"><span>Rating</span><b>⭐ {showCredModal.rating}</b></div>
            </div>
            <button onClick={() => setShowCredModal(null)} className="mt-4 w-full py-3 bg-zinc-900 text-white rounded-xl font-bold">Close</button>
          </div>
        </div>
      )}
      {showTransportModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={() => setShowTransportModal(false)}>
          <div className="bg-white rounded-[20px] max-w-md w-full p-6" onClick={e => e.stopPropagation()}>
            <h3 className="font-black">Book Transport</h3>
            <div className="mt-3 space-y-2">
              {[
                { r: "Moshi → Latur • 6MT", p: "₹1,800" },
                { r: "FPO Pool → Latur • 22MT", p: "₹1,200 (shared)" },
              ].map(q => <div key={q.r} className="border rounded-xl p-3 flex justify-between items-center"><div className="font-bold text-sm">{q.r}</div><button onClick={() => handleBookTransport(q.p)} className="px-4 py-1 bg-emerald-700 text-white rounded-full text-xs font-bold">{q.p} • Book</button></div>)}
            </div>
            <button onClick={() => setShowTransportModal(false)} className="mt-3 w-full py-2 border rounded-xl font-bold">Close</button>
          </div>
        </div>
      )}
      {showQuotesModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={() => setShowQuotesModal(false)}>
          <div className="bg-white rounded-[20px] max-w-md w-full p-6" onClick={e => e.stopPropagation()}>
            <h3 className="font-black">Compare Quotes</h3>
            <div className="mt-3 space-y-2 text-sm">
              {["₹1,800 • Local Union", "₹1,200 • FPO Logistics", "₹2,400 • Cold Chain"].map(q => <div key={q} className="border rounded-xl px-3 py-2 flex justify-between"><span>{q}</span><button onClick={() => handleBookTransport(q.split("•")[0])} className="px-3 py-1 bg-zinc-900 text-white rounded-full text-xs">Book</button></div>)}
            </div>
          </div>
        </div>
      )}
      {showPriceAlertModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={() => setShowPriceAlertModal(false)}>
          <div className="bg-white rounded-[20px] max-w-md w-full p-6" onClick={e => e.stopPropagation()}>
            <h3 className="font-black">Price Alert — {activeCrop}</h3>
            <input value={priceAlertTarget} onChange={e => setPriceAlertTarget(e.target.value)} className="mt-3 w-full border rounded-xl px-3 py-3 text-lg font-black" />
            <button onClick={handlePriceAlert} className="mt-3 w-full py-3 bg-amber-500 text-white rounded-xl font-bold">Set Alert</button>
          </div>
        </div>
      )}
      {showDisputeModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={() => setShowDisputeModal(false)}>
          <div className="bg-white rounded-[20px] max-w-md w-full p-6" onClick={e => e.stopPropagation()}>
            <h3 className="font-black">Grievance</h3>
            <textarea value={disputeText} onChange={e => setDisputeText(e.target.value)} className="mt-3 w-full border rounded-xl px-3 py-3 h-28" placeholder="Describe issue..." />
            <button onClick={handleDispute} className="mt-3 w-full py-3 bg-red-600 text-white rounded-xl font-bold">Submit</button>
          </div>
        </div>
      )}
      {showFpoModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={() => setShowFpoModal(false)}>
          <div className="bg-white rounded-[20px] max-w-md w-full p-6" onClick={e => e.stopPropagation()}>
            <h3 className="font-black">Join FPO Pool</h3>
            <div className="mt-2 bg-lime-50 border rounded-xl p-3 text-sm">14 farmers • +₹90/q premium</div>
            <button onClick={() => { toast({ title: "Joined FPO!" }); setShowFpoModal(false) }} className="mt-4 w-full py-3 bg-lime-600 text-white rounded-xl font-bold">Confirm</button>
          </div>
        </div>
      )}
    </div>
  )
}
