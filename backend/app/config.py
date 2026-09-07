from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    APP_NAME: str = "Lenny Growth Assistant"
    DATABASE_URL: str = "postgresql+asyncpg://postgres:password123@127.0.0.1:5433/lenny_assistant"
    OLLAMA_BASE_URL: str = "http://localhost:11434"
    DEFAULT_PROVIDER: str = "ollama"

    model_config = SettingsConfigDict(
        env_file=".env",
        extra="ignore"
    )


settings = Settings()