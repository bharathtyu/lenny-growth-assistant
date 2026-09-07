from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.database import get_db
from app.models.session import Session

router = APIRouter(prefix="/api/sessions", tags=["Sessions"])


class SessionCreate(BaseModel):
    title: str = "New Chat"
    provider: str = "ollama"
    model: str = "llama3"


@router.post("")
async def create_session(
    data: SessionCreate,
    db: AsyncSession = Depends(get_db)
):
    session = Session(
        title=data.title,
        provider=data.provider,
        model=data.model,
    )

    db.add(session)
    await db.commit()
    await db.refresh(session)

    return {
        "id": session.id,
        "title": session.title,
        "provider": session.provider,
        "model": session.model,
        "created_at": session.created_at,
    }


@router.get("")
async def list_sessions(
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(
        select(Session).order_by(Session.created_at.desc())
    )

    sessions = result.scalars().all()

    return [
        {
            "id": s.id,
            "title": s.title,
            "provider": s.provider,
            "model": s.model,
            "created_at": s.created_at,
        }
        for s in sessions
    ]