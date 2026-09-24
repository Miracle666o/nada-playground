'use client';

interface ToolbarProps {
  onRun: () => void;
  onReset: () => void;
  onShare: () => void;
  onStore: () => void;
  isLoading: boolean;
  programId: string | null;
}

export default function Toolbar({ onRun, onReset, onShare, onStore, isLoading, programId }: ToolbarProps) {
  return (
    <div className="flex flex-wrap gap-3 mb-6">
      <button onClick={onRun} disabled={isLoading} className="px-6 py-2.5 bg-nillion-600 text-white font-semibold rounded-lg hover:bg-nillion-700 disabled:opacity-50 disabled:cursor-not-allowed">
        {isLoading ? 'Running...' : 'Run'}
      </button>
      <button onClick={onReset} disabled={isLoading} className="px-6 py-2.5 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-semibold rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50">
        Reset
      </button>
      <button onClick={onShare} disabled={isLoading} className="px-6 py-2.5 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 disabled:opacity-50">
        Share
      </button>
      <button onClick={onStore} disabled={isLoading} className="px-6 py-2.5 bg-purple-500 text-white font-semibold rounded-lg hover:bg-purple-600 disabled:opacity-50">
        Store Program
      </button>
      {programId && <div className="px-4 py-2.5 bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700 rounded-lg"><span className="text-green-800 dark:text-green-300 text-sm font-mono">Program ID: {programId}</span></div>}
    </div>
  );
}