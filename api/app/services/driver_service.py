import fastf1


def get_drivers(race_name: str):

    session = fastf1.get_session(
        2025,
        race_name,
        "R"
    )

    session.load()

    results = session.results

    return {
        "drivers": results["Abbreviation"].tolist()
    }