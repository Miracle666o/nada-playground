'use client';

import { useState, useEffect } from 'react';
import { useQueryState } from 'nuqs';
import CodeEditor from '@/components/CodeEditor';
import InputsSection from '@/components/InputsSection';
import OutputsSection from '@/components/OutputsSection';
import Toolbar from '@/components/Toolbar';
import ExampleSelector from '@/components/ExampleSelector';
import GitHubLoader from '@/components/GitHubLoader';
import { EXAMPLE_PROGRAMS } from '@/lib/examples';
import { decodePlaygroundState, encodePlaygroundState } from '@/lib/url-state';
import type { ProgramInput, ProgramOutput } from '@/lib/types';

export default function Home() {
  const [code, setCode] = useState(EXAMPLE_PROGRAMS[0].code);
  const [inputs, setInputs] = useState<ProgramInput[]>(EXAMPLE_PROGRAMS[0].inputs);
  const [outputs, setOutputs] = useState<ProgramOutput[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [programId, setProgramId] = useState<string | null>(null);
  const [encodedState, setEncodedState] = useQueryState('code');

  useEffect(() => {
    if (encodedState) {
      try {
        const decoded = decodePlaygroundState(encodedState);
        setCode(decoded.code);
        setInputs(decoded.inputs);
      } catch (e) { console.error('Failed to decode state:', e); }
    }
  }, [encodedState]);

  const handleRun = async () => {
    setIsLoading(true); setError(null); setOutputs([]);
    try {
      const response = await fetch('/api/run', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ code, inputs }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Failed to run program');
      setOutputs(result.outputs);
      setProgramId(result.programId || null);
    } catch (err: any) { setError(err.message || 'An error occurred'); }
    finally { setIsLoading(false); }
  };

  const handleReset = () => { setCode(''); setInputs([]); setOutputs([]); setError(null); setProgramId(null); };

  const handleShare = () => {
    const encoded = encodePlaygroundState(code, inputs);
    const url = `${window.location.origin}${window.location.pathname}?code=${encoded}`;
    navigator.clipboard.writeText(url);
    alert('Shareable URL copied to clipboard!');
  };

  const handleStoreProgram = async () => {
    setIsLoading(true); setError(null);
    try {
      const response = await fetch('/api/store', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ code }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Failed to store program');
      setProgramId(result.programId);
      alert(`Program stored! ID: ${result.programId}`);
    } catch (err: any) { setError(err.message || 'Failed to store program'); }
    finally { setIsLoading(false); }
  };

  const handleLoadExample = (exampleName: string) => {
    const example = EXAMPLE_PROGRAMS.find(e => e.name === exampleName);
    if (example) { setCode(example.code); setInputs(example.inputs); setOutputs([]); setError(null); }
  };

  const handleLoadFromGitHub = async (programUrl: string, inputsUrl?: string) => {
    try {
      const response = await fetch('/api/github', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ programUrl, inputsUrl }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Failed to load from GitHub');
      setCode(result.code);
      if (result.inputs) setInputs(result.inputs);
      setOutputs([]); setError(null);
    } catch (err: any) { setError(err.message || 'Failed to load from GitHub'); }
  };

  return (
    <main className="min-h-screen p-4 md:p-8 bg-gradient-to-br from-nillion-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto">
        <header className="mb-6"><h1 className="text-4xl font-bold text-nillion-700 dark:text-nillion-500 mb-2">Nada Playground</h1><p className="text-gray-600 dark:text-gray-300">Write, run, and share Nada programs</p></header>
        <Toolbar onRun={handleRun} onReset={handleReset} onShare={handleShare} onStore={handleStoreProgram} isLoading={isLoading} programId={programId} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <div className="space-y-4"><ExampleSelector onSelect={handleLoadExample} /><GitHubLoader onLoad={handleLoadFromGitHub} /><CodeEditor code={code} onChange={setCode} /><InputsSection inputs={inputs} onChange={setInputs} /></div>
          <div><OutputsSection outputs={outputs} error={error} isLoading={isLoading} /></div>
        </div>
        <footer className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400">Built with NextJS, CodeMirror 6, and Nillion Network</footer>
      </div>
    </main>
  );
}