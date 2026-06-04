from fastapi import APIRouter

from app.services.race_service_widget import get_next_race

router = APIRouter()


@router.get("/next-race")
def next_race():
    return get_next_race()