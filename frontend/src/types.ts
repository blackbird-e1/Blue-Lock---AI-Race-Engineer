export type Role = 'user' | 'assistant';

export interface Message {
  id: string;
  role: Role;
  content: string;
  timestamp: Date;
  error?: boolean;
  streaming?: boolean;
  toolCalls?: string[];
}

export interface ChatRequest {
  message: string;
  conversation_id?: string;
  history: Array<{ role: Role; content: string }>;
}

export interface ChatResponse {
  answer: string;
  conversation_id: string;
  tool_calls: string[];
}

export interface StreamChunk {
  type: 'delta' | 'tool_call' | 'done' | 'error';
  content: string;
  tool_name?: string | null;
  conversation_id?: string | null;
}

export interface TelemetryPoint {
  time: number;
  speed: number;
  throttle: number;
  brake: number;
  steering: number;
  gear: number;
  rpm: number;
}

export interface TelemetryMetrics {
  rows_processed: number;
  avg_brake: number;
  avg_throttle: number;
  avg_steering_change: number;
  high_rpm_ratio: number;
}

export interface UploadResponse {
  session_id: string;
  rows_processed: number;
  issues_detected: string[];
  summary: string;
  metrics: TelemetryMetrics;
  telemetry: TelemetryPoint[];
}

export interface MetricComparison {
  baseline: number;
  compared: number;
  delta_percent: number;
}

export interface ComparisonResult {
  summary: string;
  comparison: {
    avg_brake: MetricComparison;
    avg_throttle: MetricComparison;
    avg_steering_change: MetricComparison;
    high_rpm_ratio: MetricComparison;
  };
  telemetry_a: TelemetryPoint[];
  telemetry_b: TelemetryPoint[];
}