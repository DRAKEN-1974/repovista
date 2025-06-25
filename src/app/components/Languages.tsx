interface LanguagesProps {
  languages: { [key: string]: number };
}

function formatBytes(n: number) {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / 1024 / 1024).toFixed(1)} MB`;
}

export default function Languages({ languages }: LanguagesProps) {
  if (!languages || Object.keys(languages).length === 0) return (
    <section className="card">
      <h2>Languages</h2>
      <div className="empty-message">No language data available.</div>
    </section>
  );
  const total = Object.values(languages).reduce((a, b) => a + b, 0);
  return (
    <section className="card">
      <h2>Languages</h2>
      <ul className="lang-list">
        {Object.entries(languages).map(([lang, bytes]) => (
          <li key={lang}>
            <strong>{lang}</strong>
            <span className="lang-bar">
              <span
                style={{
                  display: "inline-block",
                  height: 8,
                  width: `${(bytes / total) * 100}%`,
                  background: "#fff",
                  borderRadius: 6,
                }}
              />
            </span>
            <span className="lang-bytes">{formatBytes(bytes)}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}