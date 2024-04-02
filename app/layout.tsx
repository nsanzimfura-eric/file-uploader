import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from './_homeComponents/navbar/Navbar'
import Footer from './_homeComponents/footer/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'File Uploader',
  description: 'This is a file upload application that uses Server Actions to keep files ',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col gap-2`}>
        <div className='bg-img'></div>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
