import fastf1


def get_track_layout(race_name: str):
    session = fastf1.get_session(
        2025,
        race_name,
        "R"
    )

    session.load()

    fastest_lap = session.laps.pick_fastest()

    telemetry = fastest_lap.get_telemetry()

    return {
        "x": telemetry["X"].tolist(),
        "y": telemetry["Y"].tolist()
    }