import uvicorn
from fastapi import FastAPI
from router import router as router_crypto
import asyncio
from app import cmc_client, settings





async def lifespan(app: FastAPI):
    #startup
    await cmc_client.init_session()
    yield

    #shutdown
    print("dispose")
    await cmc_client.close_session()

main_app = FastAPI(lifespan=lifespan)
main_app.include_router(router_crypto)


if __name__ == "__main__":
    uvicorn.run(
        "main:main_app",
        host = settings.run.host,
        port = settings.run.port,
        reload= settings.run.reload,
    )

