import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  LabelList,
} from "recharts";

type Contributor = {
  author: string;
  total_commits: number;
  avatar_url?: string;
  total_additions?: number;
  total_deletions?: number;
  weeks?: { w: number; a: number; d: number; c: number }[];
};

type Props = {
  owner: string;
  repo: string;
};

const gradientId = "barGradient";

const StatBox = ({
  label,
  value,
  color,
  borderColor,
}: {
  label: string;
  value: string | number;
  color?: string;
  borderColor?: string;
}) => (
  <div
    className="stat-box"
    style={{
      color: color || "#1d3557",
      borderColor: borderColor || "#e3eafd",
    }}
  >
    <div className="stat-label">{label}</div>
    <div className="stat-value">{value}</div>
  </div>
);

const ContributorsChart: React.FC<Props> = ({ owner, repo }) => {
  const [data, setData] = useState<Contributor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [from, setFrom] = useState<string>("");
  const [to, setTo] = useState<string>("");
  const [repoInfo, setRepoInfo] = useState<any>(null);

  // Fetch repo info (forks, stars, etc)
  useEffect(() => {
    fetch(`http://localhost:8000/repo/info?owner=${owner}&repo=${repo}`)
      .then((res) => (res.ok ? res.json() : null))
      .then(setRepoInfo)
      .catch(() => setRepoInfo(null));
  }, [owner, repo]);

  // Build API URL based on date filter
  const getApiUrl = () => {
    let url = `http://localhost:8000/contributors/stats?owner=${owner}&repo=${repo}`;
    if (from) url += `&from_date=${from}`;
    if (to) url += `&to_date=${to}`;
    return url;
  };

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(getApiUrl())
      .then(async (res) => {
        if (!res.ok) throw new Error("API Error");
        return res.json();
      })
      .then((json) => {
        // Compute additions/deletions if not present, using weeks array
        const enriched = json.map((c: Contributor) => {
          if (
            typeof c.total_additions === "number" &&
            typeof c.total_deletions === "number"
          ) {
            return c;
          }
          if (Array.isArray(c.weeks)) {
            return {
              ...c,
              total_additions: c.weeks.reduce((acc, w) => acc + (w.a || 0), 0),
              total_deletions: c.weeks.reduce((acc, w) => acc + (w.d || 0), 0),
            };
          }
          return { ...c, total_additions: 0, total_deletions: 0 };
        });
        setData(enriched);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
    // eslint-disable-next-line
  }, [owner, repo, from, to]);

  if (loading)
    return (
      <div className="chart-card">
        <div className="chart-loading">Loading contributors…</div>
      </div>
    );
  if (error)
    return (
      <div className="chart-card">
        <div className="chart-error">Error: {error}</div>
      </div>
    );
  if (!data.length)
    return (
      <div className="chart-card">
        <div className="chart-empty">
          <span style={{ fontSize: 32 }}>🧐</span>
          <div>No contributors found{from || to ? " for this range" : ""}.</div>
        </div>
      </div>
    );

  // Sort by commits
  const sorted = [...data].sort((a, b) => b.total_commits - a.total_commits);

  // Sum LOC for chart info bar
  const totalAdd = data.reduce((a, c) => a + (c.total_additions || 0), 0);
  const totalDel = data.reduce((a, c) => a + (c.total_deletions || 0), 0);

  return (
    <div className="chart-card">
      <h2 className="chart-title">Project Contribution Overview</h2>
      {/* Repo stats in boxes */}
      {repoInfo && (
        <div className="repo-stats-boxes">
          <StatBox label="Stars" value={repoInfo.stargazers_count} color="#f5b041" borderColor="#f6e6be" />
          <StatBox label="Forks" value={repoInfo.forks_count} color="#5dade2" borderColor="#c7e3fa" />
          <StatBox label="Watchers" value={repoInfo.watchers_count} color="#16a085" borderColor="#b6e8de" />
          <StatBox label="Open Issues" value={repoInfo.open_issues_count} color="#e74c3c" borderColor="#f7c6c6" />
        </div>
      )}
      {/* Date filters */}
      <div className="chart-date-filters">
        <label>
          <span>From:</span>
          <input
            type="date"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            max={to || undefined}
          />
        </label>
        <label>
          <span>To:</span>
          <input
            type="date"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            min={from || undefined}
          />
        </label>
        {(from || to) && (
          <button
            className="chart-clear"
            onClick={() => {
              setFrom("");
              setTo("");
            }}
            aria-label="Clear date filter"
          >
            Clear
          </button>
        )}
      </div>
      {/* Summary of LOC in boxes */}
      <div className="chart-loc-boxes">
        <StatBox
          label="Total Lines Added"
          value={totalAdd.toLocaleString()}
          color="#219150"
          borderColor="#afe8c0"
        />
        <StatBox
          label="Total Lines Deleted"
          value={totalDel.toLocaleString()}
          color="#b31226"
          borderColor="#f8bdbc"
        />
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={sorted}
          margin={{ top: 24, right: 24, left: 16, bottom: 24 }}
        >
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4F8CFF" stopOpacity={0.95} />
              <stop offset="100%" stopColor="#89E4F7" stopOpacity={0.7} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="author"
            tick={false}
            axisLine={false}
            tickLine={false}
            height={60}
          />
          <YAxis
            allowDecimals={false}
            tick={{ fontSize: 13, fill: "#666" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            content={({ active, payload }) =>
              active && payload && payload.length ? (
                <div className="chart-tooltip">
                  <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>
                    {payload[0].payload.author}
                  </div>
                  <div>Commits: <b>{payload[0].payload.total_commits}</b></div>
                  <div>Lines added: <b>{payload[0].payload.total_additions?.toLocaleString() || 0}</b></div>
                  <div>Lines deleted: <b>{payload[0].payload.total_deletions?.toLocaleString() || 0}</b></div>
                </div>
              ) : null
            }
          />
          <Bar
            dataKey="total_commits"
            fill={`url(#${gradientId})`}
            radius={[8, 8, 0, 0]}
            isAnimationActive={true}
          >
            <LabelList
              dataKey="total_commits"
              position="top"
              fontSize={13}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="contributor-boxes-wrap">
        {sorted.map((c, idx) => (
          <div className="contributor-box" key={c.author}>
            <div className="contributor-avatar-wrap">
              <img
                src={
                  c.avatar_url ||
                  `https://github.com/${c.author}.png?size=40`
                }
                alt={c.author}
                className="contributor-avatar-img"
                width={48}
                height={48}
                loading="lazy"
              />
            </div>
            <div className="contributor-box-info">
              <div className="contributor-name">{c.author}</div>
              <div className="contributor-stat-row">
                <span>
                  <span className="box-label">Commits</span>
                  <span className="box-value">{c.total_commits}</span>
                </span>
                <span>
                  <span className="box-label">Added</span>
                  <span className="box-value green">+{c.total_additions?.toLocaleString() || 0}</span>
                </span>
                <span>
                  <span className="box-label">Deleted</span>
                  <span className="box-value red">-{c.total_deletions?.toLocaleString() || 0}</span>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <style>{`
        .chart-card {
          background: var(--card, #fff);
          border-radius: 18px;
          box-shadow: 0 6px 24px #0001;
          padding: 2.5rem 1.5rem 2rem 1.5rem;
          margin: 2.5rem auto;
          max-width: 900px;
          color: var(--text, #222);
          transition: background 0.3s, color 0.3s;
        }
        .chart-title {
          font-size: 1.7rem;
          font-weight: 700;
          margin: 0 0 1.2rem 0;
          text-align: center;
          color: var(--text, #222);
          letter-spacing: 0.01em;
        }
        .repo-stats-boxes {
          display: flex;
          justify-content: center;
          gap: 2.5rem;
          margin-bottom: 1.9rem;
          flex-wrap: wrap;
        }
        .stat-box {
          background: #fafdff;
          border: 2.5px solid;
          border-radius: 16px;
          min-width: 110px;
          min-height: 70px;
          padding: 0.7rem 1.4rem 0.6rem 1.4rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 0.4rem;
          box-shadow: 0 2px 9px #eaf1fa;
          transition: box-shadow 0.18s;
        }
        .stat-box:hover {
          box-shadow: 0 6px 24px #eaf1fa;
        }
        .stat-label {
          font-size: 1.03rem;
          font-weight: 500;
          margin-bottom: 0.1rem;
          color: inherit;
        }
        .stat-value {
          font-size: 1.36rem;
          font-weight: 700;
          color: inherit;
        }
        .chart-loading, .chart-error, .chart-empty {
          text-align: center;
          font-size: 1.1rem;
          padding: 2.5rem 0;
          color: #888;
        }
        .chart-error { color: #e74c3c; }
        .chart-date-filters {
          display: flex;
          justify-content: center;
          gap: 1rem;
          align-items: center;
          margin-bottom: 1.4rem;
        }
        .chart-date-filters label {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 1rem;
        }
        .chart-date-filters input[type="date"] {
          padding: 3px 8px;
          border: 1.5px solid #e2e2e2;
          border-radius: 7px;
          font-size: 1rem;
          background: #f8fafc;
        }
        .chart-clear {
          background: #f3f8ff;
          color: #265fa6;
          border: none;
          border-radius: 6px;
          padding: 0.45rem 1.1rem;
          margin-left: 0.7rem;
          cursor: pointer;
          font-size: 1rem;
          font-weight: 500;
          transition: background 0.18s;
        }
        .chart-clear:hover { background: #dbeafd; }
        .chart-loc-boxes {
          display: flex;
          justify-content: center;
          gap: 2.5rem;
          margin-bottom: 1.1rem;
        }
        .contributor-boxes-wrap {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 1.6rem;
          margin-top: 2.2rem;
        }
        .contributor-box {
          background: #fafdff;
          border: 2px solid #e8eaf3;
          border-radius: 18px;
          min-width: 210px;
          max-width: 250px;
          padding: 1.1rem 1.4rem 1rem 1.4rem;
          box-shadow: 0 2px 10px #eaf1fa;
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 1.1rem;
          transition: box-shadow 0.16s, border 0.16s;
        }
        .contributor-box:hover {
          box-shadow: 0 8px 30px #eaf1fa;
          border-color: #c4e1fa;
        }
        .contributor-avatar-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f4f6fa;
          border-radius: 50%;
          padding: 0.2rem;
          border: 2.5px solid #d6e6fa;
          box-shadow: 0 2px 6px #eaf1fa;
        }
        .contributor-avatar-img {
          border-radius: 50%;
          width: 48px;
          height: 48px;
        }
        .contributor-box-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.15em;
        }
        .contributor-name {
          font-size: 1.13rem;
          font-weight: 700;
          color: #1d3557;
          margin-bottom: 0.12rem;
          word-break: break-all;
        }
        .contributor-stat-row {
          display: flex;
          gap: 1.1em;
          font-size: 0.98rem;
          color: #3b3f4c;
          font-weight: 500;
          flex-wrap: wrap;
        }
        .box-label {
          color: #8c9bab;
          margin-right: 0.25em;
        }
        .box-value {
          font-weight: 600;
          color: #1d3557;
        }
        .box-value.green {
          color: #219150;
        }
        .box-value.red {
          color: #b31226;
        }
        .chart-tooltip {
          background: #fff;
          border: 1.5px solid #eaf1fa;
          border-radius: 12px;
          padding: 0.7rem 1.2rem;
          font-size: 15px;
          color: #265fa6;
          box-shadow: 0 2px 9px #4f8cff11;
        }
        @media (max-width: 900px) {
          .contributor-boxes-wrap {
            gap: 1.1rem;
          }
        }
        @media (max-width: 700px) {
          .chart-card { padding: 0.7rem 0.2rem 0.7rem 0.2rem; }
          .repo-stats-boxes { gap: 1rem; }
          .chart-loc-boxes { gap: 1rem; }
          .contributor-boxes-wrap { gap: 0.7rem; }
        }
        @media (max-width: 480px) {
          .contributor-box {
            min-width: 140px;
            max-width: 98vw;
            padding: 0.7rem 0.7rem 0.7rem 0.7rem;
            flex-direction: column;
            gap: 0.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default ContributorsChart;