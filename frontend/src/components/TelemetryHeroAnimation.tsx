export default function TelemetryHeroAnimation() {
  return (
    <div className="telemetry-hero">
      <svg
        viewBox="0 0 1000 120"
        preserveAspectRatio="none"
        className="telemetry-svg"
      >
        <path
          d="
            M 0 60
            L 220 60
            L 250 60
            L 270 40
            L 290 90
            L 310 20
            L 330 75
            L 350 60
            L 1000 60
          "
          className="ecg-line"
        />
      </svg>
    </div>
  );
}