from datetime import datetime

from fastapi import APIRouter, Query
import fastf1

router = APIRouter(
    prefix="/calendar",
    tags=["calendar"]
)


@router.get("")
def get_calendar():
    current_year = datetime.now().year

    schedule = fastf1.get_event_schedule(current_year)

    races = []
    today = datetime.now().date()

    for _, race in schedule.iterrows():
        event_date = race["EventDate"].date()

        status = (
            "completed"
            if event_date < today
            else "upcoming"
        )

        races.append(
            {
                "race": race["EventName"],
                "date": event_date.strftime("%d %b %Y"),
                "status": status,
                "podium": [],
            }
        )

    return races


@router.get("/podium")
def get_podium(
    race: str = Query(...)
):
    current_year = datetime.now().year

    try:
        session = fastf1.get_session(
            current_year,
            race,
            "R",
        )

        session.load()

        results = session.results.head(3)

        return [
            results.iloc[0]["FullName"],
            results.iloc[1]["FullName"],
            results.iloc[2]["FullName"],
        ]

    except Exception as error:
        print(error)

        return []