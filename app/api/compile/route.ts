import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';
import path from 'path';
import os from 'os';

const execAsync = promisify(exec);

export async function POST(req: NextRequest) {
  try {
    const { code } = await req.json();
    if (!code || typeof code !== 'string') return NextResponse.json({ error: 'Invalid code' }, { status: 400 });

    const tempDir = os.tmpdir();
    const tempPath = path.join(tempDir, `nada_${Date.now()}.py`);
    const outputPath = `${tempPath}.bin`;

    try {
      fs.writeFileSync(tempPath, code);
      const { stdout, stderr } = await execAsync(`pynadac ${tempPath} -o ${outputPath}`);
      const binary = fs.readFileSync(outputPath);
      const base64 = binary.toString('base64');
      fs.unlinkSync(tempPath); fs.unlinkSync(outputPath);
      return NextResponse.json({ binary, stdout });
    } catch (compileError: any) {
      try { if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath); if (fs.existsSync(outputPath)) fs.unlinkSync(outputPath); } catch {}
      return NextResponse.json({ error: compileError.message || 'Compilation failed' }, { status: 400 });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}