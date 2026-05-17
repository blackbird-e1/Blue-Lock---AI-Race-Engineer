from fastapi import APIRouter, HTTPException

from app.models.schemas import ChatRequest, ChatResponse
from app.services.llm import generate_race_engineer_response
from app.services.session_store import get_session


router = APIRouter(prefix="/chat", tags=["chat"])


@router.post("", response_model=ChatResponse)
async def chat(request: ChatRequest) -> ChatResponse:
    session = get_session(request.session_id)

    if not session:
        raise HTTPException(
            status_code=404,
            detail="Telemetry session not found.",
        )

    analysis = session["analysis"]

    answer = await generate_race_engineer_response(
        driver_message=request.message,
        telemetry_summary=analysis["summary"],
        issues=analysis["issues"],
        metrics=analysis["metrics"],
    )

    return ChatResponse(answer=answer)