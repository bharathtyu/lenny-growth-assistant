from fastapi import APIRouter
from pydantic import BaseModel
import requests

router = APIRouter(prefix="/api/chat", tags=["Chat"])


class ChatRequest(BaseModel):
    session_id: int
    message: str
    provider: str
    model: str


@router.post("")
async def chat(data: ChatRequest):
    if data.provider == "ollama":
        response = requests.post(
            "http://127.0.0.1:11434/api/generate",
            json={
                "model": data.model,
                "prompt": data.message,
                "stream": False,
            },
            timeout=300,
        )

        result = response.json()
        reply = result["response"]

        artifact = None

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

    return {
        "session_id": data.session_id,
        "reply": f"You said: {data.message}",
        "artifact": None,
    }