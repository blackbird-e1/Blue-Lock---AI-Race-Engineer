from typing import Any


_sessions: dict[str, dict[str, Any]] = {}


def save_session(session_id: str, data: dict[str, Any]) -> None:
    _sessions[session_id] = data


def get_session(session_id: str) -> dict[str, Any] | None:
    return _sessions.get(session_id)


def delete_session(session_id: str) -> None:
    if session_id in _sessions:
        del _sessions[session_id]