import type { Metadata } from "next"
import { Inter, Poppins, Mukta } from "next/font/google"
import "./globals.css"
import { Providers } from "@/components/providers"
import { Toaster } from "@/components/ui/toaster"
import { Chatbot } from "@/components/Chatbot"
import { Sidebar } from "@/components/Sidebar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "KisanSetu — Market Intelligence & Price Discovery for Bharat",
  description: "AI-powered farmer-first layer on top of e-NAM. Voice in Hindi/Marathi, price prediction, quality grading, best-mandi & logistics matching.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 min-w-0 bg-[#FFFCF5]">
              {children}
            </main>
          </div>
          <Toaster />
          <Chatbot />
        </Providers>
      </body>
    </html>
  )
}
