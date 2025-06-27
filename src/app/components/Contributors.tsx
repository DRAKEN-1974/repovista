import React from "react";

export default function Contributors({ contributors }: { contributors: any[] }) {
  if (!contributors || !contributors.length) return null;

  return (
    <div
      style={{
        maxHeight: 400, // adjust as needed
        overflowY: "auto",
        background: "rgba(255,255,255,0.88)",
        borderRadius: 16,
        boxShadow: "0 2px 16px 0 #eaeaea",
        padding: 24,
        margin: "0 auto 24px auto",
        width: "100%",
        maxWidth: 800,
      }}
    >
      <h3
        style={{
          marginBottom: 18,
          fontWeight: 700,
          color: "#191919",
          fontSize: "1.1em",
        }}
      >
        Top Contributors
      </h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))",
          gap: 14,
        }}
      >
        {contributors.map((c, i) => (
          <div
            key={c.login || i}
            style={{
              display: "flex",
              alignItems: "center",
              background: "#f8fafc",
              borderRadius: 10,
              padding: "10px 14px",
              boxShadow: "0 1px 4px 0 #f1f1f1",
              minWidth: 0,
              gap: 10,
            }}
          >
            <img
              src={c.avatar_url}
              alt={c.login}
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                border: "2px solid #fffbe6",
                flexShrink: 0,
              }}
            />
            <div style={{ minWidth: 0 }}>
              <div
                style={{
                  fontWeight: 600,
                  fontSize: 15,
                  color: "#1d2a3a",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                }}
                title={c.login}
              >
                {c.login}
              </div>
              <div style={{ fontSize: 13, color: "#444" }}>
                Commits <b>{c.contributions}</b>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 10, textAlign: "right", color: "#bbb", fontSize: 12 }}>
        Showing top {contributors.length}
      </div>
    </div>
  );
}