from datetime import datetime
from zoneinfo import ZoneInfo

from fastapi import APIRouter
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
    today = datetime.now(
        ZoneInfo("Asia/Kolkata")
    ).date()

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

@router.get("/wdc")
def get_wdc():
    current_year = datetime.now().year

    ergast = fastf1.ergast.Ergast()

    standings = ergast.get_driver_standings(
        season=current_year
    )

    df = standings.content[0]

    top_three = []

    for _, driver in df.head(3).iterrows():
        top_three.append(
            {
                "name": (
                    f"{driver['givenName']} "
                    f"{driver['familyName']}"
                ),
                "points": float(driver["points"]),
                "wins": int(driver["wins"])
            }
        )

    return top_three

@router.get("/wcc")
def get_wcc():
    current_year = datetime.now().year

    ergast = fastf1.ergast.Ergast()

    standings = ergast.get_constructor_standings(
        season=current_year
    )

    df = standings.content[0]

    leader = df.iloc[0]

    return {
        "leader": str(leader["constructorName"]),
        "points": float(leader["points"]),
        "wins": int(leader["wins"])
    }