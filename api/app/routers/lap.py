from fastapi import APIRouter, HTTPException

from app.services.lap_analyzer import analyze_lap
from app.services.session_store import get_session

router = APIRouter(prefix="/lap")


@router.get("/analysis/{session_id}")
def get_lap_analysis(session_id: str):

    session = get_session(session_id)

    if session is None:
        raise HTTPException(
            status_code=404,
            detail="Session not found",
        )

    telemetry = session["telemetry"]

    return analyze_lap(telemetry)