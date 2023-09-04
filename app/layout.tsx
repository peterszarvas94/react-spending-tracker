import './globals.css'
import type { Metadata } from 'next'
import { Karla } from 'next/font/google'

const inter = Karla({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Spending Tracker',
  description: 'Create and organize your spendings',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
