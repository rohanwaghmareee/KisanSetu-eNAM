"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

const navItems = [
  { href: "/", label: "Home" },
  { href: "/mandi-bhav", label: "Mandi Bhav" },
  { href: "/buyers", label: "Verified Buyers" },
  { href: "/sell", label: "Sell Produce" },
  { href: "/bidding", label: "Live Bidding" },
  { href: "/fpo", label: "FPO Aggregation" },
  { href: "/logistics", label: "Logistics" },
  { href: "/warehouse", label: "Warehouse / e-NWR" },
  { href: "/payments", label: "Payments" },
  { href: "/grievance", label: "Grievance" },
  { href: "/profile", label: "Farmer Profile" },
  { href: "/schemes", label: "Schemes" },
]

export function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center gap-3">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-600 to-lime-500 flex items-center justify-center text-white font-bold">क</div>
          <div className="hidden sm:block">
            <div className="font-extrabold leading-none text-[16px]">KisanSetu</div>
            <div className="text-[10px] tracking-widest text-zinc-500 font-medium">Bharat Market Network</div>
          </div>
        </Link>

        <div className="hidden lg:flex items-center gap-1 ml-4 overflow-x-auto">
          {navItems.map(l => {
            const active = pathname === l.href
            return <Link key={l.href} href={l.href} className={`px-2.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition ${active ? "bg-zinc-900 text-white" : "hover:bg-zinc-100 text-zinc-700"}`}>{l.label}</Link>
          })}
        </div>

        <div className="ml-auto flex items-center gap-2">
          <Link href="/mandi-bhav" className="hidden sm:inline-flex px-4 py-2 bg-emerald-700 text-white rounded-full text-xs font-bold hover:bg-emerald-800">Mandi Bhav</Link>
          <Link href="/sell" className="px-4 py-2 bg-amber-500 text-white rounded-full text-xs font-bold hover:bg-amber-600">Sell Now</Link>
          <button onClick={() => setOpen(!open)} className="lg:hidden w-9 h-9 rounded-full bg-zinc-100 flex items-center justify-center">☰</button>
        </div>
      </div>
      {open && (
        <div className="lg:hidden border-t bg-white px-4 py-3 grid grid-cols-2 gap-2">
          {navItems.map(l => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className={`px-3 py-2 rounded-xl text-xs font-bold text-center ${pathname === l.href ? "bg-zinc-900 text-white" : "bg-zinc-50 border"}`}>{l.label}</Link>
          ))}
        </div>
      )}
    </nav>
  )
}
