from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.database import engine, Base
from app.models import Session, Message, Artifact
from app.api.sessions import router as session_router
from app.api.chat import router as chat_router
from app.api.messages import router as message_router
from app.api import artifact

app = FastAPI(title=settings.APP_NAME)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def startup():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)


app.include_router(session_router)
app.include_router(chat_router)
app.include_router(message_router)
app.include_router(artifact.router)

@app.get("/")
async def root():
    return {"message": "Lenny Growth Assistant Backend is running"}


@app.get("/api/health")
async def health():
    return {
        "status": "healthy",
        "database": "connected",
        "ollama": "pending",
        "provider": settings.DEFAULT_PROVIDER,
    }