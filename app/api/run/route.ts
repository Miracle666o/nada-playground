import { NextRequest, NextResponse } from 'next/server';
import { getNillionClient, compileNadaCode } from '@/lib/nillion';
import { SecretInteger, PublicInteger } from '@nillion/client-web';

export async function POST(req: NextRequest) {
  try {
    const { code, inputs } = await req.json();
    if (!code || !inputs || !Array.isArray(inputs)) return NextResponse.json({ error: 'Invalid request' }, { status: 400 });

    const compiledBinary = await compileNadaCode(code);
    const client = await getNillionClient();
    const programId = await client.storeProgram(compiledBinary);

    const inputValues: Record<string, any> = {};
    for (const input of inputs) {
      const { name, type, value, party } = input;
      const nadaValue = (type === 'SecretInteger' || type === 'SecretUnsignedInteger') ? new SecretInteger(BigInt(value)) : new PublicInteger(BigInt(value));
      inputValues[name] = { value: nadaValue, party };
    }

    const result = await client.compute({ programId, inputValues });
    const outputs = Object.entries(result).map(([name, output]: [string, any]) => ({ name, value: Number(output.value), party: output.party }));

    return NextResponse.json({ outputs, programId: programId.toString() });
  } catch (error: any) {
    console.error('Run error:', error);
    return NextResponse.json({ error: error.message || 'Failed to run program' }, { status: 500 });
  }
}