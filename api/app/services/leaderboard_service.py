import fastf1
from datetime import datetime


def get_leaderboard(race_name: str):
    try:
        session = fastf1.get_session(
            datetime.now().year,
            race_name,
            "R"
        )

        session.load()

        results = session.results

        leader = results.iloc[0]

        return {
            "leader": leader["Abbreviation"]
        }

    except Exception:
        return {
            "leader": "N/A"
        }