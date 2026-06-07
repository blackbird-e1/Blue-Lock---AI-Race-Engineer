import fastf1
from datetime import datetime
from zoneinfo import ZoneInfo
from datetime import datetime, timedelta

def get_next_race():
    current_year = datetime.now().year

    schedule = fastf1.get_event_schedule(current_year)

    races = schedule[
        schedule["EventFormat"] != "testing"
    ]

    now_utc = datetime.utcnow()
    is_live = False

    for _, race in races.iterrows():

        race_date_utc = race["Session5DateUtc"]

        race_start = race_date_utc

        race_end = (
            race_start +
            timedelta(hours=2)
        )

        if race_start <= now_utc <= race_end:

            race_date_ist = (
                race_start
                .replace(tzinfo=ZoneInfo("UTC"))
                .astimezone(
                    ZoneInfo("Asia/Kolkata")
                )
            )

        if race_date_utc > now_utc:

            race_date_ist = (
                race_date_utc
                .replace(tzinfo=ZoneInfo("UTC"))
                .astimezone(ZoneInfo("Asia/Kolkata"))
            )

            sessions = [
                ("FP1", race["Session1DateUtc"]),
                ("FP2", race["Session2DateUtc"]),
                ("FP3", race["Session3DateUtc"]),
                ("Qualifying", race["Session4DateUtc"]),
                ("Race", race["Session5DateUtc"]),
            ]

            next_session_name = None
            next_session_time_ist = None

            for session_name, session_time in sessions:
                if session_name == "Race":
                    race_start = session_time
                    race_end = race_start + timedelta(hours=2)

                    if race_start <= now_utc <= race_end:
                        is_live = True
                if session_time > now_utc:
                    next_session_name = session_name

                    next_session_time_ist = (
                        session_time
                        .replace(tzinfo=ZoneInfo("UTC"))
                        .astimezone(ZoneInfo("Asia/Kolkata"))
                        .isoformat()
                    )

                    break

            return {
                "race_name": race["EventName"],
                "country": race["Country"],
                "location": race["Location"],
                "race_date_ist": race_date_ist.isoformat(),
                "next_session_name": next_session_name,
                "next_session_time_ist": next_session_time_ist,
                "is_live": is_live
            }