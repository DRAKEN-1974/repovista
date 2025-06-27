import os
import httpx

GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")
GITHUB_API = "https://api.github.com"

async def fetch_dependabot_alerts(owner: str, repo: str):
    """
    Fetch open Dependabot alerts for the specified repository.
    Returns an empty list if forbidden or not found.
    """
    url = f"{GITHUB_API}/repos/{owner}/{repo}/dependabot/alerts"
    headers = {"Accept": "application/vnd.github+json"}
    if GITHUB_TOKEN:
        headers["Authorization"] = f"Bearer {GITHUB_TOKEN}"
    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(url, headers=headers)
            if response.status_code == 200:
                return await response.json()
            # If forbidden (403) or not found (404), just return empty list
            return []
        except Exception:
            return []