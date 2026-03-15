import { InputHTMLAttributes } from 'react';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export function FormField({ label, ...inputProps }: Props) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        {...inputProps}
        className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
      />
    </div>
  );
}
