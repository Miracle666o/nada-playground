import { NextRequest, NextResponse } from 'next/server';
import { loadFromGitHub } from '@/lib/github';

export async function POST(req: NextRequest) {
  try {
    const { programUrl, inputsUrl } = await req.json();
    if (!programUrl || typeof programUrl !== 'string') return NextResponse.json({ error: 'Invalid program URL' }, { status: 400 });

    const result = await loadFromGitHub(programUrl, inputsUrl);
    return NextResponse.json(result);
  } catch (error: any) {
    console.error('GitHub load error:', error);
    return NextResponse.json({ error: error.message || 'Failed to load from GitHub' }, { status: 500 });
  }
}