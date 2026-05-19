def calculate_delta(baseline: float, compared: float) -> float:
    if baseline == 0:
        return 0.0

    return round(((compared - baseline) / baseline) * 100, 2)


def compare_metrics(metrics_a: dict, metrics_b: dict) -> dict:
    comparison = {}

    comparison["avg_brake"] = {
        "baseline": metrics_a["avg_brake"],
        "compared": metrics_b["avg_brake"],
        "delta_percent": calculate_delta(
            metrics_a["avg_brake"],
            metrics_b["avg_brake"],
        ),
    }

    comparison["avg_throttle"] = {
        "baseline": metrics_a["avg_throttle"],
        "compared": metrics_b["avg_throttle"],
        "delta_percent": calculate_delta(
            metrics_a["avg_throttle"],
            metrics_b["avg_throttle"],
        ),
    }

    steering_delta = calculate_delta(
        metrics_a["avg_steering_change"],
        metrics_b["avg_steering_change"],
    )

    comparison["avg_steering_change"] = {
        "baseline": metrics_a["avg_steering_change"],
        "compared": metrics_b["avg_steering_change"],
        "delta_percent": steering_delta,
    }

    comparison["high_rpm_ratio"] = {
        "baseline": metrics_a["high_rpm_ratio"],
        "compared": metrics_b["high_rpm_ratio"],
        "delta_percent": calculate_delta(
            metrics_a["high_rpm_ratio"],
            metrics_b["high_rpm_ratio"],
        ),
    }

    summary = build_summary(comparison)

    return {
        "summary": summary,
        "comparison": comparison,
    }


def build_summary(comparison: dict) -> str:
    brake = comparison["avg_brake"]["delta_percent"]
    throttle = comparison["avg_throttle"]["delta_percent"]
    steering = comparison["avg_steering_change"]["delta_percent"]

    if brake > 0:
        brake_text = "more aggressive braking"
    elif brake < 0:
        brake_text = "smoother braking"
    else:
        brake_text = "similar braking"

    if throttle > 0:
        throttle_text = "better throttle application"
    elif throttle < 0:
        throttle_text = "weaker throttle application"
    else:
        throttle_text = "similar throttle application"

    if steering > 0:
        steering_text = "less stable steering"
    elif steering < 0:
        steering_text = "more stable steering"
    else:
        steering_text = "similar steering stability"

    return (
        f"Compared driver shows {brake_text}, "
        f"{throttle_text}, and {steering_text}."
    )