import type { Metadata } from "next"
import { Inter, Poppins, Mukta } from "next/font/google"
import "./globals.css"
import { Providers } from "@/components/providers"
import { Toaster } from "@/components/ui/toaster"

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
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
