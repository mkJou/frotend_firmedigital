import './globals.css'
import { Inter } from 'next/font/google'
import ClientLayout from './components/ClientLayout'
import AnimatedBackground from './components/AnimatedBackground'
import Footer from '../components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Firme Digital',
  description: 'Soluciones digitales para tu empresa',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <AnimatedBackground />
        <ClientLayout>{children}</ClientLayout>
        <Footer />
      </body>
    </html>
  )
}
