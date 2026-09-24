'use client';

import { EXAMPLE_PROGRAMS } from '@/lib/examples';

interface ExampleSelectorProps { onSelect: (name: string) => void; }

export default function ExampleSelector({ onSelect }: ExampleSelectorProps) {
  return (
    <div className="border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
      <div className="bg-gray-100 dark:bg-gray-800 px-4 py-2 border-b border-gray-300 dark:border-gray-600"><h3 className="font-semibold text-gray-700 dark:text-gray-300">Load Example</h3></div>
      <div className="p-4">
        <select onChange={(e) => { if (e.target.value) { onSelect(e.target.value); e.target.value = ''; } }} className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" defaultValue="">
          <option value="" disabled>Select an example program...</option>
          {EXAMPLE_PROGRAMS.map((example) => <option key={example.name} value={example.name}>{example.name} - {example.description}</option>)}
        </select>
      </div>
    </div>
  );
}