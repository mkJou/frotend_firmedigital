import './globals.css'
import { Metadata } from 'next'
import { Inter } from 'next/font/google'
import dynamic from 'next/dynamic'
import ClientLayout from './components/ClientLayout'
import Footer from '../components/Footer'
import JsonLd from './jsonld'

// Importar el fondo animado directamente para asegurar su carga
import AnimatedBackground from './components/AnimatedBackground'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'FIRMEDIGITAL PSC - Firma Electrónica Certificada',
    template: '%s | FIRMEDIGITAL PSC'
  },
  description: 'FIRMEDIGITAL PSC es un Proveedor de Servicios de Certificación que ofrece soluciones de firma electrónica certificada para empresas y personas.',
  keywords: ['firma electrónica', 'firma digital', 'certificado digital', 'firma electrónica certificada', 'firma electrónica avanzada', 'firma electrónica simple', 'firma electrónica cualificada', 'firma electrónica reconocida', 'firma electrónica legal', 'firma electrónica segura', 'firma electrónica validez legal', 'firma electrónica documentos', 'firma electrónica contratos', 'firma electrónica facturas', 'firma electrónica documentos legales', 'firma electrónica documentos oficiales', 'firma electrónica documentos privados', 'firma electrónica documentos públicos', 'firma electrónica documentos comerciales', 'firma electrónica documentos administrativos'],
  authors: [{ name: 'FIRMEDIGITAL PSC' }],
  creator: 'FIRMEDIGITAL PSC',
  publisher: 'FIRMEDIGITAL PSC',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://firmedigital.com'),
  openGraph: {
    title: 'FIRMEDIGITAL PSC - Firma Electrónica Certificada',
    description: 'FIRMEDIGITAL PSC es un Proveedor de Servicios de Certificación que ofrece soluciones de firma electrónica certificada para empresas y personas.',
    url: 'https://firmedigital.com',
    siteName: 'FIRMEDIGITAL PSC',
    images: [
      {
        url: 'https://firmedigital.com/images/logo.webp',
        width: 800,
        height: 600,
        alt: 'FIRMEDIGITAL PSC Logo',
      },
    ],
    locale: 'es_CL',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FIRMEDIGITAL PSC - Firma Electrónica Certificada',
    description: 'FIRMEDIGITAL PSC es un Proveedor de Servicios de Certificación que ofrece soluciones de firma electrónica certificada para empresas y personas.',
    images: ['https://firmedigital.com/images/logo.webp'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  verification: {
    google: 'google-site-verification=FIRMEDIGITAL',
  },
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black',
    'apple-mobile-web-app-title': 'FIRMEDIGITAL PSC',
    'cache-control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
    'pragma': 'no-cache',
    'expires': '0'
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <JsonLd />
        <AnimatedBackground />
        <ClientLayout>{children}</ClientLayout>
        <Footer />
      </body>
    </html>
  )
}
