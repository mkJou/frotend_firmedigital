import { Metadata } from 'next';
import MegaMenu from '@/components/MegaMenu';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Gestor de Documentos | Firmedigital',
  description: 'Sistema de gestión documental inteligente con IA para empresas. Centralice, gestione y proteja sus documentos con Firmedigital.',
};

export default function GestorDocumentosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <MegaMenu />
      {children}
     
    </>
  );
}
