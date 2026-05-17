from groq import AsyncGroq

from app.config import settings


_client = AsyncGroq(api_key=settings.groq_api_key)


async def generate_race_engineer_response(
    driver_message: str,
    telemetry_summary: str,
    issues: list[str],
    metrics: dict,
) -> str:
    prompt = f"""
You are a professional race engineer coaching a driver.

Telemetry summary:
{telemetry_summary}

Detected issues:
{", ".join(issues)}

Metrics:
{metrics}

Driver question:
{driver_message}

Instructions:
- Be concise
- Be technical but beginner-friendly
- Give practical driving advice
- Do not invent telemetry values
"""

    response = await _client.chat.completions.create(
        model=settings.groq_model,
        messages=[
            {
                "role": "system",
                "content": "You are an expert motorsport race engineer.",
            },
            {
                "role": "user",
                "content": prompt,
            },
        ],
        temperature=0.4,
        max_tokens=400,
    )

    return response.choices[0].message.content