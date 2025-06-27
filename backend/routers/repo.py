from fastapi import APIRouter, HTTPException
from backend.services import github

router = APIRouter()

@router.get("/info")
async def get_repo_info(owner: str, repo: str):
    data = await github.fetch_repo_info(owner, repo)
    if not data:
        raise HTTPException(status_code=404, detail="Repo not found")
    return data

@router.get("/contributors")
async def get_contributors(owner: str, repo: str):
    data = await github.fetch_contributors(owner, repo)
    # Return empty list for zero contributors, don't 404 (lets frontend handle empty state)
    return data or []

@router.get("/languages")
async def get_languages(owner: str, repo: str):
    data = await github.fetch_languages(owner, repo)
    # Return empty dict for zero languages, don't 404 (lets frontend handle empty state)
    return data or {}

# Optional: support /repo/{owner}/{repo}
@router.get("/{owner}/{repo}")
async def get_repo_info_path(owner: str, repo: str):
    data = await github.fetch_repo_info(owner, repo)
    if not data:
        raise HTTPException(status_code=404, detail="Repo not found")
    return data