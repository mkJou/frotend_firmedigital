'use client';

import { usePathname } from 'next/navigation';
import Head from 'next/head';

export default function CanonicalUrl() {
  const pathname = usePathname();
  const baseUrl = 'https://firmedigital.com';
  const canonicalUrl = `${baseUrl}${pathname}`;

  return (
    <Head>
      <link rel="canonical" href={canonicalUrl} />
    </Head>
  );
}
