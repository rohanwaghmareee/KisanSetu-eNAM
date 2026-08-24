# KisanSetu — Backend Workflow (Production Ready)

**Live:** https://rohanwaghmareee.github.io/KisanSetu-eNAM/  
**Repo:** https://github.com/rohanwaghmareee/KisanSetu-eNAM  
**Firebase Project:** `kisansetu-enam-2026` (496156634226)  
**Primary Backend:** Firebase Firestore + Auth (Anonymous)  
**Secondary Backend:** Supabase Postgres (fallback)  
**AI:** Gemini 1.5 Flash (via `NEXT_PUBLIC_GEMINI_API_KEY`, client-side)

---

## 1. Architecture Overview

```
[Farmer Device - PWA Offline]
   │ Voice (Web Speech API) / Text / Photo
   ▼
[Next.js 14 Frontend - Static Export -> GitHub Pages]
   │  src/app/page.tsx, /demo, /problem, /solution, /workflow
   │  src/components/Chatbot.tsx, Navbar
   ▼
[Backend Layer - Client-Side Direct (No Server for GitHub Pages)]
   ├─→ Gemini 1.5 Flash (https://generativelanguage.googleapis.com)
   ├─→ Firebase Firestore (kisansetu-enam-2026)
   ├─→ Supabase Postgres (fallback)
   └─→ e-NAM/AGMARKNET/IMD Mock APIs (mandiDataByCrop)
   ▼
[Response → UI + Voice TTS + LocalStorage + Firestore]
```

**Why client-side?** GitHub Pages = static `output: export` (`next.config.js:3` with `basePath: /KisanSetu-eNAM`). No Node server, so `src/app/api/*` not deployed. All backend calls go directly from browser using `NEXT_PUBLIC_*` keys baked at `npm run build`.

For Vercel/Supabase Edge Functions, move to `output: standalone` and add `src/app/api/chat/route.ts`.

---

## 2. Detailed Data Flows

### A. Chatbot Flow (Gemini + Firebase)
```
1. Farmer: "Soybean ka bhav?" → Chatbot.tsx:27 send()
2. saveFirebaseMessage("user", q) → Firestore: chat_messages {role, content, meta, createdAt}
   └─ fallback: saveChatMessage() → Supabase → localStorage: ks_chat_history
3. askGemini(q, history) → gemini.ts:12
   - if NEXT_PUBLIC_GEMINI_API_KEY set → POST gemini-1.5-flash:generateContent (with SYSTEM_PROMPT)
   - else → rule-based mock (price/bhav → Mandi prices, quality → photo, etc.)
4. Reply → saveFirebaseMessage("assistant", reply) + TTS speechSynthesis
5. Firestore triggers (future): Cloud Function → price alert check → FCM push
```

**Tables:** `firestore.rules:1` allows `chat_messages` read/write if true (demo). Lock to `request.auth != null` for prod + enable Anonymous Auth (already enabled via `firebase deploy`).

### B. Lot Creation Flow
```
1. Demo → Create Lot → selectedMandi + qty/grade → lots state (src/app/demo/page.tsx:45)
2. localStorage: ks_lots + Firebase: addDoc(lots, {id, crop, qty, grade, mandi, price, status})
   - Supabase fallback: supabase.from("lots").insert()
3. Toast + Voice: "Tumcha lot tayar zhala"
4. Firestore listener (future): triggers Auction matching → Buyer notification
```

### C. Quality Grading Flow
```
1. Upload photo → FileReader → preview → mock AI score 68-93% (handleQualityUpload)
2. Moisture/defects random, grade FAQ/A/A+ → Firestore: quality_checks
3. "Create Lot with this grade" → prefill lotGrade → reuse Lot flow
```

### D. Buyer Offer Flow
```
1. Send Offer → buyerData + qty → offers state + Firestore: offers
2. View Credentials → showCredModal → GSTIN, rating, payment T+1
3. FPO Pool → 22 MT aggregated → premium calculation
```

### E. Price Alert & Payment Flows (similar — local state + Firestore collections: price_alerts, grievances)
---

## 3. Database Schema

**Firebase Firestore** (`firestore.rules:1`, `supabase.sql:1` mirror):
- `chat_messages` {id, role, content, meta, createdAt}
- `lots` {id, crop, qty, grade, mandi, price, status, createdAt}
- `offers` {id, buyer, qty, price, status, createdAt}
- `price_alerts` {id, crop, target, createdAt}
- `grievances` {id, text, status, createdAt}

**Local Fallbacks:** `localStorage: ks_lots, ks_chat_history, priceAlerts, disputes`

---

## 4. Deployment Workflow

```
Local Dev: npm run dev (-p 3001)
Build: npm run build → out/ (static, basePath + assetPrefix)
Deploy: npx gh-pages -d out --dotfiles → origin/gh-pages → https://rohanwaghmareee.github.io/KisanSetu-eNAM/
Firebase: firebase deploy --only firestore (rules + indexes)
Env: .env.local / .env.production (NEXT_PUBLIC_FIREBASE_*, NEXT_PUBLIC_GEMINI_API_KEY) baked at build
```

Verify: `gh api repos/rohanwaghmareee/KisanSetu-eNAM/pages` → `status: built`

---

## 5. Security & Production Hardening

- Firestore rules: Change `allow read, write: if true` → `if request.auth != null` + enable Anonymous Auth (`identitytoolkit:enable`)
- Supabase RLS: `enable row level security` + policies `using (true)` → restrict to `auth.uid()`
- Gemini: Move key to server `GEMINI_API_KEY` + proxy via `src/app/api/chat/route.ts` (requires Vercel, not GitHub Pages)
- Add Firebase App Check, rate limiting

---

## 6. Future Server Upgrade Path (for Market Scale)

To move from static to server:
1. `next.config.js:3` → remove `output: export`, keep `basePath`
2. Add `src/app/api/chat/route.ts` → server-side Gemini proxy
3. Deploy to Vercel/Supabase Edge → `vercel deploy` or `supabase functions deploy`
4. Keep Firebase/Supabase dual-write, add Cloud Functions for price alerts via FCM

---

## 7. Current Live Test

`node test-firebase.mjs` → `ADDED: 6AJmvZtn6jlpkeesXYiP • COUNT: 1` verified Firestore write.

All pages interlinked: `/`, `/problem`, `/solution`, `/demo`, `/workflow` via `src/components/Navbar.tsx:1` + `src/app/layout.tsx:26` (global Chatbot).
