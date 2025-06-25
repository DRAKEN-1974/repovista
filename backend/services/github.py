import httpx
import os

GITHUB_API_URL = "https://api.github.com"

def get_auth_headers():
    token = os.environ.get("GITHUB_TOKEN")
    headers = {"Accept": "application/vnd.github+json"}
    if token:
        headers["Authorization"] = f"Bearer {token}"
    return headers

async def fetch_repo_info(owner: str, repo_name: str):
    url = f"{GITHUB_API_URL}/repos/{owner}/{repo_name}"
    headers = get_auth_headers()
    async with httpx.AsyncClient() as client:
        response = await client.get(url, headers=headers)
        if response.status_code == 200:
            return response.json()
        return None

async def fetch_contributors(owner: str, repo_name: str):
    url = f"{GITHUB_API_URL}/repos/{owner}/{repo_name}/contributors"
    headers = get_auth_headers()
    async with httpx.AsyncClient() as client:
        response = await client.get(url, headers=headers)
        if response.status_code == 200:
            return response.json()
        return []

async def fetch_languages(owner: str, repo_name: str):
    url = f"{GITHUB_API_URL}/repos/{owner}/{repo_name}/languages"
    headers = get_auth_headers()
    async with httpx.AsyncClient() as client:
        response = await client.get(url, headers=headers)
        if response.status_code == 200:
            return response.json()
        return {}

async def fetch_issues(owner: str, repo_name: str, state: str = "open"):
    url = f"{GITHUB_API_URL}/repos/{owner}/{repo_name}/issues"
    headers = get_auth_headers()
    params = {"state": state}
    async with httpx.AsyncClient() as client:
        response = await client.get(url, headers=headers, params=params)
        if response.status_code == 200:
            return response.json()
        return []