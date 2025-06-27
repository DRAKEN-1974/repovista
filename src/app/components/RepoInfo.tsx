import { FaStar, FaCodeBranch, FaExclamationCircle, FaExternalLinkAlt } from "react-icons/fa";

interface RepoInfoProps {
  repo: any;
}

function formatNumber(n: number) {
  if (n >= 1e6) return (n / 1e6).toFixed(1) + "M";
  if (n >= 1e3) return (n / 1e3).toFixed(1) + "k";
  return n;
}

export default function RepoInfo({ repo }: RepoInfoProps) {
  if (!repo) return null;
  return (
    <section className="repo-card">
      <div className="repo-header">
        <img src={repo.owner.avatar_url} alt="Owner avatar" className="repo-owner-avatar" />
        <div className="repo-title-wrap">
          <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="repo-title-link">
            {repo.full_name}
            <FaExternalLinkAlt size={13} style={{ marginLeft: 8, verticalAlign: "middle" }} />
          </a>
          <div className="repo-desc">{repo.description || <i>No description</i>}</div>
        </div>
      </div>
      <div className="repo-stats">
        <span title="Stars">
          <FaStar className="repo-stat-icon" /> {formatNumber(repo.stargazers_count)}
        </span>
        <span title="Forks">
          <FaCodeBranch className="repo-stat-icon" /> {formatNumber(repo.forks_count)}
        </span>
        <span title="Open Issues">
          <FaExclamationCircle className="repo-stat-icon" /> {formatNumber(repo.open_issues_count)}
        </span>
        <span title="License" className="repo-license">
          {repo.license?.spdx_id ? (
            <a
              href={repo.license.url || "#"}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#578ae8", textDecoration: "underline dotted" }}
            >
              {repo.license.spdx_id}
            </a>
          ) : (
            <span style={{ color: "#b7b7b7" }}>No license</span>
          )}
        </span>
      </div>
      <style>{`
        .repo-card {
          background: #fff;
          border-radius: 18px;
          box-shadow: 0 4px 28px #dbe4fa44;
          padding: 2rem 1.3rem 1.4rem 1.3rem;
          margin: 2rem auto 1.2rem auto;
          max-width: 620px;
          color: #222;
          transition: box-shadow 0.18s;
        }
        .repo-card:hover {
          box-shadow: 0 8px 48px #dbe4fa77;
        }
        .repo-header {
          display: flex;
          align-items: flex-start;
          gap: 1.1rem;
          margin-bottom: 1.2rem;
        }
        .repo-owner-avatar {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          box-shadow: 0 2px 10px #eaf1fa;
          border: 2.5px solid #e3eafd;
          object-fit: cover;
          background: #f3f3fd;
          flex-shrink: 0;
        }
        .repo-title-wrap {
          flex: 1;
          min-width: 0;
        }
        .repo-title-link {
          font-size: 1.32rem;
          font-weight: 800;
          color: #1d2a3a;
          text-decoration: none;
          word-break: break-all;
          transition: color 0.14s;
        }
        .repo-title-link:hover {
          color: #4fa3ff;
        }
        .repo-desc {
          margin-top: 0.37em;
          color: #7b8fa8;
          font-size: 1.03em;
          font-weight: 500;
          line-height: 1.45;
          word-break: break-word;
        }
        .repo-stats {
          display: flex;
          gap: 2.2rem;
          margin-top: 0.5rem;
          font-size: 1.05em;
          flex-wrap: wrap;
          align-items: center;
        }
        .repo-stats span {
          display: flex;
          align-items: center;
          gap: 0.38em;
          color: #1d3557;
          font-weight: 600;
        }
        .repo-stat-icon {
          color: #ffc700;
        }
        .repo-stats span[title="Forks"] .repo-stat-icon {
          color: #6c7ac9;
        }
        .repo-stats span[title="Open Issues"] .repo-stat-icon {
          color: #e74c3c;
        }
        .repo-license {
          color: #8c9bab;
          font-size: 0.97em;
          font-weight: 500;
        }
        @media (max-width: 700px) {
          .repo-card { padding: 1.1rem 0.4rem 1rem 0.4rem; }
          .repo-header { gap: 0.7rem; }
          .repo-owner-avatar { width: 48px; height: 48px; }
          .repo-title-link { font-size: 1.03rem; }
        }
      `}</style>
    </section>
  );
}