'use client';

import { useChat } from '@ai-sdk/react';
import { Paperclip, Send, X } from 'lucide-react';
import { useRef, useState } from 'react';

export default function Home() {
  const { messages, append, isLoading } = useChat({
    api: '/api/chat',
  });

  const [input, setInput] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setFiles(Array.from(e.target.files));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim() && files.length === 0) return;

    // ✅ SDK v3 correct way: text + attachments
    await append(
      {
        role: 'user',
        content: input.trim() || 'User uploaded file(s)',
      },
      {
        experimental_attachments: files,
      }
    );

    setInput('');
    setFiles([]);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <header className="p-4 text-xl font-semibold">
        NewgenAI
      </header>

      {/* Chat Area */}
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 pb-32">
        <div className="space-y-6">
          {messages.map((m) => (
            <div
              key={m.id}
              className={m.role === 'user' ? 'text-right' : 'text-left'}
            >
              <div className="inline-block bg-zinc-800 px-4 py-2 rounded-2xl max-w-[80%]">
                <p>{m.content as string}</p>

                {m.experimental_attachments?.length > 0 && (
                  <p className="text-xs text-zinc-400 mt-1">
                    📎 {m.experimental_attachments.length} file(s) attached
                  </p>
                )}
              </div>
            </div>
          ))}

          {isLoading && (
            <p className="text-zinc-400">Thinking…</p>
          )}
        </div>
      </main>

      {/* Input Bar */}
      <form
        onSubmit={onSubmit}
        className="fixed bottom-0 left-0 right-0 bg-black border-t border-zinc-800 p-4"
      >
        <div className="max-w-3xl mx-auto flex items-center gap-2 bg-zinc-900 rounded-full px-4 py-2">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="text-zinc-400 hover:text-white"
          >
            <Paperclip />
          </button>

          <input
            ref={fileInputRef}
            type="file"
            multiple
            hidden
            onChange={handleFileSelect}
          />

          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything"
            className="flex-1 bg-transparent outline-none text-white placeholder-zinc-500"
          />

          <button
            type="submit"
            disabled={isLoading}
            className="bg-white text-black rounded-full p-2"
          >
            <Send size={18} />
          </button>
        </div>

        {/* File preview */}
        {files.length > 0 && (
          <div className="max-w-3xl mx-auto mt-2 flex gap-2 flex-wrap">
            {files.map((file, i) => (
              <div
                key={i}
                className="bg-zinc-800 text-xs px-3 py-1 rounded-full flex items-center gap-2"
              >
                <span>{file.name}</span>
                <button onClick={() => setFiles([])}>
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
        )}
      </form>
    </div>
  );
}
