from fastapi import APIRouter, HTTPException
from services.github import get_contributors

router = APIRouter()

@router.get("/api/{owner}/{repo}/contributors")
async def contributors(owner: str, repo: str):
    try:
        return await get_contributors(owner, repo)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))