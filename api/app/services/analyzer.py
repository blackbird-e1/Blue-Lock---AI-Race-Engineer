import pandas as pd


def analyze_telemetry(dataframe: pd.DataFrame) -> dict:
    issues = []
    metrics = {}

    metrics["rows_processed"] = len(dataframe)

    avg_brake = dataframe["brake"].mean()
    avg_throttle = dataframe["throttle"].mean()
    avg_steering_change = dataframe["steering"].diff().abs().mean()
    high_rpm_ratio = (dataframe["rpm"] > 11000).mean()

    metrics["avg_brake"] = float(avg_brake)
    metrics["avg_throttle"] = float(avg_throttle)
    metrics["avg_steering_change"] = float(avg_steering_change)
    metrics["high_rpm_ratio"] = float(high_rpm_ratio)

    if avg_brake > 65:
        issues.append("Harsh braking")

    if avg_throttle < 40:
        issues.append("Late throttle pickup")

    if avg_steering_change > 8:
        issues.append("Unstable steering corrections")

    if high_rpm_ratio > 0.25:
        issues.append("Delayed upshifts")

    if not issues:
        issues.append("No major driving issues detected")

    summary = _build_summary(issues)

    return {
        "issues": issues,
        "summary": summary,
        "metrics": metrics,
    }


def _build_summary(issues: list[str]) -> str:
    if "No major driving issues detected" in issues:
        return "Telemetry looks stable with no obvious driving issues."

    return "Detected telemetry concerns: " + ", ".join(issues) + "."