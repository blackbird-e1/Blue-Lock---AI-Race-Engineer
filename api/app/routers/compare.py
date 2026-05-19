from fastapi import APIRouter, HTTPException

from app.models.schemas import (
    CompareRequest,
    CompareResponse,
)
from app.services.comparator import compare_metrics
from app.services.session_store import get_session


router = APIRouter(prefix="/compare", tags=["compare"])


@router.post("", response_model=CompareResponse)
async def compare_sessions(
    request: CompareRequest,
) -> CompareResponse:
    session_a = get_session(request.session_a)
    session_b = get_session(request.session_b)

    if not session_a:
        raise HTTPException(
            status_code=404,
            detail="Baseline session not found.",
        )

    if not session_b:
        raise HTTPException(
            status_code=404,
            detail="Comparison session not found.",
        )

    metrics_a = session_a["analysis"]["metrics"]
    metrics_b = session_b["analysis"]["metrics"]

    result = compare_metrics(metrics_a, metrics_b)

    return CompareResponse(
        summary=result["summary"],
        comparison=result["comparison"],
    )