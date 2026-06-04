import fastf1
from datetime import datetime
from zoneinfo import ZoneInfo


def get_next_race():
    current_year = datetime.now().year

    schedule = fastf1.get_event_schedule(current_year)

    races = schedule[
        schedule["EventFormat"] != "testing"
    ]

    now_utc = datetime.utcnow()

    for _, race in races.iterrows():

        race_date_utc = race["Session5DateUtc"]

        if race_date_utc > now_utc:

            race_date_ist = (
                race_date_utc
                .replace(tzinfo=ZoneInfo("UTC"))
                .astimezone(ZoneInfo("Asia/Kolkata"))
            )

            return {
                "race_name": race["EventName"],
                "country": race["Country"],
                "location": race["Location"],
                "race_date_ist": race_date_ist.isoformat(),
            }

    return {
        "message": "No upcoming races found"
    }