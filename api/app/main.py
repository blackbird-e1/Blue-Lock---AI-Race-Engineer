import logging

from fastapi import FastAPI, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from slowapi import _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded

from app.config import settings
from app.limiter import limiter
from app.routers.chat import router as chat_router
from app.routers.health import router as health_router
from app.routers.upload import router as upload_router
from app.routers.lap import router as lap_router
from app.routers.compare import router as compare_router
from app.routers.race_widget import router as race_widget_router
from app.routers.calendar import router as calendar_router
from app.routers.track import router as track_router

logging.basicConfig(
    level=logging.DEBUG if not settings.is_production else logging.INFO,
    format="%(asctime)s %(levelname)s %(name)s - %(message)s",
)

logger = logging.getLogger(__name__)


app = FastAPI(
    title="AI Race Engineer API",
    description="Telemetry upload race engineer backend",
    version="1.0.0",
    docs_url=None if settings.is_production else "/docs",
    redoc_url=None if settings.is_production else "/redoc",
)


app.state.limiter = limiter
app.add_exception_handler(
    RateLimitExceeded,
    _rate_limit_exceeded_handler,
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        origin.strip()
        for origin in settings.api_cors_origins.split(",")
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(health_router)
app.include_router(upload_router, prefix="/api/v1")
app.include_router(chat_router, prefix="/api/v1")
app.include_router(lap_router, prefix="/api/v1")
app.include_router(compare_router, prefix="/api/v1")
app.include_router(race_widget_router, prefix="/api/v1")
app.include_router(calendar_router, prefix="/api/v1")
app.include_router(track_router, prefix="/api/v1")

@app.exception_handler(Exception)
async def unhandled_exception_handler(request: Request, exc: Exception):
    logger.error("Unhandled exception: %s", exc, exc_info=True)

    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={"detail": "Internal server error."},
    )