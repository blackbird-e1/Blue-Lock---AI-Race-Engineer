import pandas as pd
import numpy as np


def analyze_lap(telemetry_data):
    df = pd.DataFrame(telemetry_data)

    # -----------------------------
    # Basic Metrics
    # -----------------------------
    top_speed = int(df["speed"].max())

    lap_times = (
        df.groupby("lap")["time"]
        .max()
        .to_dict()
    )

    lap_values = list(lap_times.values())

    fastest_lap = min(lap_values)

    avg_lap_time = sum(lap_values) / len(lap_values)

    lap_std = float(np.std(lap_values))

    consistency = max(
        0,
        min(
            100,
            int(100 - (lap_std / avg_lap_time * 100))
        ),
    )

    # -----------------------------
    # Insights
    # -----------------------------
    steering_std = float(df["steering"].std())

    insights = []

    if df["brake"].max() > 80:
        insights.append(
            "Heavy braking detected — braking zones can be optimized."
        )

    if df["throttle"].mean() < 70:
        insights.append(
            "Throttle application is conservative — earlier acceleration possible."
        )

    if steering_std > 3:
        insights.append(
            "Steering consistency drops in technical sections."
        )

    # Sector-based insights
    sector_brakes = (
        df.groupby("sector")["brake"]
        .mean()
        .to_dict()
    )

    worst_sector = max(
        sector_brakes,
        key=sector_brakes.get,
    )

    insights.append(
        f"Highest braking load observed in Sector {worst_sector}."
    )

    if len(insights) == 0:
        insights.append(
            "Driver inputs look stable across all laps."
        )

    # -----------------------------
    # Lap Comparison
    # Compare Lap 1 vs Lap 2
    # -----------------------------
    comparison_data = []

    available_laps = sorted(df["lap"].unique())

    if len(available_laps) >= 2:
        lap_a = df[df["lap"] == available_laps[0]].reset_index(drop=True)
        lap_b = df[df["lap"] == available_laps[1]].reset_index(drop=True)

        max_rows = min(len(lap_a), len(lap_b))

        for i in range(max_rows):
            comparison_data.append(
                {
                    "time": float(lap_a.iloc[i]["time"]),
                    "lapA": float(lap_a.iloc[i]["speed"]),
                    "lapB": float(lap_b.iloc[i]["speed"]),
                }
            )

    # Fallback if only one lap exists
    else:
        for _, row in df.iterrows():
            comparison_data.append(
                {
                    "time": float(row["time"]),
                    "lapA": float(row["speed"]),
                    "lapB": float(row["speed"]),
                }
            )

    # -----------------------------
    # Response
    # -----------------------------
    return {
        "stats": {
            "fastestLap": f"{fastest_lap:.2f}s",
            "avgLapTime": f"{avg_lap_time:.2f}s",
            "topSpeed": top_speed,
            "consistency": consistency,
        },
        "comparisonData": comparison_data,
        "insights": insights,
    }