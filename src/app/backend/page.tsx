import { Navbar } from "@/components/Navbar"
import Link from "next/link"

export const metadata = { title: "Backend Workflow — KisanSetu" }

export default function BackendPage() {
  return (
    <div className="min-h-screen bg-[#FFFCF5]">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="inline-flex items-center gap-2 bg-white border border-zinc-200 rounded-full px-3 py-1.5 text-xs font-semibold">
          <span className="w-2 h-2 bg-emerald-600 rounded-full animate-pulse" /> BACKEND WORKFLOW • Production Ready
          <span className="bg-emerald-600 text-white px-2 py-0.5 rounded-full">● Live</span>
          <span className="bg-zinc-900 text-white px-2 py-0.5 rounded-full">Firebase • Supabase • Gemini</span>
        </div>
        <h1 className="mt-4 text-4xl font-black">Backend Workflow — How KisanSetu Works</h1>
        <p className="mt-2 text-zinc-600 max-w-2xl">Static export on GitHub Pages → client-side direct to Firebase Firestore + Gemini. No Node server. See <code className="bg-zinc-100 px-1 rounded">BACKEND_WORKFLOW.md:1</code> for full doc. Firebase project: <b>kisansetu-enam-2026</b>.</p>

        {/* Architecture */}
        <div className="mt-8 bg-white border rounded-[20px] p-6 overflow-x-auto">
          <div className="min-w-[900px] flex items-center gap-3 text-xs font-bold">
            <div className="bg-emerald-600 text-white rounded-2xl p-4 text-center w-36">Farmer Device<br /><span className="opacity-80 font-normal">PWA • Voice/Text/Photo</span></div>
            <span className="text-xl">→</span>
            <div className="bg-zinc-900 text-white rounded-2xl p-4 text-center w-40">Next.js 14<br /><span className="opacity-70 font-normal">Static Export<br />GitHub Pages</span></div>
            <span className="text-xl">→</span>
            <div className="bg-white border-2 border-emerald-500 rounded-2xl p-4 text-center w-52">
              <div>Backend Layer</div>
              <div className="mt-2 space-y-1 text-[11px] font-semibold">
                <div className="bg-amber-100 rounded-full px-2 py-1">Gemini 1.5 Flash</div>
                <div className="bg-emerald-100 rounded-full px-2 py-1">Firebase Firestore</div>
                <div className="bg-blue-100 rounded-full px-2 py-1">Supabase (fallback)</div>
                <div className="bg-zinc-100 rounded-full px-2 py-1">e-NAM Mock API</div>
              </div>
            </div>
            <span className="text-xl">→</span>
            <div className="bg-lime-500 text-zinc-900 rounded-2xl p-4 text-center w-36">Response<br /><span className="font-normal">Chatbot • Toast • TTS • localStorage</span></div>
          </div>
          <div className="mt-4 text-xs text-zinc-500 text-center">GitHub Pages = static → all backend calls are <b>client-side direct</b> using <code>NEXT_PUBLIC_*</code> baked at <code>npm run build</code>. For server, switch to Vercel + <code>src/app/api/chat/route.ts</code>.</div>
        </div>

        {/* Flows */}
        <div className="mt-8 grid md:grid-cols-2 gap-4">
          <div className="bg-white border rounded-2xl p-5">
            <div className="font-black flex items-center gap-2">💬 Chatbot Flow <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full">Live • Tested</span></div>
            <ol className="mt-3 space-y-2 text-xs leading-relaxed list-decimal list-inside">
              <li>Farmer: “Soybean ka bhav?” → <code>Chatbot.tsx:27 send()</code></li>
              <li><code>saveFirebaseMessage("user",q)</code> → Firestore: <code>chat_messages</code> <span className="bg-zinc-100 rounded px-1">✅ ADDED: 6AJmvZtn</span></li>
              <li><code>askGemini()</code> → `gemini.ts:12` → Gemini API or mock rule</li>
              <li>Reply → <code>saveFirebaseMessage("assistant")</code> + <code>speechSynthesis</code> TTS</li>
              <li>Fallback chain: Firebase → Supabase (`supabase.ts:5`) → `localStorage: ks_chat_history`</li>
            </ol>
            <div className="mt-3 bg-zinc-50 border rounded-xl p-2 text-xs">Verify: <code>node test-firebase.mjs</code> → COUNT: 1</div>
          </div>
          <div className="bg-white border rounded-2xl p-5">
            <div className="font-black">📦 Lot Creation Flow</div>
            <ol className="mt-3 space-y-2 text-xs list-decimal list-inside">
              <li>Demo → Create Lot → <code>lots</code> state + <code>localStorage: ks_lots</code></li>
              <li>Firebase: <code>addDoc(lots, {"{id,crop,qty,grade,mandi,price}"})</code></li>
              <li>Supabase mirror: <code>supabase.from("lots").insert()</code> (`supabase.sql:1`)</li>
              <li>Toast + Voice “Tumcha lot tayar zhala”</li>
              <li>Future: Firestore trigger → Auction → Buyer FCM</li>
            </ol>
            <div className="mt-3 bg-amber-50 border rounded-xl p-2 text-xs">Quality → Truck → Offer → Payment flows identical — collections: <code>offers, price_alerts, grievances</code></div>
          </div>
        </div>

        <div className="mt-4 grid md:grid-cols-3 gap-4 text-xs">
          <div className="bg-zinc-900 text-white rounded-2xl p-5">
            <div className="font-black">Database Schema</div>
            <div className="mt-3 space-y-1 font-mono text-[11px]">
              <div>chat_messages {`{role,content,meta,createdAt}`}</div>
              <div>lots {`{id,crop,qty,grade,mandi,price}`}</div>
              <div>offers {`{buyer,qty,price}`}</div>
              <div>price_alerts {`{crop,target}`}</div>
              <div>grievances {`{text,status}`}</div>
            </div>
            <div className="mt-3 text-[11px] opacity-70">Firestore rules: <code>firestore.rules:1</code> `allow read,write: if true` (demo) → lock to `auth != null` for prod.</div>
          </div>
          <div className="bg-white border rounded-2xl p-5">
            <div className="font-black">Deployment</div>
            <div className="mt-3 space-y-1 text-xs">
              <div><code>npm run build</code> → <code>out/</code> (basePath: /KisanSetu-eNAM)</div>
              <div><code>npx gh-pages -d out --dotfiles</code> → <code>origin/gh-pages</code></div>
              <div><code>firebase deploy --only firestore</code> → rules</div>
              <div>Env: <code>.env.production</code> baked at build</div>
              <div>Check: <code>gh api repos/.../pages</code> → `built`</div>
            </div>
          </div>
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5">
            <div className="font-black text-emerald-900">Security Hardening</div>
            <ul className="mt-3 space-y-1 text-xs list-disc list-inside">
              <li>Lock Firestore to <code>request.auth != null</code></li>
              <li>Enable Anonymous Auth (already `firestore:enable`)</li>
              <li>Move Gemini key to server <code>GEMINI_API_KEY</code> via <code>/api/chat</code> (Vercel)</li>
              <li>Add App Check + RLS on Supabase</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/workflow" className="px-6 py-3 bg-white border rounded-full font-bold">← Workflow</Link>
          <Link href="/demo" className="px-6 py-3 bg-emerald-600 text-white rounded-full font-bold">Open Live Demo →</Link>
          <a href="https://console.firebase.google.com/project/kisansetu-enam-2026/firestore/databases/-default-/data" target="_blank" className="px-6 py-3 bg-zinc-900 text-white rounded-full font-bold">Firebase Console →</a>
          <Link href="/" className="ml-auto px-6 py-3 bg-white border rounded-full font-bold">Home ↑</Link>
        </div>
      </div>
    </div>
  )
}
