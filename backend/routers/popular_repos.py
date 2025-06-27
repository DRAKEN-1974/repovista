from fastapi import APIRouter, Query
from backend.services.github import github_api_request

import datetime

router = APIRouter()

@router.get("/popular")
async def get_popular_repos(
    language: str = Query(None, description="Programming language"),
    per_page: int = Query(10, ge=1, le=50)
):
    # Get repos created in the last year, sorted by stars
    since = (datetime.datetime.utcnow() - datetime.timedelta(days=365)).strftime("%Y-%m-%d")
    q = f"created:>={since}"
    if language:
        q += f" language:{language}"
    params = {
        "q": q,
        "sort": "stars",
        "order": "desc",
        "per_page": per_page
    }
    data = await github_api_request("/search/repositories", params)
    return data.get("items", [])