'use client';

import type { ProgramOutput } from '@/lib/types';

interface OutputsSectionProps {
  outputs: ProgramOutput[];
  error: string | null;
  isLoading: boolean;
}

export default function OutputsSection({ outputs, error, isLoading }: OutputsSectionProps) {
  return (
    <div className="border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden h-full">
      <div className="bg-gray-100 dark:bg-gray-800 px-4 py-2 border-b border-gray-300 dark:border-gray-600">
        <h3 className="font-semibold text-gray-700 dark:text-gray-300">Program Outputs</h3>
      </div>
      <div className="p-4">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-nillion-600" />
            <span className="ml-3 text-gray-600 dark:text-gray-400">Running program...</span>
          </div>
        ) : error ? (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <h4 className="font-semibold text-red-700 dark:text-red-400 mb-2">Error</h4>
            <pre className="text-red-600 dark:text-red-300 text-sm whitespace-pre-wrap">{error}</pre>
          </div>
        ) : outputs.length === 0 ? (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            <p>Click Run to execute your Nada program</p>
            <p className="text-sm mt-2">Results will appear here</p>
          </div>
        ) : (
          <div className="space-y-3">
            {outputs.map((output, index) => (
              <div key={index} className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div><span className="font-medium text-gray-600 dark:text-gray-400">Name:</span><span className="ml-2 text-gray-900 dark:text-gray-100">{output.name}</span></div>
                  <div><span className="font-medium text-gray-600 dark:text-gray-400">Value:</span><span className="ml-2 text-gray-900 dark:text-gray-100 font-mono">{output.value}</span></div>
                  <div><span className="font-medium text-gray-600 dark:text-gray-400">Party:</span><span className="ml-2 text-gray-900 dark:text-gray-100">{output.party}</span></div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}