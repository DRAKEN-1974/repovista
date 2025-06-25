interface ContributorsProps {
  contributors: any[];
}

export default function Contributors({ contributors }: ContributorsProps) {
  if (!contributors || contributors.length === 0) return (
    <section className="card">
      <h2>Contributors</h2>
      <div className="empty-message">No contributors found or contributors are hidden.</div>
    </section>
  );
  return (
    <section className="card">
      <h2>Top Contributors</h2>
      <ul className="contributors-list">
        {contributors.slice(0, 10).map((c, idx) => (
          <li key={idx}>
            <img src={c.avatar_url} width={32} height={32} className="avatar" alt={`${c.login} avatar`} />
            <a href={c.html_url} target="_blank" rel="noopener noreferrer">{c.login}</a>
            <span className="badge">{c.contributions} commits</span>
          </li>
        ))}
      </ul>
    </section>
  );
}