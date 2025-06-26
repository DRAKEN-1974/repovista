import React, { useEffect, useState } from "react";

type Contributor = {
  author: string;
  total_commits: number;
  avatar_url?: string;
  html_url?: string;
  total_additions?: number;
  total_deletions?: number;
};

type Props = {
  owner: string;
  repo: string;
  maxContributors?: number;
};

const MEDALS = ["🥇", "🥈", "🥉"];
const BAR_COLORS = ["#ffe156", "#bcc7d9", "#b67a4d"]; // gold, silver, bronze

function getBarColor(idx: number) {
  if (idx < 3) return BAR_COLORS[idx];
  return "linear-gradient(90deg, #4fa3ff 0%, #b4eefd 100%)";
}

export default function ContributorsChart({
  owner,
  repo,
  maxContributors = 15,
}: Props) {
  const [data, setData] = useState<Contributor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch(
      `http://localhost:8000/contributors/stats?owner=${owner}&repo=${repo}`
    )
      .then(async (res) => {
        if (!res.ok) throw new Error("API Error");
        return res.json();
      })
      .then((json) => {
        setData(
          json.map((c: Contributor) => ({
            ...c,
            avatar_url:
              c.avatar_url || `https://github.com/${c.author}.png?size=40`,
            html_url: `https://github.com/${c.author}`,
          }))
        );
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [owner, repo]);

  // Filtering logic for search bar
  const filtered = search
    ? data.filter((c) =>
        c.author.toLowerCase().includes(search.trim().toLowerCase())
      )
    : data;

  // Sort and slice for top N
  const sorted = [...filtered].sort((a, b) => b.total_commits - a.total_commits);
  const chartData = showAll ? sorted : sorted.slice(0, maxContributors);
  const maxCommits = chartData[0]?.total_commits || 1;

  // Calculate stats
  const totalCommits = sorted.reduce((a, c) => a + c.total_commits, 0);

  if (loading)
    return <div className="chart-card">Loading contributors…</div>;
  if (error)
    return <div className="chart-card">Error: {error}</div>;
  if (!data.length)
    return <div className="chart-card">No contributors found.</div>;

  return (
    <div className="chart-card">
      <div className="cc-header">
        <h2 className="cc-title">Top Contributors</h2>
        <div className="cc-meta">
          <span>
            Showing {showAll ? `${sorted.length}` : `top ${maxContributors}`}
          </span>
          <button className="cc-btn" onClick={() => setShowAll((v) => !v)}>
            {showAll ? "Show less" : "Show all"}
          </button>
          <input
            className="cc-search"
            placeholder="Search user"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search contributors"
          />
        </div>
        <div className="cc-legend">
          <span>
            <span className="cc-dot cc-dot-gold" /> #1
          </span>
          <span>
            <span className="cc-dot cc-dot-silver" /> #2
          </span>
          <span>
            <span className="cc-dot cc-dot-bronze" /> #3
          </span>
        </div>
        <div className="cc-stats">
          <span>
            <b>{data.length.toLocaleString()}</b> contributors &bull;{" "}
            <b>{totalCommits.toLocaleString()}</b> total commits
          </span>
        </div>
      </div>
      <div className="cc-list">
        {chartData.map((c, idx) => {
          const barWidth = `${(c.total_commits / maxCommits) * 85 + 8}%`; // min width for visibility
          const nameDisplay =
            c.author.length > 14
              ? c.author.slice(0, 12) + "…"
              : c.author;
          return (
            <a
              key={c.author}
              className="cc-row"
              href={c.html_url}
              target="_blank"
              rel="noopener noreferrer"
              title={c.author}
            >
              <div className="cc-medal">
                {idx < 3 ? MEDALS[idx] : ""}
              </div>
              <img className="cc-avatar" src={c.avatar_url} alt={c.author} />
              <span
                className="cc-name"
                title={c.author.length > 14 ? c.author : undefined}
              >
                {nameDisplay}
              </span>
              <div className="cc-bar-wrap">
                <div
                  className="cc-bar"
                  style={{
                    width: barWidth,
                    background: idx < 3
                      ? BAR_COLORS[idx]
                      : "linear-gradient(90deg, #4fa3ff 0%, #b4eefd 100%)",
                  }}
                >
                  <span className="cc-bar-commits" title={`${c.total_commits} commits`}>
                    {c.total_commits}
                  </span>
                </div>
              </div>
              <span className="cc-actions">
                <button
                  className="cc-profile-btn"
                  title="Open GitHub Profile"
                  onClick={e => {
                    e.preventDefault();
                    window.open(c.html_url, "_blank");
                  }}
                >
                  <svg width="18" height="18" fill="none" viewBox="0 0 16 16"><path fill="#265fa6" d="M8 .5C3.86.5.5 3.86.5 8c0 3.3 2.13 6.1 5.09 7.1.37.07.5-.16.5-.35 0-.17-.01-.63-.01-1.23-2.07.45-2.51-.99-2.51-.99-.34-.87-.83-1.1-.83-1.1-.68-.46.05-.45.05-.45.75.05 1.15.77 1.15.77.67 1.15 1.75.82 2.18.63.07-.49.26-.82.47-1.01-1.65-.19-3.39-.83-3.39-3.72 0-.82.29-1.49.76-2.01-.08-.19-.33-.97.07-2.02 0 0 .62-.2 2.03.77A6.98 6.98 0 0 1 8 4.84c.63.003 1.27.086 1.87.25 1.41-.97 2.03-.77 2.03-.77.4 1.05.16 1.83.08 2.02.48.52.76 1.19.76 2.01 0 2.9-1.75 3.53-3.41 3.72.27.23.51.68.51 1.36 0 .99-.01 1.79-.01 2.03 0 .2.13.43.51.35A7.51 7.51 0 0 0 15.5 8c0-4.14-3.36-7.5-7.5-7.5Z"/></svg>
                </button>
              </span>
            </a>
          );
        })}
        {!chartData.length && (
          <div className="cc-empty">No contributors found.</div>
        )}
      </div>
      <style>{`
        .chart-card {
          background: #fff;
          border-radius: 22px;
          box-shadow: 0 8px 36px #0001;
          padding: 2.3rem 1.2rem 2.3rem 1.2rem;
          margin: 2.5rem auto 1.5rem auto;
          max-width: 540px;
          min-width: 320px;
          color: #222;
        }
        .cc-header {
          text-align: center;
          margin-bottom: 0.7rem;
        }
        .cc-title {
          font-size: 1.62rem;
          font-weight: 800;
          margin: 0 0 0.3rem 0;
          color: #1d2a3a;
        }
        .cc-meta {
          color: #8c9bab;
          font-size: 15px;
          margin-bottom: 10px;
          display: flex;
          gap: 12px;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
        }
        .cc-btn {
          background: #fafdff;
          color: #1d3557;
          border: 1px solid #e3eafd;
          border-radius: 7px;
          padding: 0.15rem 0.8rem;
          cursor: pointer;
          font-size: 14px;
          font-weight: 600;
          transition: background 0.17s;
        }
        .cc-btn:hover { background: #e7f1fd; }
        .cc-search {
          background: #fafdff;
          border: 1.2px solid #e3eafd;
          border-radius: 7px;
          font-size: 14px;
          padding: 0.13rem 0.7rem;
          margin-left: 8px;
          min-width: 105px;
          max-width: 140px;
          outline: none;
          color: #1d3557;
          transition: border 0.16s;
        }
        .cc-search:focus { border: 1.5px solid #4fa3ff; }
        .cc-legend {
          display: flex;
          gap: 18px;
          justify-content: center;
          margin-bottom: 8px;
          font-weight: 500;
          font-size: 13.5px;
        }
        .cc-dot {
          display: inline-block;
          border-radius: 50%;
          width: 11px;
          height: 11px;
          margin-right: 4px;
        }
        .cc-dot-gold { background: #ffe156; border: 1.5px solid #e0c22b;}
        .cc-dot-silver { background: #bcc7d9; border: 1.5px solid #8e9cb7;}
        .cc-dot-bronze { background: #b67a4d; border: 1.5px solid #9e7033;}
        .cc-stats {
          color: #a3adc2;
          font-size: 13.5px;
          margin-bottom: 2px;
        }
        .cc-list {
          display: flex;
          flex-direction: column;
          gap: 0.7rem;
        }
        .cc-row {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          min-height: 48px;
          padding: 0.29rem 0.8rem 0.29rem 0.7rem;
          border-radius: 13px;
          background: none;
          text-decoration: none;
          transition: background 0.15s, box-shadow 0.15s;
          position: relative;
          cursor: pointer;
        }
        .cc-row:hover {
          background: #f6faff;
          box-shadow: 0 2px 12px #eaf1fa;
        }
        .cc-medal {
          width: 2em;
          font-size: 1.18em;
          text-align: center;
          flex-shrink: 0;
          filter: drop-shadow(0 2px 2px #f0eaa1aa);
        }
        .cc-avatar {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          border: 2.4px solid #e6f1ff;
          box-shadow: 0 2px 8px #eaf1fa;
          flex-shrink: 0;
          background: #f3f3fd;
        }
        .cc-name {
          font-size: 1.10em;
          font-weight: 600;
          color: #1d3557;
          margin-left: 0.3em;
          min-width: 70px;
          max-width: 120px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .cc-bar-wrap {
          flex: 1;
          margin: 0 1em 0 1em;
          min-width: 75px;
          display: flex;
          align-items: center;
          position: relative;
        }
        .cc-bar {
          height: 22px;
          border-radius: 10px;
          transition: width 0.33s, background 0.21s;
          opacity: 0.97;
          display: flex;
          align-items: center;
          position: relative;
          min-width: 44px;
          background: linear-gradient(90deg, #4fa3ff 0%, #b4eefd 100%);
          box-shadow: 0 1px 5px #badeff44;
        }
        .cc-bar-commits {
          font-size: 1.04em;
          font-family: monospace;
          color: #1d3557;
          font-weight: bold;
          margin-left: 0.6em;
          letter-spacing: 0.01em;
          text-shadow: 0 1px 7px #fff, 0 0px 2px #b4eefd44;
        }
        .cc-actions {
          display: flex;
          align-items: center;
          margin-left: 8px;
        }
        .cc-profile-btn {
          background: #fafdff;
          border: none;
          border-radius: 7px;
          padding: 3px 6px 2px 6px;
          margin-left: 2px;
          cursor: pointer;
          transition: background 0.17s;
          box-shadow: 0 1px 6px #eaf1fa;
        }
        .cc-profile-btn:hover { background: #e7f1fd; }
        .cc-empty {
          text-align: center;
          color: #bbb;
          padding: 1.2rem 0;
          font-size: 1.13em;
        }
        @media (max-width: 600px) {
          .chart-card { max-width: 98vw; min-width: unset; }
          .cc-row { padding: 0.19rem 0.3rem; }
          .cc-bar-wrap { margin: 0 0.3em 0 0.5em; }
          .cc-name { min-width: 48px; max-width: 68px; font-size: 0.97em; }
        }
      `}</style>
    </div>
  );
}