from fastapi import APIRouter
from app.services.track_service import get_track_layout

router = APIRouter(
    prefix="/track",
    tags=["track"]
)


@router.get("/layout")
async def track_layout():
    return get_track_layout()