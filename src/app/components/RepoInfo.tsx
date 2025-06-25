import { FaStar, FaCodeBranch, FaExclamationCircle, FaExternalLinkAlt } from "react-icons/fa";

interface RepoInfoProps {
  repo: any;
}

export default function RepoInfo({ repo }: RepoInfoProps) {
  if (!repo) return null;
  return (
    <section className="card">
      <div className="card-title">
        <img src={repo.owner.avatar_url} alt="Owner avatar" className="owner-avatar" />
        <div>
          <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="repo-link">
            {repo.full_name} <FaExternalLinkAlt size={14} />
          </a>
          <div className="repo-desc">{repo.description || <i>No description</i>}</div>
        </div>
      </div>
      <div className="repo-stats">
        <span title="Stars"><FaStar /> {repo.stargazers_count}</span>
        <span title="Forks"><FaCodeBranch /> {repo.forks_count}</span>
        <span title="Open Issues"><FaExclamationCircle /> {repo.open_issues_count}</span>
        <span title="License">{repo.license?.spdx_id || "No license"}</span>
      </div>
    </section>
  );
}