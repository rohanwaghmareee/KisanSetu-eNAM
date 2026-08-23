import { createClient } from "@supabase/supabase-js"

const url = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

export const supabase = url && anon ? createClient(url, anon) : null

// Fallback to localStorage when Supabase not configured — keeps GitHub Pages static working
export async function saveChatMessage(role: "user" | "assistant", content: string, meta: any = {}) {
  if (supabase) {
    try {
      const { error } = await supabase.from("chat_messages").insert({ role, content, meta })
      if (error) throw error
      return true
    } catch (e) {
      console.warn("Supabase save failed, falling back to local", e)
    }
  }
  // local fallback
  try {
    const key = "ks_chat_history"
    const prev = JSON.parse(localStorage.getItem(key) || "[]")
    prev.push({ role, content, meta, created_at: new Date().toISOString() })
    localStorage.setItem(key, JSON.stringify(prev.slice(-100)))
  } catch {}
  return false
}

export async function fetchChatHistory(limit = 20) {
  if (supabase) {
    try {
      const { data } = await supabase.from("chat_messages").select("*").order("created_at", { ascending: false }).limit(limit)
      if (data) return data.reverse()
    } catch {}
  }
  try {
    return JSON.parse(localStorage.getItem("ks_chat_history") || "[]").slice(-limit)
  } catch { return [] }
}
