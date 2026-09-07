"use client";

import ReactMarkdown from "react-markdown";

type MessageItemProps = {
  role: "user" | "assistant";
  content: string;
};

export default function MessageItem({ role, content }: MessageItemProps) {
  return (
    <div className={`flex ${role === "user" ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-2xl rounded-2xl px-4 py-3 ${
          role === "user"
            ? "bg-blue-600 text-white"
            : "bg-slate-800 text-white"
        }`}
      >
        {role === "assistant" ? (
          <div className="prose prose-invert max-w-none">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        ) : (
          content
        )}
      </div>
    </div>
  );
}