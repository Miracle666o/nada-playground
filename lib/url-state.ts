import pako from 'pako';

export function encodePlaygroundState(code: string, inputs: Array<{ name: string; type: string; value: number; party: string }>): string {
  const state = { code, inputs };
  const json = JSON.stringify(state);
  const compressed = pako.deflate(json, { to: 'string' });
  return btoa(compressed);
}

export function decodePlaygroundState(encoded: string): { code: string; inputs: Array<{ name: string; type: string; value: number; party: string }> } {
  const compressed = atob(encoded);
  const json = pako.inflate(compressed, { to: 'string' });
  return JSON.parse(json);
}