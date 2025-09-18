import React, { useEffect, useState } from "react";
import "../App.css";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    const body = document.body;
    if (isDark) {
      body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return (
    <div className="theme-toggle">
      <button
        onClick={() => setIsDark((prev) => !prev)}
        className={`toggle-btn ${isDark ? "dark-active" : "light-active"}`}
      >
        {isDark ? "🌙 Dark Mode" : "☀️ Light Mode"}
      </button>
    </div>
  );
}
