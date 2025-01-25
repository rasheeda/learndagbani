import { Inter } from 'next/font/google'
import { Navbar } from '../components/layout/navbar'
import { Footer } from '../components/layout/footer'
import './globals.css'

// Initialize the Inter font
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Learn Dagbanli',
  description: 'Learn how to speak and write Dagbanli with video and text lessons online for free.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}