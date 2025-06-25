'use client';

import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Spinner from "./components/Spinner";
import RepoInfo from "./components/RepoInfo";
import Contributors from "./components/Contributors";
import Languages from "./components/Languages";
import { fetchRepoInfo, fetchContributors, fetchLanguages } from "./utils/api";

export default function Home() {
  const [input, setInput] = useState("");
  const [repo, setRepo] = useState<any>(null);
  const [contributors, setContributors] = useState<any[]>([]);
  const [languages, setLanguages] = useState<{ [key: string]: number }>({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    setError("");
    setRepo(null);
    setContributors([]);
    setLanguages({});
    setLoading(true);
    const [owner, repoName] = input.trim().split("/");
    if (!owner || !repoName) {
      setError("Please enter a valid repository in owner/repo format, e.g. vercel/next.js");
      setLoading(false);
      return;
    }
    try {
      const repoData = await fetchRepoInfo(owner, repoName);
      setRepo(repoData);
      setContributors(await fetchContributors(owner, repoName));
      setLanguages(await fetchLanguages(owner, repoName));
    } catch (e: any) {
      setError(e.message || "Error fetching data.");
    }
    setLoading(false);
  };

  return (
    <>
      <Header />
      <main className="main-container">
        <section className="cta-section">
          <div className="cta-title">Analyze any GitHub repository in seconds</div>
          <div className="cta-desc">
            Discover insights, contributors, and languages of any public GitHub repository.
          </div>
        </section>
        <div className="input-group">
          <input
            type="text"
            value={input}
            placeholder="Type repo like vercel/next.js"
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleAnalyze()}
            aria-label="Repository (owner/repo)"
          />
          <button onClick={handleAnalyze} disabled={loading}>
            {loading ? "Analyzing..." : "Analyze"}
          </button>
        </div>
        <div className="hint">Example: <span className="repo-hint">vercel/next.js</span> or <span className="repo-hint">facebook/react</span></div>
        {error && <p className="error">{error}</p>}
        {loading && <Spinner />}
        {!loading && repo && (
          <div className="cards-container">
            <RepoInfo repo={repo} />
            <Contributors contributors={contributors} />
            <Languages languages={languages} />
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}