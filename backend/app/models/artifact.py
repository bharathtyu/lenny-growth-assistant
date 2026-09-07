from sqlalchemy import Column, Integer, String, Text, ForeignKey
from app.database import Base

class Artifact(Base):
    __tablename__ = "artifacts"

    id = Column(Integer, primary_key=True, index=True)
    session_id = Column(Integer, ForeignKey("sessions.id"))
    artifact_type = Column(String, nullable=False)
    content = Column(Text, nullable=False)