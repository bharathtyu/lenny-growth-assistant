from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(prefix="/api/artifact", tags=["Artifact"])

class ArtifactRequest(BaseModel):
    content: str

@router.post("")
async def generate_artifact(data: ArtifactRequest):
    return {
        "type": "markdown",
        "content": data.content
    }