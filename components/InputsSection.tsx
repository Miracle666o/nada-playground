'use client';

import type { ProgramInput, InputType } from '@/lib/types';

interface InputsSectionProps {
  inputs: ProgramInput[];
  onChange: (inputs: ProgramInput[]) => void;
}

const INPUT_TYPES: InputType[] = [
  'PublicInteger',
  'PublicUnsignedInteger',
  'SecretInteger',
  'SecretUnsignedInteger',
];

export default function InputsSection({ inputs, onChange }: InputsSectionProps) {
  const addInput = () => {
    onChange([
      ...inputs,
      { name: `input_${inputs.length + 1}`, type: 'SecretInteger', value: 0, party: 'Party1' },
    ]);
  };

  const removeInput = (index: number) => {
    onChange(inputs.filter((_, i) => i !== index));
  };

  const updateInput = (index: number, field: keyof ProgramInput, value: string | number) => {
    onChange(
      inputs.map((input, i) => (i === index ? { ...input, [field]: value } : input))
    );
  };

  return (
    <div className="border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
      <div className="bg-gray-100 dark:bg-gray-800 px-4 py-2 border-b border-gray-300 dark:border-gray-600 flex justify-between items-center">
        <h3 className="font-semibold text-gray-700 dark:text-gray-300">Program Inputs</h3>
        <button
          onClick={addInput}
          className="px-3 py-1 bg-nillion-600 text-white rounded hover:bg-nillion-700 text-sm"
        >
          + Add Input
        </button>
      </div>
      <div className="p-4 space-y-3">
        {inputs.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-sm">No inputs defined. Click "Add Input" to add one.</p>
        ) : (
          inputs.map((input, index) => (
            <div key={index} className="grid grid-cols-5 gap-2 items-center">
              <input
                type="text"
                value={input.name}
                onChange={(e) => updateInput(index, 'name', e.target.value)}
                placeholder="Name"
                className="col-span-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm"
              />
              <select
                value={input.type}
                onChange={(e) => updateInput(index, 'type', e.target.value as InputType)}
                className="col-span-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm"
              >
                {INPUT_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <input
                type="number"
                value={input.value}
                onChange={(e) => updateInput(index, 'value', parseInt(e.target.value) || 0)}
                placeholder="Value"
                className="col-span-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm"
              />
              <input
                type="text"
                value={input.party}
                onChange={(e) => updateInput(index, 'party', e.target.value)}
                placeholder="Party"
                className="col-span-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm"
              />
              <button
                onClick={() => removeInput(index)}
                className="col-span-1 px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}