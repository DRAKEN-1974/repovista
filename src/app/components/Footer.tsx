"use client";

export default function Footer() {
  return (
    <footer className="footer-bar" role="contentinfo">
      <div className="footer-main">
        <div className="footer-brand">
          <span className="footer-logo" aria-label="RepoVista logo">
            <svg width="26" height="26" viewBox="0 0 48 48" fill="none">
              <rect x="4" y="4" width="40" height="40" rx="12" fill="#fff" stroke="#191919" strokeWidth="2"/>
              <rect x="13" y="16" width="22" height="10" rx="3.5" fill="none" stroke="#191919" strokeWidth="1.5"/>
              <path d="M15 32.5L22 26.5L27 30.5L33 22.5" stroke="#ffe156" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
          <span className="footer-title">RepoVista</span>
        </div>
        {/* Secondary footer actions */}
        <nav className="footer-actions" aria-label="Footer Actions">
          <a href="/privacy" className="footer-action-btn">Privacy Policy</a>
          <a href="/terms" className="footer-action-btn">Terms of Service</a>
          <a href="/careers" className="footer-action-btn">Careers</a>
        </nav>
      </div>
      <div className="footer-divider"></div>
      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} RepoVista <span className="footer-dot">&middot;</span>
          Built by <a href="https://github.com/DRAKEN-1974" target="_blank" rel="noopener noreferrer" className="footer-author">The RepoVista Team</a>
        </span>
      </div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800;900&display=swap');
        .footer-bar {
          width: 100vw;
          margin-top: 5rem;
          background: linear-gradient(90deg, #fff 65%, #ededed 100%);
          border-top: 1.5px solid #ededed;
          box-shadow: 0 -2px 18px #ffe15610;
        }
        .footer-main {
          max-width: 1120px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 2.1rem 1.1rem 0.8rem 1.1rem;
          width: 100%;
        }
        .footer-brand {
          display: flex;
          align-items: center;
          gap: 0.65em;
          font-family: 'Sora', 'Inter', 'Manrope', 'Segoe UI', Arial, sans-serif;
          font-weight: 800;
          font-size: 1.20rem;
          color: #181818;
          letter-spacing: -0.4px;
          user-select: none;
        }
        .footer-logo svg {
          display: block;
        }
        .footer-title {
          user-select: none;
        }
        .footer-actions {
          display: flex;
          gap: 1em;
        }
        .footer-action-btn {
          font-family: 'Sora', 'Inter', 'Manrope', 'Segoe UI', Arial, sans-serif;
          font-size: 1em;
          font-weight: 600;
          color: #666;
          background: none;
          border: none;
          outline: none;
          text-decoration: none;
          padding: 0.25em 1.05em;
          border-radius: 2em;
          transition: background 0.17s, color 0.16s;
          cursor: pointer;
          box-shadow: none;
        }
        .footer-action-btn:hover, .footer-action-btn:focus {
          background: #191919;
          color: #ffe156;
        }
        .footer-divider {
          width: 100%;
          height: 1.5px;
          margin: 1.2em 0 0.7em 0;
          background: linear-gradient(
            90deg,
            #fff 0%,
            #ededed 33%,
            #ffe156 55%,
            #ededed 87%,
            #fff 100%
          );
          border: none;
          opacity: 0.5;
          box-shadow: 0 2px 12px #ffe15610;
        }
        .footer-bottom {
          color: #888;
          font-size: 1.02em;
          letter-spacing: 0.01em;
          margin-top: 0.1em;
          text-align: center;
          padding-bottom: 1.1em;
        }
        .footer-author {
          color: #191919;
          font-weight: 700;
          text-decoration: none;
          transition: color 0.18s;
        }
        .footer-author:hover {
          color: #ffe156;
        }
        .footer-dot {
          margin: 0 0.4em;
          color: #bbb;
          font-size: 1.13em;
          vertical-align: 1px;
        }
        @media (max-width: 850px) {
          .footer-main {
            flex-direction: column;
            align-items: center;
            gap: 1.1em;
            padding: 1.2rem 0.5rem 0.7rem 0.5rem;
          }
          .footer-actions {
            gap: 0.6em;
          }
        }
        @media (max-width: 500px) {
          .footer-main {
            flex-direction: column;
            align-items: center;
            gap: 0.9em;
            padding: 1.1rem 0.2rem 0.6rem 0.2rem;
          }
          .footer-brand { font-size: 1.03rem; }
          .footer-actions { gap: 0.3em; }
        }
      `}</style>
    </footer>
  );
}