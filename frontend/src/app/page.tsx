"use client";

import { useEffect, useState } from "react";
import ChatPane from "./components/Chat/ChatPane";
import ArtifactViewer from "./components/Artifact/ArtifactViewer";
import { createSession, getSessions } from "./lib/api";

type Session = {
  id: number;
  title: string;
};

export default function Home() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [currentSession, setCurrentSession] = useState<number | null>(null);
  const [artifact, setArtifact] = useState("");

  useEffect(() => {
    loadSessions();
  }, []);

  async function loadSessions() {
    const data = await getSessions();
    setSessions(data);

    if (data.length > 0 && currentSession === null) {
      setCurrentSession(data[0].id);
    }
  }

  async function handleNewChat() {
    const session = await createSession();
    setSessions((prev) => [session, ...prev]);
    setCurrentSession(session.id);
    setArtifact("");
  }

  return (
    <main className="flex h-screen bg-[#020817] text-white">
      <aside className="flex w-80 flex-col border-r border-slate-800 p-6">
        <h1 className="mb-8 text-4xl font-bold">Lenny Growth Assistant</h1>

        <button
          onClick={handleNewChat}
          className="mb-8 w-full rounded-2xl bg-blue-600 py-4 text-xl font-semibold hover:bg-blue-700"
        >
          + New Chat
        </button>

        <div className="flex-1 space-y-4 overflow-y-auto">
          {sessions.map((session) => (
            <button
              key={session.id}
              onClick={() => setCurrentSession(session.id)}
              className={`w-full rounded-2xl px-5 py-4 text-left text-xl ${
                currentSession === session.id
                  ? "bg-blue-700"
                  : "bg-slate-800 hover:bg-slate-700"
              }`}
            >
              {session.title}
            </button>
          ))}
        </div>
      </aside>

      <ChatPane
        currentSession={currentSession}
        artifact={artifact}
        setArtifact={setArtifact}
      />

      <div className="w-96 border-l border-slate-800 p-6">
        <ArtifactViewer content={artifact} />
      </div>
    </main>
  );
}