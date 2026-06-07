from fastapi import APIRouter
from app.services.driver_service import get_drivers

router = APIRouter(
    prefix="/drivers",
    tags=["drivers"]
)


@router.get("/")
async def drivers(
    race: str
):
    return get_drivers(race)