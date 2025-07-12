import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import PortfolioBuilder from "./components/PortfolioBuilder";
import PortfolioPreview from "./components/PortfolioPreview";
import OpenNewWebsite from "./components/OpenNewWebsite";
import ThemeToggle from "./components/ThemeToggle";

// LocalStorage Key
const STORAGE_KEY = "portfolioData";

export default function App() {
  // Load from localStorage
  const getInitialData = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored
      ? JSON.parse(stored)
      : {
          name: "",
          bio: "",
          profilePic: "",
          backgroundPic: "",
          skills: [],
          projects: [],
          contact: {
            github: "",
            email: "",
            linkedin: "",
            phone: "",
          },
          resume: ""
        };
  };

  const [data, setData] = useState(getInitialData);

  // 🔁 Save to localStorage on every update
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  return (
    <Router>
      <Routes>
        {/* Main Builder Page */}
        <Route
          path="/"
          element={
            <div className="app">
              <ThemeToggle />
              <h1 style={{ textAlign: "center", marginBottom: "1rem" }}>⚒️ Portfolio Builder</h1>

              <div className="container" style={{ display: "flex", flexWrap: "wrap", gap: "2rem", padding: "1rem" }}>
                {/* Builder */}
                <div style={{ flex: 1, minWidth: "350px", background: "#f9f9f9", padding: "1rem", borderRadius: "10px" }}>
                  <h2 style={{ textAlign: "center" }}>🛠️ Build Your Portfolio</h2>
                  <PortfolioBuilder data={data} onDataChange={setData} />
                </div>

                {/* Live Preview */}
                <div style={{ flex: 1, minWidth: "350px", background: "#222", padding: "1rem", borderRadius: "10px", color: "white" }}>
                  <h2 style={{ textAlign: "center" }}>👀 Live Preview</h2>
                  <PortfolioPreview data={data} />
                </div>
              </div>

              {/* Link to final site */}
              <div style={{ textAlign: "center", marginTop: "2rem" }}>
                <Link to="/opennewwebsite" target="_blank" rel="noreferrer">
                  <button style={{ padding: "10px 20px", fontSize: "16px", borderRadius: "6px", cursor: "pointer" }}>
                    🌐 Open Final Portfolio Website
                  </button>
                </Link>
              </div>
            </div>
          }
        />

        {/* Final Website */}
        <Route
          path="/opennewwebsite"
          element={<OpenNewWebsite data={getInitialData()} />}
        />
      </Routes>
    </Router>
  );
}
