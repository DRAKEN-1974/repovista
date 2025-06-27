'use client';

import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Spinner from "./components/Spinner";
import RepoInfo from "./components/RepoInfo";
import Contributors from "./components/Contributors";
import Languages from "./components/Languages";
import ContributorsChart from "./components/ContributorsChart";
import WallOfFameRepos from "./components/WallOfFamerepos";
import SecurityAlerts from "./components/SecurityAlerts"; // <-- Import SecurityAlerts

import { fetchRepoInfo, fetchContributors, fetchLanguages } from "./utils/api";

export default function Home() {
  const [input, setInput] = useState("");
  const [repo, setRepo] = useState<any>(null);
  const [contributors, setContributors] = useState<any[]>([]);
  const [languages, setLanguages] = useState<{ [key: string]: number }>({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [owner, setOwner] = useState<string>("");
  const [repoName, setRepoName] = useState<string>("");

  const handleAnalyze = async () => {
    setError("");
    setRepo(null);
    setContributors([]);
    setLanguages({});
    setLoading(true);
    const [ownerInput, repoInput] = input.trim().split("/");
    if (!ownerInput || !repoInput) {
      setError("Please enter a valid repository in owner/repo format, e.g. vercel/next.js");
      setLoading(false);
      return;
    }
    try {
      setOwner(ownerInput);
      setRepoName(repoInput);
      const repoData = await fetchRepoInfo(ownerInput, repoInput);
      setRepo(repoData);
      setContributors(await fetchContributors(ownerInput, repoInput));
      setLanguages(await fetchLanguages(ownerInput, repoInput));
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
            <SecurityAlerts owner={owner} repo={repoName} /> {/* <-- Security checker here */}
            <Contributors contributors={contributors} />
            <Languages languages={languages} />
            <div style={{ width: "100%", marginTop: 32 }}>
              <ContributorsChart owner={owner} repo={repoName} />
            </div>
          </div>
        )}
        {/* -- THE WALL OF FAME IS NOW BELOW THE APP -- */}
        <WallOfFameRepos refreshInterval={15000} perPage={12} />
      </main>
      <Footer />
    </>
  );
}