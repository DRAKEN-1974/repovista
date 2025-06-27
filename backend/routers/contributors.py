from fastapi import APIRouter, Query
from typing import List, Dict, Any
from backend.services.github import fetch_contributor_stats

router = APIRouter()

@router.get("/stats")
async def get_contributor_stats(
    owner: str = Query(..., description="Repository owner"),
    repo: str = Query(..., description="Repository name")
) -> List[Dict[str, Any]]:
    # fetch_contributor_stats already filters out contributors with 0 commits
    stats = await fetch_contributor_stats(owner, repo)
    # Return as-is; already filtered and structured in service layer
    return stats