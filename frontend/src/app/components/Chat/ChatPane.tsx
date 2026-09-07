"use client";

import { useEffect, useState } from "react";
import MessageItem from "./MessageItem";
import ModelSelector from "./ModelSelector";
import {
  createSession,
  getMessages,
  saveMessage,
  sendChat,
  generateArtifact,
} from "@/app/lib/api";

type Message = {
  role: "user" | "assistant";
  content: string;
};

type ApiMessage = {
  role: "user" | "assistant";
  content: string;
};

type ChatPaneProps = {
  currentSession: number | null;
  artifact: string;
  setArtifact: React.Dispatch<React.SetStateAction<string>>;
};

export default function ChatPane({
  currentSession,
  artifact,
  setArtifact,
}: ChatPaneProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Welcome to the Lenny Growth Assistant. Ask questions about product management, growth, experimentation, retention, and product-led growth using Lenny's Podcast transcripts.",
    },
  ]);

  const [input, setInput] = useState("");
  const [model, setModel] = useState("llama3.2:3b");

  useEffect(() => {
    if (currentSession !== null) {
      loadMessages(currentSession);
    } else {
      setMessages([
        {
          role: "assistant",
          content:
            "Welcome to the Lenny Growth Assistant. Ask questions about product management, growth, experimentation, retention, and product-led growth using Lenny's Podcast transcripts.",
        },
      ]);
      setArtifact("");
    }
  }, [currentSession]);

  async function loadMessages(sessionId: number) {
    const data: ApiMessage[] = await getMessages(sessionId);

    if (data.length === 0) {
      setMessages([
        {
          role: "assistant",
          content:
            "Welcome to the Lenny Growth Assistant. Ask questions about product management, growth, experimentation, retention, and product-led growth using Lenny's Podcast transcripts.",
        },
      ]);
      return;
    }

    setMessages(data);
  }

  async function sendMessage() {
    if (!input.trim()) return;

    let sessionId: number;

    if (currentSession !== null) {
      sessionId = currentSession;
    } else {
      const session = await createSession();
      sessionId = session.id;
    }

    const userMessage: Message = {
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);

    await saveMessage(sessionId, "user", input);

    const provider =
  model.startsWith("llama")
    ? "ollama"
    : model.startsWith("gpt")
    ? "openai"
    : "claude";

    const chat = await sendChat(sessionId, input, provider, model);

    const assistantMessage: Message = {
      role: "assistant",
      content: chat.reply,
    };

    setMessages((prev) => [...prev, assistantMessage]);

    await saveMessage(sessionId, "assistant", chat.reply);

    try {
      const generated = await generateArtifact(chat.reply);
      setArtifact(generated.content);
    } catch (error) {
      console.error("Artifact generation failed:", error);
      setArtifact("");
    }

    setInput("");
  }

  return (
    <section className="flex flex-1 flex-col">
      <div className="flex items-center justify-between border-b border-slate-800 px-8 py-4">
        <h2 className="text-lg font-semibold">Chat</h2>
        <ModelSelector model={model} setModel={setModel} />
      </div>

      <div className="flex-1 overflow-y-auto p-8">
        <div className="mx-auto max-w-3xl space-y-6">
          {messages.map((message, index) => (
            <MessageItem
              key={index}
              role={message.role}
              content={message.content}
            />
          ))}
        </div>
      </div>

      <div className="border-t border-slate-800 p-4">
        <div className="mx-auto flex max-w-3xl gap-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") sendMessage();
            }}
            type="text"
            placeholder="Ask a product question..."
            className="flex-1 rounded-xl bg-slate-800 px-4 py-3 outline-none"
          />

          <button
            onClick={sendMessage}
            className="rounded-xl bg-blue-600 px-5 py-3 font-medium hover:bg-blue-700"
          >
            Send
          </button>
        </div>
      </div>
    </section>
  );
}