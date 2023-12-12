import Navbar from "@/components/Navbar"
import "./globals.css"
import { Montserrat } from "next/font/google"
import { AppProvider } from "@/components/context/AppContext"
import { Toaster } from "@/components/ui/toaster"

const montserrat = Montserrat({ subsets: ["latin"] })

export const metadata = {
  title: "Unswash",
  description: "A Image Gallery Clone of Unsplash",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.className} flex flex-col h-screen w-screen max-w-full bg-bg-light-primary dark:bg-bg-dark-primary`}
      >
        <AppProvider>
          <Navbar />
          {/* Adjust for fixed Navbar */}
          <main className="mt-20">{children}</main>
          <Toaster />
        </AppProvider>
      </body>
    </html>
  )
}
