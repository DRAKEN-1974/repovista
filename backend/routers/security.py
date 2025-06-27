from fastapi import APIRouter, Query
from typing import Any
from backend.services.security import fetch_dependabot_alerts

router = APIRouter()

@router.get("/dependabot")
async def get_security_alerts(
    owner: str = Query(..., description="Repository owner"),
    repo: str = Query(..., description="Repository name")
) -> Any:
    alerts = await fetch_dependabot_alerts(owner, repo)
    return {"alerts": alerts}