import { Navbar } from "@/components/Navbar"
import Link from "next/link"

export const metadata = { title: "Schemes — KisanSetu" }

const schemes = [
  { name:"PM-KISAN", dept:"Min. of Agriculture", benefit:"₹6,000/year direct", eligibility:"Small & marginal farmers", link:"https://pmkisan.gov.in", icon:"🌾" },
  { name:"e-NAM", dept:"Govt. of India", benefit:"Online mandi trading", eligibility:"Registered farmers", link:"https://enam.gov.in", icon:"🏛️" },
  { name:"PMFBY — Crop Insurance", dept:"Dept. of Agriculture", benefit:"Premium subsidy 1.5-5%", eligibility:"All farmers", link:"https://pmfby.gov.in", icon:"🛡️" },
  { name:"Kisan Credit Card (KCC)", dept:"NABARD / Banks", benefit:"Up to ₹3L @ 4% interest", eligibility:"Farmers with land", link:"https://www.nabard.org", icon:"💳" },
  { name:"Soil Health Card", dept:"ICAR", benefit:"Free soil test + card", eligibility:"All farmers", link:"https://soilhealth.dac.gov.in", icon:"🧪" },
  { name:"Agriculture Infrastructure Fund", dept:"DA&FW", benefit:"3% interest subvention", eligibility:"FPOs, Agri-entrepreneurs", link:"https://agriinfra.dac.gov.in", icon:"🏗️" },
  { name:"MSP Procurement", dept:"FCI / NAFED", benefit:"Assured MSP price", eligibility:"Registered via e-NAM", link:"https://enam.gov.in", icon:"⚖️" },
  { name:"NWR Pledge Loan", dept:"WDRA", benefit:"70-80% pledge loan via e-NWR", eligibility:"Warehouse depositors", link:"https://wdra.gov.in", icon:"📜" },
]

export default function SchemesPage(){
  return (
    <div className="min-h-screen bg-[#FFFCF5]">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <h1 className="text-3xl font-black">Schemes</h1>
        <p className="text-sm text-zinc-600">Central & state schemes integrated — eligibility, benefits, direct links to govt portals. Voice explains in farmer language.</p>

        <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {schemes.map(s=>(
            <div key={s.name} className="bg-white border rounded-2xl p-5 hover:shadow-md transition">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border flex items-center justify-center text-xl">{s.icon}</div>
              <div className="mt-3 font-black leading-tight">{s.name}</div>
              <div className="text-xs text-zinc-500">{s.dept}</div>
              <div className="mt-3 space-y-1 text-xs">
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2"><b>Benefit:</b> {s.benefit}</div>
                <div className="bg-zinc-50 border rounded-xl px-3 py-2"><b>Eligibility:</b> {s.eligibility}</div>
              </div>
              <a href={s.link} target="_blank" className="mt-3 block w-full text-center py-2 bg-zinc-900 text-white rounded-xl text-xs font-bold hover:bg-black">Apply on Govt. Portal →</a>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-amber-50 border border-amber-200 rounded-2xl p-5 flex flex-wrap gap-3 items-center">
          <div><div className="font-black text-amber-900">Need scheme help?</div><div className="text-xs text-zinc-700">Ask Chatbot 💬 “PM-KISAN ke liye eligible hu?” — Gemini will guide in Hindi/Marathi.</div></div>
          <Link href="/profile" className="ml-auto px-4 py-2 bg-emerald-700 text-white rounded-full text-xs font-bold">Check Profile Eligibility →</Link>
        </div>
      </div>
    </div>
  )
}
