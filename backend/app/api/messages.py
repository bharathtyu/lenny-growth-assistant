from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from pydantic import BaseModel

from app.database import get_db
from app.models import Message

router = APIRouter(prefix="/api/messages", tags=["Messages"])


class MessageCreate(BaseModel):
    session_id: int
    role: str
    content: str


@router.post("")
async def create_message(data: MessageCreate, db: AsyncSession = Depends(get_db)):
    message = Message(
        session_id=data.session_id,
        role=data.role,
        content=data.content,
    )

    db.add(message)
    await db.commit()
    await db.refresh(message)

    return message


@router.get("/{session_id}")
async def list_messages(session_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Message)
        .where(Message.session_id == session_id)
        .order_by(Message.created_at)
    )

    return result.scalars().all()