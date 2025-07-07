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
    default: 'FIRMEDIGITAL PSC - Firma Electrónica Certificada en Venezuela | SUSCERTE',
    template: '%s | FIRMEDIGITAL PSC - Firma Electrónica Certificada Venezuela'
  },
  description: 'FIRMEDIGITAL PSC es un Proveedor de Servicios de Certificación acreditado por SUSCERTE que ofrece soluciones de firma electrónica certificada, firma digital avanzada y gestión documental electrónica para empresas y profesionales en Venezuela.',
  keywords: [
    'firma electrónica', 'firma digital', 'certificado digital', 'firma electrónica certificada', 
    'firma electrónica avanzada', 'firma electrónica cualificada', 'firma electrónica reconocida', 
    'firma electrónica legal', 'firma electrónica segura', 'firma electrónica validez legal', 
    'firma electrónica documentos', 'firma electrónica contratos', 'firma electrónica facturas', 
    'firma digital Venezuela', 'certificado digital SUSCERTE', 'proveedor servicios certificación', 
    'documentos electrónicos legales', 'validación de identidad digital', 'República Bolivariana de Venezuela', 
    'gestor documental electrónico', 'multifirma digital', 'verificación certificados digitales',
    'firma electrónica sectores', 'firma digital industrial', 'firma electrónica salud',
    'firma digital legal', 'firma electrónica ingeniería', 'firma digital recursos humanos'
  ],
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
    title: 'FIRMEDIGITAL PSC - Firma Electrónica Certificada en Venezuela | SUSCERTE',
    description: 'FIRMEDIGITAL PSC es un Proveedor de Servicios de Certificación acreditado por SUSCERTE que ofrece soluciones de firma electrónica certificada, firma digital avanzada y gestión documental electrónica para empresas y profesionales en Venezuela.',
    url: 'https://firmedigital.com',
    siteName: 'FIRMEDIGITAL PSC',
    images: [
      {
        url: 'https://firmedigital.com/images/logo.webp',
        width: 800,
        height: 600,
        alt: 'FIRMEDIGITAL PSC Logo - Firma Electrónica Certificada Venezuela',
      },
    ],
    locale: 'es_VE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FIRMEDIGITAL PSC - Firma Electrónica Certificada en Venezuela | SUSCERTE',
    description: 'Proveedor de Servicios de Certificación acreditado por SUSCERTE. Soluciones de firma electrónica certificada y firma digital avanzada para Venezuela.',
    images: ['https://firmedigital.com/images/logo.webp'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/apple-touch-icon-precomposed.png',
    },
  },
  verification: {
    google: 'google-site-verification=FIRMEDIGITAL',
  },
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black',
    'apple-mobile-web-app-title': 'FIRMEDIGITAL PSC - Firma Electrónica Certificada',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
      </head>
      <body className={inter.className}>
        <JsonLd />
        <AnimatedBackground />
        <ClientLayout>{children}</ClientLayout>
        <Footer />
      </body>
    </html>
  )
}
