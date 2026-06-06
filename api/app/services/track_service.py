import fastf1


def get_track_layout():
    session = fastf1.get_session(
        2025,
        "Monaco",
        "R"
    )

    session.load()

    fastest_lap = session.laps.pick_fastest()

    telemetry = fastest_lap.get_telemetry()

    return {
        "x": telemetry["X"].tolist(),
        "y": telemetry["Y"].tolist()
    }