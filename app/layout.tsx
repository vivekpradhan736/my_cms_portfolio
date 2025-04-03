import { GeistSans } from 'geist/font/sans'
import './globals.css'
import { Toaster } from "@/components/ui/toaster"

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Vivek Pradhan',
  description: 'Vivek Pradhan CMS Portfolio',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className=" text-foreground min-h-screen">
          {children}
        <Toaster />
      </body>
    </html>
  )
}