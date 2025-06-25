from fastapi import APIRouter, HTTPException
from services.github import (
    fetch_repo_info,
    fetch_contributors,
    fetch_languages,
    fetch_issues,
)

router = APIRouter()

@router.get("/{owner}/{repo_name}")
async def get_repo_info(owner: str, repo_name: str):
    """Fetch basic information about a GitHub repository."""
    repo_data = await fetch_repo_info(owner, repo_name)
    if not repo_data:
        raise HTTPException(status_code=404, detail="Repository not found")
    return repo_data

@router.get("/{owner}/{repo_name}/contributors")
async def get_repo_contributors(owner: str, repo_name: str):
    """Fetch contributors for a GitHub repository."""
    contributors = await fetch_contributors(owner, repo_name)
    return contributors

@router.get("/{owner}/{repo_name}/languages")
async def get_repo_languages(owner: str, repo_name: str):
    """Fetch programming languages used in a GitHub repository."""
    languages = await fetch_languages(owner, repo_name)
    return languages

@router.get("/{owner}/{repo_name}/issues")
async def get_repo_issues(owner: str, repo_name: str, state: str = "open"):
    """Fetch issues from a GitHub repository."""
    issues = await fetch_issues(owner, repo_name, state)
    return issues