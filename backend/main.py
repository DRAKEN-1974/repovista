from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.routers import repo, contributors, popular_repos  # Import all routers here

app = FastAPI(
    title="GitHub Repo Analyzer Backend",
    description="API for analyzing GitHub repositories",
    version="0.1.0"
)

# Enable CORS for local frontend dev (adjust origins as needed)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change to ["http://localhost:3000"] for stricter security
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include the routers
app.include_router(repo.router, prefix="/repo", tags=["repo"])
app.include_router(contributors.router, prefix="/contributors", tags=["contributors"])
app.include_router(popular_repos.router, prefix="", tags=["popular"])  # Popular repos endpoints

@app.get("/")
def read_root():
    return {"message": "GitHub Repo Analyzer Backend is running!"}