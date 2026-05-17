from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import Field


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    groq_api_key: str = Field(..., alias="GROQ_API_KEY")

    groq_model: str = Field(
        "llama-3.1-8b-instant",
        alias="GROQ_MODEL",
    )

    api_host: str = Field(
        "0.0.0.0",
        alias="API_HOST",
    )

    api_port: int = Field(
        8000,
        alias="API_PORT",
    )

    api_cors_origins: str = Field(
        "http://localhost:5173",
        alias="API_CORS_ORIGINS",
    )

    rate_limit_per_minute: int = Field(
        20,
        alias="RATE_LIMIT_PER_MINUTE",
    )

    env: str = Field(
        "development",
        alias="ENV",
    )

    @property
    def is_production(self) -> bool:
        return self.env == "production"


settings = Settings()