from pydantic import BaseModel
from pydantic_settings import BaseSettings, SettingsConfigDict


class RunConfig(BaseModel):
    host: str = "0.0.0.0"
    port: int = 8000
    reload: bool = True

class Settings(BaseSettings):
    CMC_API_KEY: str
    run: RunConfig = RunConfig()
    class Config:
        env_file = "../.env"
        env_file_encoding = "utf-8"


settings = Settings()
