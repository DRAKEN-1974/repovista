import React, { useEffect, useState } from "react";

type Repo = {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  owner: { login: string; avatar_url: string; };
  language?: string;
};

const PopularRepos: React.FC<{ language?: string; perPage?: number }> = ({ language, perPage = 8 }) => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(
      `http://localhost:8000/popular?${language ? `language=${language}&` : ""}per_page=${perPage}`
    )
      .then(res => res.json())
      .then(setRepos)
      .finally(() => setLoading(false));
  }, [language, perPage]);

  return (
    <div className="popular-repos-card">
      <h2 className="popular-title">Most Popular Repositories</h2>
      {loading ? (
        <div className="popular-loading">Loading repositories…</div>
      ) : (
        <div className="popular-repo-list">
          {repos.map(repo => (
            <a className="popular-repo-item" href={repo.html_url} key={repo.id} target="_blank" rel="noopener noreferrer">
              <img className="popular-repo-avatar" src={repo.owner.avatar_url} alt={repo.owner.login} width={36} height={36} />
              <div className="popular-repo-info">
                <div className="popular-repo-name">{repo.full_name}</div>
                <div className="popular-repo-desc">{repo.description}</div>
                <div className="popular-repo-meta">
                  <span>⭐ {repo.stargazers_count}</span>
                  <span>🍴 {repo.forks_count}</span>
                  {repo.language && <span>{repo.language}</span>}
                </div>
              </div>
            </a>
          ))}
        </div>
      )}
      <style>{`
        .popular-repos-card {
          background: var(--card, #fff);
          border-radius: 16px;
          box-shadow: 0 3px 12px #0001;
          padding: 2rem 1.3rem 1.2rem 1.3rem;
          margin: 2rem auto;
          max-width: 750px;
        }
        .popular-title {
          font-size: 1.3rem;
          font-weight: 700;
          margin-bottom: 1.3rem;
        }
        .popular-loading {
          color: #888;
          text-align: center;
          padding: 1.5rem 0;
        }
        .popular-repo-list {
          display: flex;
          flex-wrap: wrap;
          gap: 1.2rem;
        }
        .popular-repo-item {
          display: flex;
          align-items: flex-start;
          gap: 0.8rem;
          background: #fafdff;
          border-radius: 12px;
          box-shadow: 0 2px 8px #eaf1fa;
          padding: 0.9rem 1.2rem;
          flex: 1 1 340px;
          min-width: 240px;
          text-decoration: none;
          color: inherit;
          border: 1.5px solid #eaf1fa;
          transition: box-shadow 0.16s, border 0.16s;
        }
        .popular-repo-item:hover {
          box-shadow: 0 6px 25px #e0ebfa;
          border-color: #b8dfff;
        }
        .popular-repo-avatar {
          border-radius: 50%;
          border: 2px solid #e3eafd;
          background: #f4f6fa;
        }
        .popular-repo-info {
          flex: 1;
        }
        .popular-repo-name {
          font-size: 1.07rem;
          font-weight: 600;
          color: #234a63;
          margin-bottom: 0.07em;
        }
        .popular-repo-desc {
          font-size: 0.97rem;
          color: #3b3f4c;
          margin-bottom: 0.23em;
          min-height: 20px;
        }
        .popular-repo-meta {
          font-size: 0.93rem;
          color: #6c7e95;
          display: flex;
          gap: 1.1em;
          align-items: center;
        }
        @media (max-width: 700px) {
          .popular-repo-list { flex-direction: column; gap: 0.7rem; }
          .popular-repo-item { min-width: 0; }
        }
      `}</style>
    </div>
  );
};

export default PopularRepos;