"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

const items = [
  { href: "/", label: "Home", icon: "🏠", desc: "Overview" },
  { href: "/mandi-bhav", label: "Mandi Bhav", icon: "📊", desc: "Live prices" },
  { href: "/buyers", label: "Verified Buyers", icon: "🤝", desc: "Processors" },
  { href: "/sell", label: "Sell Produce", icon: "📦", desc: "Lot + Quality" },
  { href: "/bidding", label: "Live Bidding", icon: "🔨", desc: "Auction" },
  { href: "/fpo", label: "FPO Aggregation", icon: "👥", desc: "Pool 22 MT" },
  { href: "/logistics", label: "Logistics", icon: "🚚", desc: "Transport" },
  { href: "/warehouse", label: "Warehouse / e-NWR", icon: "🏭", desc: "Storage" },
  { href: "/payments", label: "Payments", icon: "💰", desc: "UPI T+1" },
  { href: "/grievance", label: "Grievance", icon: "🛡️", desc: "APMC" },
  { href: "/profile", label: "Farmer Profile", icon: "👨‍🌾", desc: "KYC" },
  { href: "/schemes", label: "Schemes", icon: "📜", desc: "Govt." },
]

export function Sidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      {/* Mobile top bar */}
      <div className="lg:hidden sticky top-0 z-40 bg-white border-b flex items-center gap-3 px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-600 to-lime-500 flex items-center justify-center text-white font-bold">क</div>
          <span className="font-black">KisanSetu</span>
        </Link>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="ml-auto w-9 h-9 rounded-full bg-zinc-900 text-white flex items-center justify-center">{mobileOpen ? "✕" : "☰"}</button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-30 bg-black/40" onClick={() => setMobileOpen(false)}>
          <div className="w-[280px] h-full bg-white overflow-auto p-4" onClick={e => e.stopPropagation()}>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-600 to-lime-500 flex items-center justify-center text-white font-bold">क</div>
              <div><div className="font-black leading-none">KisanSetu</div><div className="text-[11px] text-zinc-500">Bharat Market Network</div></div>
            </div>
            <div className="space-y-1">
              {items.map(it => {
                const active = pathname === it.href
                return (
                  <Link key={it.href} href={it.href} onClick={() => setMobileOpen(false)} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold ${active ? "bg-zinc-900 text-white" : "hover:bg-zinc-100"}`}>
                    <span className="text-lg">{it.icon}</span>
                    <span>{it.label}</span>
                    <span className="ml-auto text-[10px] opacity-60">{it.desc}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className={`hidden lg:flex flex-col shrink-0 bg-white border-r border-zinc-200 sticky top-0 h-screen overflow-hidden transition-all ${collapsed ? "w-[72px]" : "w-[260px]"}`}>
        <div className="p-4 border-b flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-600 to-lime-500 flex items-center justify-center text-white font-bold">क</div>
          {!collapsed && <div className="flex-1"><div className="font-black leading-none">KisanSetu</div><div className="text-[11px] text-zinc-500">Bharat Market Network</div></div>}
          <button onClick={() => setCollapsed(!collapsed)} className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center text-xs">{collapsed ? "→" : "←"}</button>
        </div>

        <div className="flex-1 overflow-auto p-3 space-y-1">
          {!collapsed && <div className="text-[11px] font-black tracking-widest text-zinc-400 px-2 py-2">PLATFORM MODULES</div>}
          {items.map(it => {
            const active = pathname === it.href
            return (
              <Link key={it.href} href={it.href} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition ${active ? "bg-zinc-900 text-white shadow" : "hover:bg-zinc-50 text-zinc-700"}`} title={it.label}>
                <span className="text-lg w-6 text-center">{it.icon}</span>
                {!collapsed && <span className="flex-1 leading-tight">{it.label}</span>}
                {!collapsed && <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${active ? "bg-white/20 text-white" : "bg-zinc-100 text-zinc-500"}`}>{it.desc}</span>}
              </Link>
            )
          })}
        </div>

        <div className="p-3 border-t space-y-2">
          {!collapsed ? (
            <>
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3">
                <div className="text-xs font-black text-emerald-800">Firebase Live</div>
                <div className="text-[11px] text-zinc-600">kisansetu-enam-2026</div>
                <div className="mt-1 w-2 h-2 bg-emerald-500 rounded-full animate-pulse inline-block" /> <span className="text-xs">Connected</span>
              </div>
              <Link href="/mandi-bhav" className="block w-full text-center py-2.5 bg-emerald-700 text-white rounded-xl text-xs font-black hover:bg-emerald-800">Check Mandi Bhav →</Link>
            </>
          ) : (
            <Link href="/mandi-bhav" className="block w-10 h-10 mx-auto bg-emerald-700 text-white rounded-xl flex items-center justify-center">📊</Link>
          )}
        </div>
      </aside>
    </>
  )
}
