const API_BASE = "https://lenny-growth-assistant-gmx9.onrender.com";

export async function createSession() {
  const response = await fetch(`${API_BASE}/api/sessions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: "New Chat",
      provider: "ollama",
      model: "llama3.2:3b",
    }),
  });

  return response.json();
}

export async function getSessions() {
  const response = await fetch(`${API_BASE}/api/sessions`);
  return response.json();
}

export async function saveMessage(
  sessionId: number,
  role: string,
  content: string
) {
  const response = await fetch(`${API_BASE}/api/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      session_id: sessionId,
      role,
      content,
    }),
  });

  return response.json();
}

export async function getMessages(sessionId: number) {
  const response = await fetch(`${API_BASE}/api/messages/${sessionId}`);
  return response.json();
}

export async function sendChat(
  sessionId: number,
  message: string,
  provider = "ollama",
  model = "llama3.2:3b"
) {
  const response = await fetch(`${API_BASE}/api/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      session_id: sessionId,
      message,
      provider,
      model,
    }),
  });

  return response.json();
}

// NEW: Generate Artifact
export async function generateArtifact(content: string) {
  const response = await fetch(`${API_BASE}/api/artifact`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content,
    }),
  });

  return response.json();
}