import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || '';
    const value = searchParams.get('value') || '';

    const allowed = new Set(['name', 'email', 'serial', 'ci']);
    if (!allowed.has(type) || !value) {
      return NextResponse.json({ success: false, message: 'Parámetros inválidos' }, { status: 400 });
    }

    // Normalización básica
    let searchValue = value;
    if (type === 'email') searchValue = value.toLowerCase();
    if (type === 'serial') searchValue = value.toUpperCase();
    if (type === 'ci') searchValue = value.trim().replace(/\D/g, '');

    const apiUrl = `https://ca.firmedigital.com/api/v1/certificate/list?${type}=${encodeURIComponent(searchValue)}`;

    const upstream = await fetch(apiUrl, {
      method: 'GET',
      headers: { Accept: 'application/json' },
      // Reintentos simples ante fallos transitorios
      cache: 'no-store',
    });

    if (!upstream.ok) {
      return NextResponse.json({ success: false, message: `Error del servidor: ${upstream.status}` }, { status: upstream.status });
    }

    let data: any;
    try {
      data = await upstream.json();
    } catch (e) {
      return NextResponse.json({ success: false, message: 'Respuesta no válida del servidor' }, { status: 502 });
    }

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error?.message || 'Error interno' }, { status: 500 });
  }
}
