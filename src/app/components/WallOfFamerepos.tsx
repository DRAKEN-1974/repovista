import React, { useEffect, useState } from "react";

type Repo = {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  owner: { login: string; avatar_url: string };
  language?: string;
};

const getRankLabel = (idx: number) => {
  if (idx === 0) return <div className="rank-label first">1st</div>;
  if (idx === 1) return <div className="rank-label second">2nd</div>;
  if (idx === 2) return <div className="rank-label third">3rd</div>;
  return null;
};

const getTileClass = (idx: number) => {
  if (idx === 0) return "fame-tile first";
  if (idx === 1) return "fame-tile second";
  if (idx === 2) return "fame-tile third";
  return "fame-tile";
};

const WallOfFameRepos: React.FC<{ refreshInterval?: number; perPage?: number }> = ({
  refreshInterval = 15000,
  perPage = 12,
}) => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRepos = () => {
    setLoading(true);
    fetch(`http://localhost:8000/popular?per_page=${perPage}`)
      .then(res => res.json())
      .then(data => {
        setRepos(Array.isArray(data) ? data : Array.isArray(data.items) ? data.items : []);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchRepos();
    const interval = setInterval(fetchRepos, refreshInterval);
    return () => clearInterval(interval);
  }, [refreshInterval, perPage]);

  return (
    <div className="repo-wall-bg">
      <h2 className="repo-wall-title">Wall of Fame: Trending GitHub Repositories</h2>
      <div className="repo-wall-grid">
        {loading ? (
          <div className="repo-wall-loading">Loading...</div>
        ) : (
          repos.map((repo, idx) => (
            <a
              className={getTileClass(idx) + " repo-wall-fadein repo-wall-link"}
              href={repo.html_url}
              key={repo.id}
              target="_blank"
              rel="noopener noreferrer"
              style={{ animationDelay: `${0.05 * idx}s` }}
              title={`${repo.full_name} - ${repo.stargazers_count} stars`}
            >
              {getRankLabel(idx)}
              <div className="repo-wall-avatar-row">
                <img
                  className="repo-wall-avatar"
                  src={repo.owner.avatar_url}
                  alt={repo.owner.login}
                  width={46}
                  height={46}
                  loading="lazy"
                />
                <div className="repo-wall-owner">{repo.owner.login}</div>
              </div>
              <div className="repo-wall-name">{repo.name}</div>
              <div className="repo-wall-desc">{repo.description}</div>
              <div className="repo-wall-meta">
                <span title="Stars">★ {repo.stargazers_count}</span>
                <span title="Forks">⎇ {repo.forks_count}</span>
                {repo.language && <span title="Language">{repo.language}</span>}
              </div>
            </a>
          ))
        )}
      </div>
      <style>{`
        .repo-wall-bg {
          margin-top: 56px;
          padding: 2.3rem 1rem 2.5rem 1rem;
          background: #111;
          border-radius: 2rem;
          box-shadow: 0 12px 44px #0007;
        }
        .repo-wall-title {
          font-size: 2.2rem;
          font-weight: 900;
          text-align: center;
          color: #fff;
          letter-spacing: 0.03em;
          margin-bottom: 2.1rem;
          text-shadow: 0 3px 20px #000;
        }
        .repo-wall-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 2.3rem 1.3rem;
          justify-items: stretch;
        }
        .repo-wall-link {
          text-decoration: none !important;
          color: inherit !important;
          box-shadow: none !important;
        }
        .fame-tile {
          position: relative;
          display: flex;
          flex-direction: column;
          background: rgba(23,23,23,0.92);
          border-radius: 1.6em;
          padding: 1.4em 1.2em 1.2em 1.2em;
          box-shadow: 0 4px 32px #000c;
          border: 1.8px solid #222;
          min-height: 210px;
          transition: 
            transform 0.17s, 
            box-shadow 0.19s,
            border-color 0.22s, 
            background 0.22s;
          cursor: pointer;
          outline: none;
          overflow: hidden;
        }
        .fame-tile:hover, .fame-tile:focus {
          transform: scale(1.045) translateY(-4px);
          box-shadow: 0 10px 36px #fff8, 0 4px 0 #222b;
          background: #181818;
          border-color: #fff2;
          z-index: 2;
        }
        .fame-tile.first {
          border: 2.5px solid #fff;
          background: linear-gradient(120deg, #191919, #232323 90%, #fff1 100%);
        }
        .fame-tile.second {
          border: 2.5px solid #cfcfcf;
          background: linear-gradient(120deg, #191919 70%, #bbb2 100%);
        }
        .fame-tile.third {
          border: 2.5px solid #b8a98e;
          background: linear-gradient(120deg, #191919 70%, #b8a98e22 100%);
        }
        .repo-wall-avatar-row {
          display: flex;
          align-items: center;
          gap: 0.7em;
          margin-bottom: 0.7em;
        }
        .repo-wall-avatar {
          border-radius: 50%;
          border: 2.5px solid #fff;
          box-shadow: 0 2px 10px #000a;
          background: #222;
        }
        .repo-wall-owner {
          font-size: 1.07em;
          font-weight: 700;
          color: #fff;
          letter-spacing: 0.01em;
          text-shadow: 0 1px 8px #0008;
        }
        .repo-wall-name {
          font-size: 1.45em;
          font-weight: 800;
          color: #fff;
          margin-bottom: 0.19em;
          text-align: left;
          letter-spacing: 0.01em;
        }
        .repo-wall-desc {
          font-size: 1.06em;
          color: #ececec;
          margin-bottom: 0.31em;
          text-align: left;
          min-height: 2.2em;
          line-height: 1.28;
        }
        .repo-wall-meta {
          font-size: 1em;
          display: flex;
          gap: 1.1em;
          align-items: center;
          color: #fff;
          margin-top: auto;
          font-weight: 600;
        }
        .repo-wall-loading {
          color: #fff;
          font-size: 1.3em;
          grid-column: 1 / -1;
          text-align: center;
        }
        .repo-wall-fadein {
          opacity: 0;
          transform: translateY(20px) scale(0.96);
          animation: repoWallFadein 0.55s cubic-bezier(.61,.01,.46,1.27) forwards;
        }
        @keyframes repoWallFadein {
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .rank-label {
          position: absolute;
          top: 14px;
          right: 12px;
          font-size: 1.15em;
          font-weight: 900;
          padding: 0.22em 0.7em;
          border-radius: 1.2em;
          letter-spacing: 0.04em;
          background: #fff;
          color: #111;
          box-shadow: 0 2px 12px #0005;
          z-index: 4;
          border: 2px solid transparent;
          text-decoration: none !important;
        }
        .rank-label.first {
          background: #fff;
          color: #111;
          border-color: #fff;
        }
        .rank-label.second {
          background: #e1e1e1;
          color: #222;
          border-color: #cfcfcf;
        }
        .rank-label.third {
          background: #b8a98e;
          color: #fff;
          border-color: #b8a98e;
        }
        @media (max-width: 700px) {
          .repo-wall-bg { margin-top: 32px; padding: 1.1rem 0.1rem 1.2rem 0.1rem; }
          .repo-wall-title { font-size: 1.3rem; }
          .repo-wall-grid { gap: 1rem 0.4rem; }
        }
      `}</style>
    </div>
  );
};

export default WallOfFameRepos;