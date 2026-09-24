import yaml from 'js-yaml';
import type { ProgramInput, GitHubLoadResult } from './types';

export async function fetchFromGitHub(url: string): Promise<string> {
  const rawUrl = url.replace('github.com', 'raw.githubusercontent.com').replace('/blob/', '/');
  const response = await fetch(rawUrl);
  if (!response.ok) throw new Error(`Failed to fetch from GitHub: ${response.statusText}`);
  return await response.text();
}

export function parseTestYaml(yamlContent: string): ProgramInput[] {
  const data = yaml.load(yamlContent) as any;
  const inputs: ProgramInput[] = [];
  if (data.inputs) {
    for (const [name, value] of Object.entries(data.inputs)) {
      inputs.push({ name, type: 'SecretInteger', value: Number(value), party: 'Party1' });
    }
  }
  return inputs;
}

export async function loadFromGitHub(programUrl: string, inputsUrl?: string): Promise<GitHubLoadResult> {
  const code = await fetchFromGitHub(programUrl);
  let inputs: ProgramInput[] | undefined;
  if (inputsUrl) { const yamlContent = await fetchFromGitHub(inputsUrl); inputs = parseTestYaml(yamlContent); }
  return { code, inputs };
}