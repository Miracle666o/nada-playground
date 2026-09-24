import { NextRequest, NextResponse } from 'next/server';
import { getNillionClient, compileNadaCode } from '@/lib/nillion';

export async function POST(req: NextRequest) {
  try {
    const { code } = await req.json();
    if (!code || typeof code !== 'string') return NextResponse.json({ error: 'Invalid code' }, { status: 400 });

    const compiledBinary = await compileNadaCode(code);
    const client = await getNillionClient();
    const programId = await client.storeProgram(compiledBinary);

    return NextResponse.json({ programId: programId.toString(), message: 'Program stored successfully' });
  } catch (error: any) {
    console.error('Store error:', error);
    return NextResponse.json({ error: error.message || 'Failed to store program' }, { status: 500 });
  }
}