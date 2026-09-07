from fastapi import APIRouter
from pydantic import BaseModel
from openai import OpenAI
import os

router = APIRouter(prefix="/api/chat", tags=["Chat"])

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


class ChatRequest(BaseModel):
    session_id: int
    message: str
    provider: str
    model: str


@router.post("")
async def chat(data: ChatRequest):
    artifact = None

    try:
        response = client.chat.completions.create(
            model="gpt-4.1-mini",
            messages=[
                {"role": "user", "content": data.message}
            ],
        )

        reply = response.choices[0].message.content

    except Exception as e:
        reply = f"Error: {str(e)}"

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