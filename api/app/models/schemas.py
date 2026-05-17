from pydantic import BaseModel, Field
from typing import Literal


class UploadResponse(BaseModel):
    session_id: str
    rows_processed: int
    issues_detected: list[str]
    summary: str


class ChatRequest(BaseModel):
    session_id: str = Field(..., min_length=1)
    message: str = Field(..., min_length=1, max_length=2000)


class ChatResponse(BaseModel):
    answer: str


class HealthResponse(BaseModel):
    status: Literal["ok"]