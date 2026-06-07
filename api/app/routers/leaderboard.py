from fastapi import APIRouter

from app.services.leaderboard_service import (
    get_leaderboard,
)

router = APIRouter(
    prefix="/leaderboard",
    tags=["leaderboard"],
)


@router.get("/")
async def leaderboard(
    race: str
):
    return get_leaderboard(race)