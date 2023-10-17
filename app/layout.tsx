import Navbar from "@/components/Navbar"
import "./globals.css"
import { Montserrat } from "next/font/google"
import { AppProvider } from "@/components/context/AppContext"

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
      <AppProvider>
        <body
          className={`${montserrat.className} bg-bg-light-primary dark:bg-bg-dark-primary`}
        >
          <Navbar />
          {children}
        </body>
      </AppProvider>
    </html>
  )
}
