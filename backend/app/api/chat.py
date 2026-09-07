from fastapi import APIRouter
from pydantic import BaseModel
import requests

router = APIRouter(prefix="/api/chat", tags=["Chat"])


class ChatRequest(BaseModel):
    session_id: int
    message: str
    provider: str
    model: str


OLLAMA_URL = "http://127.0.0.1:11434/api/generate"


@router.post("")
async def chat(data: ChatRequest):
    artifact = None

    try:
        if data.provider == "ollama":
            response = requests.post(
                OLLAMA_URL,
                json={
                    "model": data.model,
                    "prompt": data.message,
                    "stream": False,
                },
                timeout=60,
            )

            response.raise_for_status()
            result = response.json()
            reply = result.get("response", "No response from Ollama.")

        else:
            reply = f"You said: {data.message}"

    except requests.exceptions.RequestException:
        # Render doesn't have Ollama running, so return a fallback reply.
        reply = f"You said: {data.message}"

    # Keep your existing artifact feature
    if "markdown" in data.message.lower():
        artifact = {
            "type": "markdown",
            "title": "Generated Markdown",
            "content": reply,
        }
    elif "html" in data.message.lower():
        artifact = {
            "type": "html",
            "title": "Generated HTML",
            "content": reply,
        }

    return {
        "session_id": data.session_id,
        "reply": reply,
        "artifact": artifact,
    }