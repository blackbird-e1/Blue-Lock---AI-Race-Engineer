import fastf1

from datetime import datetime, timedelta
from zoneinfo import ZoneInfo


def get_next_race():
    current_year = datetime.now().year

    schedule = fastf1.get_event_schedule(
        current_year
    )

    races = schedule[
        schedule["EventFormat"] != "testing"
    ]

    now_utc = datetime.utcnow()

    # -------------------------
    # Check if any session is LIVE
    # -------------------------
    for _, race in races.iterrows():

        sessions = [
            ("FP1", race["Session1DateUtc"]),
            ("FP2", race["Session2DateUtc"]),
            ("FP3", race["Session3DateUtc"]),
            ("Qualifying", race["Session4DateUtc"]),
            ("Race", race["Session5DateUtc"]),
        ]

        for session_name, session_time in sessions:

            if session_time is None:
                continue

            session_start = session_time

            if session_name == "Race":
                session_end = (
                    session_start +
                    timedelta(hours=2)
                )
            else:
                session_end = (
                    session_start +
                    timedelta(hours=1)
                )

            if (
                session_start
                <= now_utc
                <= session_end
            ):
                race_date_ist = (
                    race["Session5DateUtc"]
                    .replace(
                        tzinfo=ZoneInfo("UTC")
                    )
                    .astimezone(
                        ZoneInfo("Asia/Kolkata")
                    )
                )

                return {
                    "race_name": race["EventName"],
                    "country": race["Country"],
                    "location": race["Location"],
                    "race_date_ist": race_date_ist.isoformat(),
                    "next_session_name": session_name,
                    "next_session_time_ist": (
                        session_start
                        .replace(
                            tzinfo=ZoneInfo("UTC")
                        )
                        .astimezone(
                            ZoneInfo("Asia/Kolkata")
                        )
                        .isoformat()
                    ),
                    "is_live": True
                }

    # -------------------------
    # No live session found
    # Return next upcoming session
    # -------------------------
    for _, race in races.iterrows():

        sessions = [
            ("FP1", race["Session1DateUtc"]),
            ("FP2", race["Session2DateUtc"]),
            ("FP3", race["Session3DateUtc"]),
            ("Qualifying", race["Session4DateUtc"]),
            ("Race", race["Session5DateUtc"]),
        ]

        for session_name, session_time in sessions:

            if (
                session_time is not None
                and session_time > now_utc
            ):
                race_date_ist = (
                    race["Session5DateUtc"]
                    .replace(
                        tzinfo=ZoneInfo("UTC")
                    )
                    .astimezone(
                        ZoneInfo("Asia/Kolkata")
                    )
                )

                return {
                    "race_name": race["EventName"],
                    "country": race["Country"],
                    "location": race["Location"],
                    "race_date_ist": race_date_ist.isoformat(),
                    "next_session_name": session_name,
                    "next_session_time_ist": (
                        session_time
                        .replace(
                            tzinfo=ZoneInfo("UTC")
                        )
                        .astimezone(
                            ZoneInfo("Asia/Kolkata")
                        )
                        .isoformat()
                    ),
                    "is_live": False
                }

    return {
        "error": "No races found"
    }