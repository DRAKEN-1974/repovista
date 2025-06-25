"use client";

import Link from "next/link";


export default function Header() {
  return (
    <header className="header-bar">
      <div className="header-content">
        {/* Logo & Brand */}
        <Link href="/" className="brand" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
          {/* SVG Logo: Modern, geometric, scalable */}
          <span className="logo" aria-label="RepoVista logo" style={{ display: "flex", alignItems: "center" }}>
            <svg width="44" height="44" viewBox="0 0 64 64" fill="none">
              <rect x="6" y="6" width="52" height="52" rx="16" fill="#fff" stroke="#191919" strokeWidth="2.5"/>
              <circle cx="32" cy="32" r="13.5" fill="#191919" stroke="#191919" strokeWidth="2"/>
              <path d="M32 18V32L44 38" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </span>
          <span className="site-title" style={{
            fontFamily: "'Inter', 'SF Pro Display', 'Segoe UI', Arial, sans-serif",
            marginLeft: "13px",
            fontWeight: 900,
            fontSize: "2.05rem",
            letterSpacing: "-1px",
            color: "#191919"
          }}>
            RepoVista
          </span>
        </Link>
        {/* Navigation */}
        <nav className="nav" aria-label="Main Navigation">
          <a className="nav-link" href="https://github.com/Anushka1650" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a className="nav-link" href="https://github.com/Anushka1650/repo-analyzer#readme" target="_blank" rel="noopener noreferrer">Docs</a>
          <a className="nav-link" href="mailto:anushka@example.com" target="_blank" rel="noopener noreferrer">Contact</a>
          
        </nav>
      </div>
      {/* Fancy divider line for premium feel */}
      <div style={{
        width: "100%",
        height: "2px",
        background: "linear-gradient(90deg, #fff 0%, #ededed 33%, #d1d1d1 55%, #ededed 87%, #fff 100%)",
        border: "none",
        margin: 0,
        opacity: 0.7
      }}/>
    </header>
  );
}