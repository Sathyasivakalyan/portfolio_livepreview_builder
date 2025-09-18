// src/components/OpenNewWebsite.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "../App.css";

// Default fallback data
const defaultData = {
  name: "Your Name",
  bio: "This is your bio",
  profilePic: "/default-profile.png", // fallback image inside public/
  website: "",
  resume: "",
  contact: {
    email: "",
    github: "",
    linkedin: "",
    phone: "",
  },
  projects: [],
  education: [],
  experience: [],
  awards: [],
  skills: [],
  testimonials: [],
};

// Scroll To Top button
const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const toggleVisible = () =>
      setVisible(document.documentElement.scrollTop > 300);
    window.addEventListener("scroll", toggleVisible);
    return () => window.removeEventListener("scroll", toggleVisible);
  }, []);
  return (
    <button
      className={`scroll-to-top ${visible ? "show" : ""}`}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      ↑
    </button>
  );
};

// Animated Section wrapper
const Section = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay }}
    viewport={{ once: true }}
  >
    {children}
  </motion.div>
);

export default function OpenNewWebsite() {
  const [data, setData] = useState(defaultData);

  // ✅ Load saved builder data from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem("portfolioData");
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setData({ ...defaultData, ...parsed }); // merge default + saved
      } catch (error) {
        console.error("Error parsing saved portfolio data:", error);
      }
    }
  }, []);

  // ✅ Handle profile image
  const profileImg =
    data.profilePic?.startsWith("http") ||
    data.profilePic?.startsWith("/") ||
    data.profilePic?.startsWith("data:")
      ? data.profilePic
      : `${process.env.PUBLIC_URL}/${data.profilePic}`;

  // ✅ Open external links safely
  const openExternalWebsite = (url) => {
    if (!url) return;
    const finalUrl = url.startsWith("http") ? url : `https://${url}`;
    window.open(finalUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div style={{ backgroundColor: "#000", color: "#fff", minHeight: "100vh" }}>
      {/* Navbar */}
      <nav className="navbar sticky">
        <div className="nav-logo">{data.name}</div>
        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#portfolio">Projects</a>
          <a href="#testimonials">Testimonials</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero-split-row">
        <div className="hero-left-text">
          <p className="intro">HELLO</p>
          <h1 className="hero-title">I'm {data.name}</h1>
          <p className="hero-subtitle">{data.bio}</p>
          <div className="hero-buttons">
            {data.resume && (
              <button
                className="btn black"
                onClick={() => openExternalWebsite(data.resume)}
              >
                GET MY CV
              </button>
            )}
            {data.website && (
              <button
                className="btn outline"
                onClick={() => openExternalWebsite(data.website)}
              >
                Visit My Website
              </button>
            )}
            <a href="#contact" className="btn outline">
              Get In Touch
            </a>
          </div>
        </div>
        <div className="hero-right-image">
          <div className="profile-container">
            <img src={profileImg} alt="Profile" className="hero-full-img" />
          </div>
        </div>
      </section>

      {/* About */}
      <Section>
        <section id="about" className="section">
          <h2>About Me</h2>
          <p>{data.bio}</p>
          <div className="about-grid">
            {data.education?.length > 0 && (
              <div className="about-column">
                <h3>🎓 Education</h3>
                <ul className="info-list">
                  {data.education.map((edu, idx) => (
                    <li key={idx}>
                      <strong>{edu.title}</strong> — {edu.subtitle}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {data.experience?.length > 0 && (
              <div className="about-column">
                <h3>💼 Experience</h3>
                <ul className="info-list">
                  {data.experience.map((exp, idx) => (
                    <li key={idx}>
                      <strong>{exp.title}</strong> — {exp.subtitle}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {data.awards?.length > 0 && (
              <div className="about-column">
                <h3>🏆 Awards</h3>
                <ul className="info-list">
                  {data.awards.map((award, idx) => (
                    <li key={idx}>
                      <strong>{award.title}</strong> — {award.subtitle}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {data.skills?.length > 0 && (
              <div className="about-column">
                <h3>🛠️ Skills</h3>
                <ul className="info-list">
                  {data.skills.map((skill, idx) => (
                    <li key={idx}>{skill}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      </Section>

      {/* Portfolio */}
      <Section delay={0.3}>
        <section id="portfolio" className="section">
          <h2>Projects</h2>
          <div className="portfolio-grid">
            {data.projects?.map((proj, i) => {
              const projImg =
                proj.image?.startsWith("http") || proj.image?.startsWith("data:")
                  ? proj.image
                  : `${process.env.PUBLIC_URL}/${proj.image}`;
              return (
                <div
                  key={i}
                  className="portfolio-item project-image-container"
                >
                  {proj.image && (
                    <img src={projImg} alt={proj.title} className="project-image" />
                  )}
                  <div className="overlay">
                    <div className="overlay-text">
                      <h3>{proj.title}</h3>
                      <p>{proj.description}</p>
                      <span>{proj.tech}</span>
                      <div style={{ marginTop: "0.5rem" }}>
                        {proj.live && (
                          <button
                            onClick={() => openExternalWebsite(proj.live)}
                            style={{
                              marginRight: "10px",
                              color: "#fff",
                              textDecoration: "underline",
                              background: "none",
                              border: "none",
                              cursor: "pointer",
                            }}
                          >
                            Live
                          </button>
                        )}
                        {proj.github && (
                          <button
                            onClick={() => openExternalWebsite(proj.github)}
                            style={{
                              color: "#fff",
                              textDecoration: "underline",
                              background: "none",
                              border: "none",
                              cursor: "pointer",
                            }}
                          >
                            Code
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </Section>

      {/* Contact */}
      <Section delay={0.5}>
        <section id="contact" className="section">
          <h2>Contact</h2>
          {data.contact.email && (
            <p>
              <i className="fas fa-envelope"></i> {data.contact.email}
            </p>
          )}
          {data.contact.phone && (
            <p>
              <i className="fas fa-phone"></i> {data.contact.phone}
            </p>
          )}
          {data.contact.github && (
            <p>
              <i className="fab fa-github"></i>{" "}
              <a
                href={data.contact.github}
                target="_blank"
                rel="noreferrer"
              >
                {data.contact.github}
              </a>
            </p>
          )}
          {data.contact.linkedin && (
            <p>
              <i className="fab fa-linkedin"></i>{" "}
              <a
                href={data.contact.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                {data.contact.linkedin}
              </a>
            </p>
          )}
        </section>
      </Section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} {data.name}. Built with React</p>
      </footer>

      <ScrollToTop />
    </div>
  );
}
