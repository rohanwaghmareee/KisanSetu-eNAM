"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

export function Navbar() {
  const pathname = usePathname()
  const links = [
    { href: "/problem", label: "Problem" },
    { href: "/solution", label: "Solution" },
    { href: "/demo", label: "Live Demo" },
    { href: "/workflow", label: "Workflow" },
  ]
  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-lime-500 flex items-center justify-center text-white font-bold text-lg">क</div>
          <div>
            <div className="font-extrabold leading-none text-[18px]">KisanSetu <span className="text-emerald-700">| किसान सेतु</span></div>
            <div className="text-[11px] tracking-widest text-zinc-500 font-medium">e-NAM Intelligence Layer • Govt. of India Integrated</div>
          </div>
        </Link>
        <div className="hidden md:flex items-center gap-1 text-sm font-medium">
          {links.map(l => {
            const active = pathname === l.href
            return <Link key={l.href} href={l.href} className={`px-4 py-2 rounded-full font-bold transition ${active ? "bg-zinc-900 text-white" : "hover:bg-zinc-100 text-zinc-700"}`}>{l.label}</Link>
          })}
        </div>
        <div className="flex items-center gap-2">
          <Link href="/demo" className="hidden sm:inline-flex px-5 py-2.5 bg-emerald-700 text-white rounded-full font-semibold text-sm hover:bg-emerald-800">Start Selling</Link>
          <Link href="/" className="md:hidden px-4 py-2 bg-zinc-900 text-white rounded-full text-xs font-bold">Home</Link>
        </div>
      </div>
      <div className="md:hidden border-t bg-white flex justify-around text-xs font-bold py-2">
        {links.map(l => <Link key={l.href} href={l.href} className={pathname === l.href ? "text-emerald-700" : "text-zinc-500"}>{l.label}</Link>)}
      </div>
    </nav>
  )
}
