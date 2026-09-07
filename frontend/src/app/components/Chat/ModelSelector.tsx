"use client";

type Props = {
  model: string;
  setModel: (model: string) => void;
};

export default function ModelSelector({ model, setModel }: Props) {
  return (
    <select
      value={model}
      onChange={(e) => setModel(e.target.value)}
      className="rounded-lg bg-slate-800 px-3 py-2 text-white outline-none"
    >
      <option value="llama3">Ollama (Llama 3)</option>
      <option value="llama3.2:3b">Ollama (Llama 3.2 3B)</option>
      <option value="gpt-4o-mini">OpenAI</option>
      <option value="claude-3-haiku">Claude</option>
    </select>
  );
}