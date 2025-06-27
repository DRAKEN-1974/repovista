import React, { useEffect, useState } from "react";

interface SecurityAlert {
  number?: number;
  html_url?: string;
  state?: string;
  dependency?: {
    package: {
      ecosystem: string;
      name: string;
    };
    manifest_path: string;
  };
  security_advisory?: {
    summary: string;
    severity: string;
    description: string;
    cvss?: { score: number };
    identifiers?: { type: string; value: string }[];
    references?: { url: string }[];
  };
  security_vulnerability?: {
    package: { name: string };
    severity: string;
    vulnerable_version_range: string;
    first_patched_version?: { identifier: string };
  };
}

interface SecurityAlertsProps {
  owner: string;
  repo: string;
}

const API_BASE =
  typeof window !== "undefined"
    ? process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000"
    : "http://localhost:8000";

const SecurityAlerts: React.FC<SecurityAlertsProps> = ({ owner, repo }) => {
  const [alerts, setAlerts] = useState<SecurityAlert[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!owner || !repo) return;
    setLoading(true);
    setError(null);
    setAlerts([]);

    // NOTE: Use full backend URL to avoid HTML error (Unexpected token '<')
    fetch(`${API_BASE}/security/dependabot?owner=${owner}&repo=${repo}`)
      .then(async (res) => {
        if (!res.ok) {
          const contentType = res.headers.get("Content-Type") || "";
          if (contentType.includes("application/json")) {
            const data = await res.json();
            throw new Error(
              data.detail ||
                "Failed to fetch security alerts. You may have hit a rate limit or the repository is private."
            );
          } else {
            // HTML error page
            throw new Error(
              "Backend endpoint not found or returned HTML. Check backend URL and that the backend is running."
            );
          }
        }
        const data = await res.json();
        setAlerts(Array.isArray(data.alerts) ? data.alerts : []);
      })
      .catch((err) => {
        setError(
          err.message ||
            "Failed to fetch security alerts. Please try again later."
        );
      })
      .finally(() => setLoading(false));
  }, [owner, repo]);

  return (
    <div className="security-alerts-card">
      <h3>Security Alerts</h3>
      {loading && <p>Loading security alerts...</p>}
      {!loading && error && <p className="error">{error}</p>}
      {!loading && !error && alerts.length === 0 && (
        <p>No open security alerts found for this repository.</p>
      )}
      {!loading && !error && alerts.length > 0 && (
        <ul>
          {alerts.map((alert, i) => (
            <li
              key={i}
              className={`alert severity-${
                alert.security_advisory?.severity ||
                alert.security_vulnerability?.severity ||
                "unknown"
              }`}
            >
              <div>
                <strong>
                  {alert.security_advisory?.summary ||
                    alert.security_vulnerability?.package?.name ||
                    alert.dependency?.package?.name ||
                    "Unknown"}
                </strong>
                {(alert.security_advisory?.severity ||
                  alert.security_vulnerability?.severity) && (
                  <span className="severity">
                    {(
                      alert.security_advisory?.severity ||
                      alert.security_vulnerability?.severity
                    ).toUpperCase()}
                  </span>
                )}
              </div>
              {alert.security_advisory?.description && (
                <div className="description">
                  {alert.security_advisory.description}
                </div>
              )}
              {alert.security_vulnerability?.vulnerable_version_range && (
                <div>
                  <span>Vulnerable Range: </span>
                  <code>
                    {alert.security_vulnerability.vulnerable_version_range}
                  </code>
                </div>
              )}
              {alert.security_vulnerability?.first_patched_version
                ?.identifier && (
                <div>
                  <span>Patched In: </span>
                  <code>
                    {alert.security_vulnerability.first_patched_version.identifier}
                  </code>
                </div>
              )}
              {alert.dependency?.package && (
                <div>
                  <span>Dependency: </span>
                  <code>
                    {alert.dependency.package.ecosystem}/
                    {alert.dependency.package.name}
                  </code>
                  <span> ({alert.dependency.manifest_path})</span>
                </div>
              )}
              {alert.security_advisory?.identifiers &&
                alert.security_advisory.identifiers.map((id) => (
                  <div key={id.value}>
                    <span>{id.type}: </span>
                    <a
                      href={
                        id.type === "CVE"
                          ? `https://cve.mitre.org/cgi-bin/cvename.cgi?name=${id.value}`
                          : undefined
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {id.value}
                    </a>
                  </div>
                ))}
              {alert.security_advisory?.references &&
                alert.security_advisory.references.length > 0 && (
                  <div>
                    <span>References: </span>
                    {alert.security_advisory.references.map((ref, j) => (
                      <a
                        key={j}
                        href={ref.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ marginRight: 8 }}
                      >
                        {ref.url}
                      </a>
                    ))}
                  </div>
                )}
            </li>
          ))}
        </ul>
      )}
      <style jsx>{`
        .security-alerts-card {
          background: var(--card-bg, #fff);
          border-radius: 12px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.03);
          padding: 24px;
          margin-bottom: 24px;
          min-width: 280px;
        }
        .alert {
          border-left: 6px solid #ccc;
          padding: 10px 16px;
          margin-bottom: 18px;
          background: #f8f8fa;
          border-radius: 6px;
        }
        .severity {
          display: inline-block;
          font-size: 0.92em;
          font-weight: 600;
          margin-left: 12px;
          padding: 2px 8px;
          border-radius: 8px;
        }
        .severity-LOW .severity { background: #e1f7e1; color: #238823; }
        .severity-MEDIUM .severity { background: #fffbe5; color: #ffbf00; }
        .severity-HIGH .severity { background: #ffeaea; color: #d8000c; }
        .severity-CRITICAL .severity { background: #fbe4e6; color: #b40000; }
        .description {
          font-size: 0.97em;
          margin-top: 5px;
          color: #444;
        }
        .error {
          color: #d8000c;
          font-weight: 500;
        }
      `}</style>
    </div>
  );
};

export default SecurityAlerts;