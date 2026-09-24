'use client';

import { useState } from 'react';

interface GitHubLoaderProps { onLoad: (programUrl: string, inputsUrl?: string) => Promise<void>; }

export default function GitHubLoader({ onLoad }: GitHubLoaderProps) {
  const [programUrl, setProgramUrl] = useState('');
  const [inputsUrl, setInputsUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const handleLoad = async () => { if (!programUrl.trim()) return; setIsLoading(true); try { await onLoad(programUrl, inputsUrl.trim() || undefined); } finally { setIsLoading(false); } };
  return (
    <div className="border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
      <div className="bg-gray-100 dark:bg-gray-800 px-4 py-2 border-b border-gray-300 dark:border-gray-600"><h3 className="font-semibold text-gray-700 dark:text-gray-300">Load from GitHub</h3></div>
      <div className="p-4 space-y-3">
        <input type="url" value={programUrl} onChange={(e) => setProgramUrl(e.target.value)} placeholder="Nada program GitHub URL" className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" />
        <input type="url" value={inputsUrl} onChange={(e) => setInputsUrl(e.target.value)} placeholder="Inputs YAML GitHub URL (optional)" className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" />
        <button onClick={handleLoad} disabled={isLoading || !programUrl.trim()} className="w-full px-4 py-2.5 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed">{isLoading ? 'Loading...' : 'Load from GitHub'}</button>
      </div>
    </div>
  );
}