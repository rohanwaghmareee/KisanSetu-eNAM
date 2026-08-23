// Client-side Gemini helper — works on GitHub Pages static export
// Uses NEXT_PUBLIC_GEMINI_API_KEY (set in .env). Falls back to rule-based mock if no key.

const SYSTEM_PROMPT = `You are KisanSetu AI — a farmer-first assistant for e-NAM market linkage & price discovery in India.
Speak in user's language (Hindi/Marathi/English). Be concise, practical, farmer-friendly.
You help with: mandi prices, best mandi recommendation, sell-now-or-wait, quality grading, logistics, buyer matching, payment tracking, grievance.
Never give medical/legal advice. If unsure, say you will connect to mandi officer.
Current mandis: Pune-Moshi, Latur, Nagpur, Indore-Lasudia, Akola.`

export async function askGemini(userMessage: string, history: { role: string, content: string }[] = []): Promise<string> {
  const key = process.env.NEXT_PUBLIC_GEMINI_API_KEY || ""
  if (!key) {
    // Rule-based fallback — keeps chatbot usable without API key (market demo safe)
    const lower = userMessage.toLowerCase()
    if (lower.includes("bhav") || lower.includes("price") || lower.includes("भाव")) {
      return "📊 Soybean — Moshi ₹4,720/q, Latur ₹4,890/q (+4.1% — best net after transport). AI suggests WAIT 4 days → expected ₹4,920. Want I set price alert at ₹5,000?"
    }
    if (lower.includes("mandi") || lower.includes("best")) {
      return "📍 Best Mandi for Soybean: **Latur APMC** @ ₹4,890/q — transport ₹1,800 for 6MT, net +₹210/q vs Moshi. FPO pooled truck saves ₹600. Book now?"
    }
    if (lower.includes("quality") || lower.includes("grade") || lower.includes("photo")) {
      return "📷 Upload crop photo → I detect moisture, defects & Agmark grade (FAQ/A/A+). Model trained on 12k samples, works offline. Try in Live Demo → Quality section."
    }
    if (lower.includes("transport") || lower.includes("truck") || lower.includes("logistics")) {
      return "🚚 Moshi→Latur • 6MT • ₹1,800 today 4pm, FPO pool ₹1,200 (shared, -33%). Cold storage 3km available. Compare quotes?"
    }
    if (lower.includes("buyer") || lower.includes("offer") || lower.includes("bech")) {
      return "🤝 Verified buyers: AgroPure (₹4,950/q), Sahyadri FPO (₹4,900/q), NCDEX (₹5,020/q) — all T+1 payment 99% on-time. Send offer in Live Demo → Buyer Matching."
    }
    if (lower.includes("payment") || lower.includes("paisa") || lower.includes("grievance")) {
      return "💰 Payments are T+1 via UPI. If not received, I can raise APMC grievance in 1-click. Anomaly detection checks price manipulation. Need to raise dispute?"
    }
    if (lower.includes("voice") || lower.includes("bolke")) {
      return "🎙️ Tap mic and say 'Mera soya ka bhav kya hai?' — I understand Hindi/Marathi/English and also explain payment status by voice."
    }
    return "🙏 Namaste! I can help with mandi prices, best mandi, sell-now-or-wait, quality check, transport & buyers. Try: 'Soybean ka bhav?', 'Best mandi?', 'Quality check karo', or 'Truck book karo'."
  }

  try {
    const contents = [
      { role: "user", parts: [{ text: SYSTEM_PROMPT }] },
      { role: "model", parts: [{ text: "Understood — ready to help farmers in Hindi/Marathi/English." }] },
      ...history.slice(-6).map(h => ({ role: h.role === "user" ? "user" : "model", parts: [{ text: h.content }] })),
      { role: "user", parts: [{ text: userMessage }] },
    ]

    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${key}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents, generationConfig: { temperature: 0.7, maxOutputTokens: 512 } })
    })
    const data = await res.json()
    if (data.error) throw new Error(data.error.message)
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text
    return text || "Sorry, I couldn't generate a response — please try again."
  } catch (e: any) {
    console.error("Gemini error", e)
    return `⚠️ AI temporarily unavailable (${e.message?.slice(0,80)}). Using offline help: Try mandi prices at /demo or say 'best mandi?'`
  }
}
