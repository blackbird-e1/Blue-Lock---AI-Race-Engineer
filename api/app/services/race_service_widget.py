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
            }