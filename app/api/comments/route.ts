import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const comment = await prisma.comment.create({
      data: {
        content: body.content,
        author: body.author,
        postId: body.postId
      }
    });
    return NextResponse.json(comment);
  } catch (error) {
    return NextResponse.json({ error: 'Error al crear el comentario' }, { status: 500 });
  }
}