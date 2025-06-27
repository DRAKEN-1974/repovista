"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="header-bar">
      <div className="header-content">
        {/* Logo & Brand */}
        <Link
          href="/"
          className="brand"
          style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <span
            className="logo"
            aria-label="RepoVista logo"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "13px",
              padding: "6px",
              background: "linear-gradient(135deg, #fff 60%, #ffe15622 100%)",
              boxShadow: "0 2px 16px #0001",
              transition: "box-shadow 0.18s, transform 0.2s",
              willChange: "transform",
            }}
          >
            {/* Modern repo + check SVG with gold accent */}
            <svg
              width="38"
              height="38"
              viewBox="0 0 48 48"
              fill="none"
              className="brand-svg"
              style={{
                display: "block",
                transition: "transform 0.20s cubic-bezier(.5,1.5,.5,1.5)",
              }}
            >
              <rect
                x="4"
                y="4"
                width="40"
                height="40"
                rx="12"
                fill="#fff"
                stroke="#191919"
                strokeWidth="2.2"
              />
              <rect
                x="13"
                y="16"
                width="22"
                height="10"
                rx="3.5"
                fill="none"
                stroke="#191919"
                strokeWidth="2"
              />
              <path
                d="M15 32.5L22 26.5L27 30.5L33 22.5"
                stroke="#ffe156"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </span>
          <span
            className="site-title"
            style={{
              fontFamily: "'Sora', 'Inter', 'Manrope', 'Segoe UI', Arial, sans-serif",
              fontWeight: 800,
              fontSize: "2.02rem",
              letterSpacing: "-0.7px",
              color: "#181818",
              lineHeight: 1.08,
              textShadow: "0 2px 14px #ffe15611",
              transition: "color 0.2s",
              userSelect: "none",
            }}
          >
            RepoVista
          </span>
        </Link>

        {/* Navigation */}
        <nav className="nav" aria-label="Main Navigation">
          <a
            className="nav-link"
            href="https://github.com/Anushka1650"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden
            style={{marginRight: "0.4em", verticalAlign: "middle"}}><path d="M12 2C6.48 2 2 6.58 2 12.26C2 16.65 4.87 20.27 8.84 21.5C9.34 21.59 9.5 21.3 9.5 21.05C9.5 20.82 9.49 20.19 9.48 19.31C6.73 19.91 6.14 17.96 6.14 17.96C5.68 16.76 5.03 16.45 5.03 16.45C4.13 15.88 5.1 15.89 5.1 15.89C6.09 15.97 6.6 16.99 6.6 16.99C7.49 18.59 9 18.14 9.6 17.89C9.69 17.22 9.97 16.76 10.28 16.51C7.94 16.26 5.49 15.34 5.49 11.68C5.49 10.64 5.86 9.77 6.48 9.08C6.38 8.82 6.06 7.84 6.58 6.57C6.58 6.57 7.41 6.29 9.5 7.72C10.3 7.5 11.16 7.39 12.02 7.39C12.88 7.39 13.74 7.5 14.54 7.72C16.63 6.29 17.46 6.57 17.46 6.57C17.98 7.84 17.66 8.82 17.56 9.08C18.18 9.77 18.55 10.64 18.55 11.68C18.55 15.35 16.09 16.26 13.74 16.51C14.13 16.82 14.5 17.45 14.5 18.39C14.5 19.67 14.48 20.71 14.48 21.05C14.48 21.3 14.64 21.6 15.14 21.5C19.11 20.27 22 16.65 22 12.26C22 6.58 17.52 2 12 2Z" fill="#191919"/></svg>
            GitHub
          </a>
          <a
            className="nav-link"
            href="https://github.com/Anushka1650/repo-analyzer#readme"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden
            style={{marginRight: "0.4em", verticalAlign: "middle"}}><path d="M8 17V19C8 20.1046 8.89543 21 10 21H14C15.1046 21 16 20.1046 16 19V17M12 3V15M12 15L8 11M12 15L16 11" stroke="#191919" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Docs
          </a>
          <a
            className="nav-link"
            href="mailto:anushka@example.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden
            style={{marginRight: "0.4em", verticalAlign: "middle"}}><rect x="3" y="5" width="18" height="14" rx="3" stroke="#191919" strokeWidth="1.5"/><path d="M3 7l8.4 6.3a2 2 0 0 0 2.2 0L21 7" stroke="#191919" strokeWidth="1.5" strokeLinecap="round"/></svg>
            Contact
          </a>
        </nav>
      </div>
      {/* Subtle divider */}
      <div className="header-divider" />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800;900&display=swap');
        .header-bar {
          background: #fff;
          box-shadow: 0 6px 24px #0000, 0 1px 0 #ededed;
          border-bottom: 1.5px solid #f2f2f2;
          position: sticky;
          top: 0;
          z-index: 20;
          width: 100vw;
        }
        .header-content {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.1rem 2.1rem 1.06rem 2.1rem;
        }
        .brand:hover .logo .brand-svg {
          transform: scale(1.08) rotate(-3deg);
          filter: drop-shadow(0 2px 18px #ffe15655);
        }
        .brand:hover .site-title {
          color: #ffe156;
        }
        .nav {
          display: flex;
          align-items: center;
          gap: 1.18em;
        }
        .nav-link {
          font-family: 'Sora', 'Inter', 'SF Pro Display', 'Segoe UI', Arial, sans-serif;
          font-size: 1.09em;
          font-weight: 700;
          color: #181818;
          background: transparent;
          padding: 0.41em 1.12em;
          border-radius: 2em;
          letter-spacing: 0.01em;
          text-decoration: none;
          transition: background 0.19s, color 0.18s, box-shadow 0.18s;
          box-shadow: 0 1px 4px #ededed44;
          display: flex;
          align-items: center;
          gap: 0.5em;
          outline: none;
          border: none;
          position: relative;
        }
        .nav-link:after {
          content: "";
          display: block;
          position: absolute;
          left: 1em;
          right: 1em;
          bottom: 7px;
          height: 2px;
          background: linear-gradient(90deg, #191919 0%, #ffe156 100%);
          opacity: 0;
          border-radius: 2px;
          transition: opacity 0.18s;
        }
        .nav-link:hover,
        .nav-link:focus {
          background: #191919;
          color: #ffe156;
          box-shadow: 0 2px 16px #ffe15622;
        }
        .nav-link:hover:after,
        .nav-link:focus:after {
          opacity: 0.22;
        }
        .header-divider {
          width: 100%;
          height: 2px;
          background: linear-gradient(
            90deg,
            #fff 0%,
            #ededed 33%,
            #ffe156 55%,
            #ededed 87%,
            #fff 100%
          );
          border: none;
          margin: 0;
          opacity: 0.65;
          box-shadow: 0 2px 12px #ffe15618;
        }
        @media (max-width: 850px) {
          .header-content {
            padding: 0.75rem 0.7rem 0.65rem 0.7rem;
          }
          .site-title {
            font-size: 1.12rem !important;
          }
          .nav {
            gap: 0.45em;
          }
        }
        @media (max-width: 500px) {
          .site-title { display: none; }
          .header-content { padding: 0.5rem 0.4rem 0.5rem 0.5rem; }
        }
      `}</style>
    </header>
  );
}