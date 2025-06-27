from fastapi import APIRouter, HTTPException
import httpx
import os
import asyncio

router = APIRouter()

@router.get("/api/commit-activity")
async def commit_activity(owner: str, repo: str):
    """
    Returns weekly commit activity for the given GitHub repo (last 52 weeks).
    Polls GitHub API until data is returned (max 6 seconds).
    """
    github_token = os.getenv("GITHUB_TOKEN")
    headers = {"User-Agent": "RepoVista"}
    if github_token:
        headers["Authorization"] = f"token {github_token}"

    url = f"https://api.github.com/repos/{owner}/{repo}/stats/commit_activity"
    retries = 0
    while retries < 6:
        async with httpx.AsyncClient() as client:
            resp = await client.get(url, headers=headers, timeout=15)
        # 202 means "processing", [] means "still processing"
        if resp.status_code == 200:
            data = resp.json()
            if isinstance(data, list) and data:  # got real data
                return data
        elif resp.status_code != 202:
            # Not processing, but an error occurred
            raise HTTPException(status_code=resp.status_code, detail=resp.text)
        # Else: status 202 or empty, wait and retry
        await asyncio.sleep(1)
        retries += 1
    raise HTTPException(status_code=202, detail="GitHub is still processing commit activity. Try again in a moment.")