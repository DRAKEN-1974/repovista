import React from "react";

type Contributor = {
  login: string;
  avatar_url: string;
  html_url: string;
  contributions: number;
};

export async function TopContributors({ owner, repo }: { owner: string; repo: string }) {
  const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/contributors?per_page=5`);
  const contributors: Contributor[] = await res.json();

  return (
    <div style={{ marginTop: 30 }}>
      <h3>Top Contributors</h3>
      <div style={{ display: "flex", gap: 20 }}>
        {contributors.map((c) => (
          <a key={c.login} href={c.html_url} target="_blank" style={{ textAlign: "center", color: "#191919", textDecoration: "none" }}>
            <img src={c.avatar_url} alt={c.login} style={{ width: 56, height: 56, borderRadius: 32, border: "2px solid #ececec" }} />
            <div style={{ fontWeight: 600, marginTop: 4 }}>{c.login}</div>
            <div style={{ fontSize: 13, color: "#888" }}>{c.contributions} commits</div>
          </a>
        ))}
      </div>
    </div>
  );
}