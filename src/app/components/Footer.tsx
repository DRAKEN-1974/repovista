import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div style={{
        maxWidth: 900,
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
        padding: "0 16px"
      }}>
        <div style={{
          fontWeight: 700,
          fontSize: "1.12rem",
          color: "#191919",
          letterSpacing: "-0.5px",
          marginBottom: 2,
          fontFamily: "'Inter', 'Segoe UI', Arial, sans-serif"
        }}>
          RepoVista
        </div>
        <div style={{
          color: "#888",
          fontSize: "1rem",
          textAlign: "center",
          maxWidth: 520,
          fontWeight: 400,
          lineHeight: 1.6
        }}>
          Discover, analyze, and explore GitHub repositories with clarity. Made  <span style={{color: "#e25555"}}></span> by <Link href="https://github.com/Anushka1650" target="_blank" style={{
            color: "#191919",
            fontWeight: 600,
            textDecoration: "none"
          }}>Anushka</Link>
        </div>
        <div style={{
          marginTop: 10,
          display: "flex",
          gap: 20,
          fontSize: "0.98rem"
        }}>
          <Link href="https://github.com/Anushka1650/repo-analyzer#readme" target="_blank" style={{
            color: "#888",
            textDecoration: "none",
            transition: "color 0.16s"
          }}>Docs</Link>
          <Link href="mailto:anushka@example.com" style={{
            color: "#888",
            textDecoration: "none",
            transition: "color 0.16s"
          }}>Contact</Link>
          <Link href="https://github.com/Anushka1650/repo-analyzer" target="_blank" style={{
            color: "#888",
            textDecoration: "none",
            transition: "color 0.16s"
          }}>GitHub</Link>
        </div>
        <div style={{
          fontSize: "0.95rem",
          color: "#bbb",
          marginTop: 14,
          letterSpacing: "0.02em"
        }}>
          &copy; {new Date().getFullYear()} RepoVista. All rights reserved.
        </div>
      </div>
    </footer>
  );
}