from fastapi import APIRouter
from pydantic import BaseModel
from openai import OpenAI
import os

router = APIRouter(prefix="/api/chat", tags=["Chat"])


class ChatRequest(BaseModel):
    session_id: int
    message: str
    provider: str
    model: str


@router.post("")
async def chat(data: ChatRequest):
    artifact = None

    try:
        # Create OpenAI client inside the function
        client = OpenAI(api_key=os.environ["OPENAI_API_KEY"])

        response = client.chat.completions.create(
            model="gpt-4.1-mini",
            messages=[
                {"role": "user", "content": data.message}
            ],
        )

        reply = response.choices[0].message.content

    except Exception as e:
        reply = f"Error: {str(e)}"

    # Keep your artifact feature
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