import React from "react";

// GitHub-like language colors
const LANGUAGE_COLORS: { [key: string]: string } = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  Java: "#b07219",
  Go: "#00ADD8",
  HTML: "#e34c26",
  CSS: "#563d7c",
  C: "#555555",
  "C++": "#f34b7d",
  "C#": "#178600",
  Rust: "#dea584",
  Shell: "#89e051",
  SCSS: "#c6538c",
  Sass: "#a53b70",
  PHP: "#4F5D95",
  Swift: "#ffac45",
  Kotlin: "#A97BFF",
  MDX: "#1B1F22",
  Dockerfile: "#384d54",
  Batchfile: "#C1F12E",
  WebAssembly: "#6250E7",
  Pug: "#A86454",
  // fallback color for unknowns
};

function getLangColor(lang: string, i: number) {
  return LANGUAGE_COLORS[lang] || `hsl(${i * 47 % 360},75%,65%)`;
}

function formatBytes(n: number) {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / 1024 / 1024).toFixed(1)} MB`;
}

interface LanguagesProps {
  languages: { [key: string]: number };
}

export default function Languages({ languages }: LanguagesProps) {
  if (!languages || Object.keys(languages).length === 0)
    return (
      <section className="lang-card">
        <h2>Languages</h2>
        <div className="lang-empty">No language data available.</div>
        <style>{`
          .lang-card {
            background: #fff;
            border-radius: 20px;
            box-shadow: 0 8px 36px #e7eefa;
            padding: 2.1rem 1.5rem 1.5rem 1.5rem;
            margin: 2rem auto;
            max-width: 520px;
            min-width: 260px;
          }
          .lang-empty {
            color: #b8b8c0;
            text-align: center;
            padding: 1.2rem 0 0.9rem 0;
            font-size: 1.1rem;
          }
        `}</style>
      </section>
    );

  const total = Object.values(languages).reduce((a, b) => a + b, 0);
  const sortedEntries = Object.entries(languages).sort((a, b) => b[1] - a[1]);

  // For bonus pie avatar (optional)
  const top5 = sortedEntries.slice(0, 5);
  const pieData = top5.map(([, bytes]) => bytes);
  const pieAngles = pieData.reduce<{ start: number; end: number; color: string }[]>(
    (acc, val, i) => {
      const prevEnd = acc[i - 1]?.end ?? 0;
      const angle = 360 * (val / total);
      acc.push({
        start: prevEnd,
        end: prevEnd + angle,
        color: getLangColor(top5[i][0], i),
      });
      return acc;
    },
    []
  );

  return (
    <section className="lang-card">
      <h2>
        Languages
        <span className="lang-pie-avatar" title="Top 5 languages">
          <svg width={34} height={34} viewBox="0 0 34 34">
            {pieAngles.map((arc, idx) => {
              const r = 17, cx = 17, cy = 17;
              const startAngle = (arc.start - 90) * (Math.PI / 180);
              const endAngle = (arc.end - 90) * (Math.PI / 180);
              const x1 = cx + r * Math.cos(startAngle);
              const y1 = cy + r * Math.sin(startAngle);
              const x2 = cx + r * Math.cos(endAngle);
              const y2 = cy + r * Math.sin(endAngle);
              const largeArc = arc.end - arc.start > 180 ? 1 : 0;
              return (
                <path
                  key={idx}
                  d={`M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${largeArc} 1 ${x2},${y2} Z`}
                  fill={arc.color}
                  stroke="#fff"
                  strokeWidth={0.5}
                />
              );
            })}
          </svg>
        </span>
      </h2>
      <div className="lang-stacked-bar" title="Language usage distribution">
        {sortedEntries.map(([lang, bytes], i) => (
          <span
            key={lang}
            className="lang-bar-segment"
            style={{
              width: `${(bytes / total) * 100}%`,
              background: getLangColor(lang, i),
              borderRadius:
                i === 0
                  ? "12px 0 0 12px"
                  : i === sortedEntries.length - 1
                  ? "0 12px 12px 0"
                  : "0",
              transition: "width 0.5s cubic-bezier(.4,2.2,.2,1)"
            }}
            title={`${lang}: ${formatBytes(bytes)}`}
          />
        ))}
      </div>
      <ul className="lang-list">
        {sortedEntries.map(([lang, bytes], i) => (
          <li key={lang} className="lang-li">
            <span
              className="lang-dot"
              style={{ background: getLangColor(lang, i) }}
              title={lang}
            />
            <span className="lang-name" title={lang}>
              {i === 0 && <span className="lang-crown" title="Most used">👑</span>}
              {lang}
            </span>
            <span className="lang-percent">
              {((bytes / total) * 100).toFixed(1)}%
            </span>
            <span className="lang-bytes">{formatBytes(bytes)}</span>
          </li>
        ))}
      </ul>
      <style>{`
        .lang-card {
          background: #fff;
          border-radius: 20px;
          box-shadow: 0 8px 36px #e7eefa;
          padding: 2.1rem 2.6rem 1.7rem 2.6rem;
          margin: 2.5rem auto;
          max-width: 540px;
          min-width: 300px;
        }
        .lang-card h2 {
          font-size: 1.23rem;
          font-weight: 800;
          margin-bottom: 1.1rem;
          letter-spacing: 0.01em;
          display: flex;
          align-items: center;
          gap: 0.4em;
          color: #1a293a;
        }
        .lang-pie-avatar {
          margin-left: 0.5em;
          vertical-align: middle;
          display: inline-block;
        }
        .lang-stacked-bar {
          display: flex;
          height: 28px;
          margin-bottom: 1.6rem;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 2px 10px #e9eefd;
          background: #fafdff;
        }
        .lang-bar-segment {
          display: block;
          height: 100%;
          transition: width 0.5s cubic-bezier(.4,2.2,.2,1);
        }
        .lang-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.68rem;
        }
        .lang-li {
          display: flex;
          align-items: center;
          gap: 0.6em;
          font-size: 1.09em;
          padding: 0.21em 0.2em 0.21em 0;
          border-radius: 8px;
          transition: background 0.18s;
          cursor: pointer;
        }
        .lang-li:hover {
          background: #f7fbff;
        }
        .lang-dot {
          width: 13px;
          height: 13px;
          border-radius: 50%;
          display: inline-block;
          margin-right: 2px;
          box-shadow: 0 1px 4px #dbe6fa;
        }
        .lang-name {
          font-weight: 700;
          color: #1d3557;
          min-width: 76px;
          max-width: 128px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          display: flex;
          align-items: center;
          gap: 2px;
        }
        .lang-crown {
          margin-right: 2px;
          font-size: 1.05em;
          filter: drop-shadow(0 2px 2px #e5c60055);
        }
        .lang-percent {
          margin-left: auto;
          color: #578ae8;
          font-size: 1em;
          font-weight: 600;
          min-width: 56px;
          text-align: right;
        }
        .lang-bytes {
          font-family: monospace;
          color: #a3adc2;
          font-size: 0.98em;
          margin-left: 11px;
          min-width: 64px;
          text-align: right;
        }
        @media (max-width: 700px) {
          .lang-card {
            max-width: 98vw;
            min-width: unset;
            padding: 1.2rem 0.3rem 1.1rem 0.3rem;
          }
          .lang-stacked-bar { height: 19px; }
          .lang-name { min-width: 42px; max-width: 78px; }
        }
      `}</style>
    </section>
  );
}