const BASE_URL = "http://localhost:8000";

export async function fetchRepoInfo(owner: string, repo: string) {
  const res = await fetch(`${BASE_URL}/repo/${owner}/${repo}`);
  if (!res.ok) throw new Error("Repo not found");
  return res.json();
}

export async function fetchContributors(owner: string, repo: string) {
  const res = await fetch(`${BASE_URL}/repo/${owner}/${repo}/contributors`);
  return res.json();
}

export async function fetchLanguages(owner: string, repo: string) {
  const res = await fetch(`${BASE_URL}/repo/${owner}/${repo}/languages`);
  return res.json();
}