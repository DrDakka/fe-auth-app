type Props = { text: string; ok?: boolean };

export function FormMessage({ text, ok = false }: Props) {
  return (
    <p className={`text-sm ${ok ? 'text-green-600' : 'text-red-500'}`}>{text}</p>
  );
}
