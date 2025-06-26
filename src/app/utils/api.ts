export async function fetchRepoInfo(owner: string, repo: string) {
  const res = await fetch(`http://localhost:8000/repo/info?owner=${owner}&repo=${repo}`);
  if (!res.ok) throw new Error("Repository not found");
  return res.json();
}

export async function fetchContributors(owner: string, repo: string) {
  const res = await fetch(`http://localhost:8000/repo/contributors?owner=${owner}&repo=${repo}`);
  if (!res.ok) throw new Error("Contributors not found");
  return res.json();
}

export async function fetchLanguages(owner: string, repo: string) {
  const res = await fetch(`http://localhost:8000/repo/languages?owner=${owner}&repo=${repo}`);
  if (!res.ok) throw new Error("Languages not found");
  return res.json();
}