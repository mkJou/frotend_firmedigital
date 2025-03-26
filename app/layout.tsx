import './globals.css'
import { Inter } from 'next/font/google'
import ClientLayout from './components/ClientLayout'
import AnimatedBackground from './components/AnimatedBackground'
import Footer from '../components/Footer'
import JsonLd from './jsonld'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  metadataBase: new URL('https://firmedigital.com'),
  title: 'FirmeDigital | Firma Digital y Electrónica con Validez Legal en Venezuela',
  description: 'FirmeDigital: Solución integral de firma digital y electrónica certificada para empresas. Gestión documental segura, validación de identidad y certificados digitales con respaldo legal.',
  keywords: 'FIRMEDIGITAL, firme digital, firmedigital, firma digital, firma electrónica, certificado digital, firma en línea, documento digital, comprar firma digital online, firma electrónica para empresas, cómo obtener una firma digital, firma digital para documentos legales, firma electrónica segura, adquirir firma electrónica, precio de firma digital, certificación digital segura, servicios de firma electrónica, firma digital con validez legal, diferencias entre firma digital y electrónica, qué es una firma digital y cómo funciona, beneficios de la firma electrónica, cómo firmar documentos en línea, regulaciones de la firma digital',
  alternates: {
    canonical: '/',
    languages: {
      'es-ES': '/es',
      'en-US': '/en'
    }
  },
  openGraph: {
    title: 'FirmeDigital | Servicios de Firma Digital y Electrónica Certificada',
    description: 'Adquiera su firma digital con validez legal. Soluciones avanzadas de firma electrónica y gestión documental para empresas. Certificación digital segura y confiable.',
    type: 'website',
    locale: 'es_ES',
    url: 'https://firmedigital.com',
    siteName: 'FIRMEDIGITAL',
    images: [{
      url: '/images/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'FirmeDigital - Soluciones de Firma Digital'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FirmeDigital - Servicios de Firma Digital y Electrónica en Venezuela',
    description: 'Descubra cómo obtener su firma digital certificada. Servicios profesionales de firma electrónica y gestión documental para empresas. Validez legal garantizada.',
    images: ['/images/twitter-image.jpg']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
    nocache: true,
    'max-image-preview': 'large',
    'max-snippet': -1
  },
  verification: {
    google: '7nVAcCtirB6GZWkont8CS1hV0saFlFwX2Ly3Bo5aUHc',
    yandex: 'verificación-yandex',
    yahoo: 'verificación-yahoo'
  },
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black',
    'format-detection': 'telephone=no'
  }
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
