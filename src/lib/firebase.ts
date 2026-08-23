import { initializeApp, getApps, FirebaseApp } from "firebase/app"
import { getFirestore, Firestore, collection, addDoc, getDocs, query, orderBy, limit, serverTimestamp } from "firebase/firestore"
import { getAuth, Auth, signInAnonymously } from "firebase/auth"

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "",
}

let app: FirebaseApp | null = null
let db: Firestore | null = null
let auth: Auth | null = null

function isConfigured() {
  return !!(firebaseConfig.apiKey && firebaseConfig.projectId && firebaseConfig.appId)
}

export function getFirebase() {
  if (!isConfigured()) return { app: null, db: null, auth: null, configured: false }
  if (!getApps().length) app = initializeApp(firebaseConfig)
  else app = getApps()[0]
  db = getFirestore(app)
  auth = getAuth(app)
  // anonymous auth for Chatbot (no login wall)
  if (auth && !auth.currentUser) signInAnonymously(auth).catch(() => {})
  return { app, db, auth, configured: true }
}

export async function saveFirebaseMessage(role: "user" | "assistant", content: string, meta: any = {}) {
  const { db, configured } = getFirebase()
  if (!configured || !db) return false
  try {
    await addDoc(collection(db, "chat_messages"), { role, content, meta, createdAt: serverTimestamp() })
    return true
  } catch (e) {
    console.warn("Firebase save failed", e)
    return false
  }
}

export async function fetchFirebaseHistory(n = 20) {
  const { db, configured } = getFirebase()
  if (!configured || !db) return null
  try {
    const q = query(collection(db, "chat_messages"), orderBy("createdAt", "desc"), limit(n))
    const snap = await getDocs(q)
    return snap.docs.map(d => ({ id: d.id, ...d.data() })).reverse()
  } catch { return null }
}

export { isConfigured as isFirebaseConfigured }
