import { NillionClient } from '@nillion/client-web';

let clientInstance: NillionClient | null = null;

export async function getNillionClient(): Promise<NillionClient> {
  if (clientInstance) return clientInstance;

  const clusterId = process.env.NEXT_PUBLIC_NILLION_CLUSTER_ID;
  const bootnode = process.env.NEXT_PUBLIC_NILLION_BOOTNODE_WEBSOCKET;
  const jsonRpcUrl = process.env.NEXT_PUBLIC_NILLION_NILCHAIN_JSON_RPC;
  const privateKey = process.env.NILLION_NILCHAIN_PRIVATE_KEY;

  if (!clusterId || !bootnode || !jsonRpcUrl || !privateKey) {
    throw new Error('Missing Nillion environment variables');
  }

  clientInstance = new NillionClient({
    clusterId,
    bootnode,
    payments: { jsonRpcUrl, privateKey },
  });

  await clientInstance.connect();
  return clientInstance;
}

export async function compileNadaCode(code: string): Promise<Uint8Array> {
  const response = await fetch('/api/compile', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Compilation failed');
  }

  const result = await response.json();
  return new Uint8Array(Buffer.from(result.binary, 'base64'));
}