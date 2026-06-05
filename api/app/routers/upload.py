import uuid

from fastapi import APIRouter, File, HTTPException, UploadFile

from app.models.schemas import UploadResponse
from app.services.analyzer import analyze_telemetry
from app.services.parser import parse_telemetry_file
from app.services.session_store import save_session


router = APIRouter(prefix="/upload", tags=["upload"])


@router.post("", response_model=UploadResponse)
async def upload_telemetry(file: UploadFile = File(...)) -> UploadResponse:
    try:
        dataframe = await parse_telemetry_file(file)
        analysis = analyze_telemetry(dataframe)

        session_id = str(uuid.uuid4())

        save_session(
            session_id,
            {
                "analysis": analysis,
                "telemetry": dataframe.to_dict(orient="records"),
            },
        )

        return UploadResponse(
            session_id=session_id,
            rows_processed=analysis["metrics"]["rows_processed"],
            issues_detected=analysis["issues"],
            summary=analysis["summary"],
            metrics=analysis["metrics"],
            telemetry=dataframe.to_dict(orient="records"),
        )

    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc))