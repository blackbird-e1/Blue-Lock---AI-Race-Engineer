from pydantic import BaseModel, Field
from typing import Literal


class TelemetryPoint(BaseModel):
    lap: int
    time: float
    speed: float
    throttle: float
    brake: float
    steering: float
    gear: int
    rpm: float
    sector: int

class UploadResponse(BaseModel):
    session_id: str
    rows_processed: int
    issues_detected: list[str]
    summary: str
    metrics: dict[str, float]
    telemetry: list[TelemetryPoint]

class ChatRequest(BaseModel):
    session_id: str = Field(..., min_length=1)
    message: str = Field(..., min_length=1, max_length=2000)


class ChatResponse(BaseModel):
    answer: str


class HealthResponse(BaseModel):
    status: Literal["ok"]

class CompareRequest(BaseModel):
    session_a: str
    session_b: str


class MetricComparison(BaseModel):
    baseline: float
    compared: float
    delta_percent: float

class CompareResponse(BaseModel):
    summary: str
    comparison: dict[str, MetricComparison]
    telemetry_a: list[TelemetryPoint]
    telemetry_b: list[TelemetryPoint]