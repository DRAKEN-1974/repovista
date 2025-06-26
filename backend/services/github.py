import httpx
import os
import asyncio

GITHUB_API_URL = "https://api.github.com"

def get_auth_headers():
    token = os.environ.get("GITHUB_TOKEN")
    headers = {"Accept": "application/vnd.github+json"}
    # Use 'token' for classic tokens, 'Bearer' for fine-grained tokens; GitHub accepts either.
    if token:
        headers["Authorization"] = f"token {token}"
    return headers

async def github_api_request(path: str, params: dict = None):
    """
    Make an authenticated GET request to the GitHub API.
    :param path: API path, e.g. '/repos/owner/repo'
    :param params: Optional dictionary of query parameters
    :return: JSON response
    """
    headers = get_auth_headers()
    url = f"{GITHUB_API_URL}{path}" if path.startswith("/") else f"{GITHUB_API_URL}/{path}"
    async with httpx.AsyncClient(timeout=30) as client:
        response = await client.get(url, headers=headers, params=params)
        if response.status_code != 200:
            print("GitHub API ERROR:", response.status_code, response.text)
            print("HEADERS:", response.headers)
        response.raise_for_status()
        return response.json()

async def fetch_repo_info(owner: str, repo_name: str):
    url = f"{GITHUB_API_URL}/repos/{owner}/{repo_name}"
    headers = get_auth_headers()
    async with httpx.AsyncClient(timeout=30) as client:
        response = await client.get(url, headers=headers)
        if response.status_code == 200:
            return response.json()
        return None

async def fetch_contributors(owner: str, repo_name: str):
    url = f"{GITHUB_API_URL}/repos/{owner}/{repo_name}/contributors"
    headers = get_auth_headers()
    async with httpx.AsyncClient(timeout=30) as client:
        response = await client.get(url, headers=headers)
        if response.status_code == 200:
            return response.json()
        return []

async def fetch_languages(owner: str, repo_name: str):
    url = f"{GITHUB_API_URL}/repos/{owner}/{repo_name}/languages"
    headers = get_auth_headers()
    async with httpx.AsyncClient(timeout=30) as client:
        response = await client.get(url, headers=headers)
        if response.status_code == 200:
            return response.json()
        return {}

async def fetch_issues(owner: str, repo_name: str, state: str = "open"):
    url = f"{GITHUB_API_URL}/repos/{owner}/{repo_name}/issues"
    headers = get_auth_headers()
    params = {"state": state}
    async with httpx.AsyncClient(timeout=30) as client:
        response = await client.get(url, headers=headers, params=params)
        if response.status_code == 200:
            return response.json()
        return []

async def fetch_contributor_stats(owner: str, repo_name: str):
    """
    Fetch contributor statistics for a repository, retrying if GitHub responds with 202 (processing).
    Returns a list of contributors with more than 0 commits.
    """
    url = f"{GITHUB_API_URL}/repos/{owner}/{repo_name}/stats/contributors"
    headers = get_auth_headers()
    async with httpx.AsyncClient(timeout=30) as client:
        retries = 0
        while retries < 6:
            response = await client.get(url, headers=headers)
            if response.status_code == 200:
                stats = response.json()
                # Only include contributors with >0 commits
                chart_data = [
                    {
                        "author": c["author"]["login"] if c.get("author") else None,
                        "total_commits": c.get("total", 0),
                        "weeks": c.get("weeks", [])
                    }
                    for c in stats if c.get("author") and c.get("total", 0) > 0
                ]
                return chart_data
            elif response.status_code == 202:
                await asyncio.sleep(2)
                retries += 1
            else:
                break
    return []

async def fetch_commit_activity(owner: str, repo_name: str):
    """
    Fetch commit activity for a repository (weekly commit totals, last 52 weeks).
    Polls GitHub API until data is available or times out.
    """
    url = f"{GITHUB_API_URL}/repos/{owner}/{repo_name}/stats/commit_activity"
    headers = get_auth_headers()
    async with httpx.AsyncClient(timeout=30) as client:
        retries = 0
        while retries < 6:
            response = await client.get(url, headers=headers)
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list) and data:
                    return data
            elif response.status_code != 202:
                break
            await asyncio.sleep(1)
            retries += 1
    return []