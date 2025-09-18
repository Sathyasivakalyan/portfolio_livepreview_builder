// src/Components/OpenNewWebsite.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "../App.css";

// Scroll to Top Button
const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisible = () => {
      const scrolled = document.documentElement.scrollTop;
      setVisible(scrolled > 300);
    };

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

// Motion Section Wrapper
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
  const STORAGE_KEY = "portfolioData";

  // Default placeholders
  const defaultData = {
    name: "Your Name",
    bio: "This is your bio",
    profilePic: "/default-profile.png", // put inside public/
    website: "https://example.com",
    resume: "https://example.com/resume.pdf",
    contact: {},
    projects: [],
    education: [],
    experience: [],
    awards: [],
    skills: [],
    testimonials: [],
  };

  const [d, setD] = useState(defaultData);

  // 🔁 Load from localStorage when component mounts
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setD({ ...defaultData, ...JSON.parse(stored) });
      } catch (err) {
        console.error("Error parsing stored portfolio data", err);
      }
    }
  }, []);

  const openExternalWebsite = (url) => {
    if (!url) return;
    const finalUrl = url.startsWith("http") ? url : `https://${url}`;
    window.open(finalUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div style={{ backgroundColor: "#000", color: "#fff", minHeight: "100vh" }}>
      {/* Navigation */}
      <nav className="navbar sticky">
        <div className="nav-logo">{d.name}</div>
        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#portfolio">Projects</a>
          <a href="#testimonials">Testimonials</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-split-row">
        <div className="hero-left-text">
          <p className="intro">HELLO</p>
          <h1 className="hero-title">I'm {d.name}</h1>
          <p className="hero-subtitle">{d.bio}</p>
          <div className="hero-buttons">
            {d.resume && (
              <button className="btn black" onClick={() => openExternalWebsite(d.resume)}>
                GET MY CV
              </button>
            )}
            {d.website && (
              <button className="btn outline" onClick={() => openExternalWebsite(d.website)}>
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
            <img src={d.profilePic} alt="Profile" className="hero-full-img" />
            <div className="floating-social-icons">
              {d.contact.github && (
                <a href={d.contact.github} target="_blank" rel="noreferrer" className="icon github">
                  <i className="fab fa-github"></i>
                </a>
              )}
              {d.contact.linkedin && (
                <a href={d.contact.linkedin} target="_blank" rel="noreferrer" className="icon linkedin">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              )}
              {d.contact.twitter && (
                <a href={d.contact.twitter} target="_blank" rel="noreferrer" className="icon twitter">
                  <i className="fab fa-twitter"></i>
                </a>
              )}
              {d.contact.instagram && (
                <a href={d.contact.instagram} target="_blank" rel="noreferrer" className="icon instagram">
                  <i className="fab fa-instagram"></i>
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <Section>
        <section id="about" className="section">
          <h2>About Me</h2>
          <p>{d.bio}</p>

          <div className="about-grid">
            <div className="about-column">
              <h3>🎓 Education</h3>
              <ul className="info-list">
                {d.education.map((edu, idx) => (
                  <li key={idx}>
                    <strong>{edu.title}</strong> — {edu.subtitle}
                  </li>
                ))}
              </ul>
            </div>

            <div className="about-column">
              <h3>💼 Experience</h3>
              <ul className="info-list">
                {d.experience.map((exp, idx) => (
                  <li key={idx}>
                    <strong>{exp.title}</strong> — {exp.subtitle}
                  </li>
                ))}
              </ul>
            </div>

            <div className="about-column">
              <h3>🏆 Awards</h3>
              <ul className="info-list">
                {d.awards.map((award, idx) => (
                  <li key={idx}>
                    <strong>{award.title}</strong> — {award.subtitle}
                  </li>
                ))}
              </ul>
            </div>

            <div className="about-column">
              <h3>🛠️ Skills</h3>
              <ul className="info-list">
                {d.skills.map((skill, idx) => (
                  <li key={idx}>{skill}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </Section>

      {/* Portfolio Section */}
      <Section delay={0.3}>
        <section id="portfolio" className="section">
          <h2>Projects</h2>
          <div className="portfolio-grid">
            {d.projects.map((proj, i) => (
              <div key={i} className="portfolio-item project-image-container">
                {proj.image && <img src={proj.image} alt={proj.title} className="project-image" />}
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
            ))}
          </div>
        </section>
      </Section>

      {/* Testimonials */}
      <Section delay={0.4}>
        <section id="testimonials" className="section">
          <h2>Testimonials</h2>
          {d.testimonials.map((t, i) => (
            <div key={i} className="testimonial">
              <p>"{t.feedback}"</p>
              <span>- {t.client}</span>
            </div>
          ))}
        </section>
      </Section>

      {/* Contact Section */}
      <Section delay={0.5}>
        <section id="contact" className="section">
          <h2>Contact</h2>
          {d.contact.email && <p><i className="fas fa-envelope"></i> {d.contact.email}</p>}
          {d.contact.phone && <p><i className="fas fa-phone"></i> {d.contact.phone}</p>}
          {d.contact.github && (
            <p>
              <i className="fab fa-github"></i>{" "}
              <a href={d.contact.github} target="_blank" rel="noreferrer">
                {d.contact.github}
              </a>
            </p>
          )}
          {d.contact.linkedin && (
            <p>
              <i className="fab fa-linkedin"></i>{" "}
              <a href={d.contact.linkedin} target="_blank" rel="noreferrer">
                {d.contact.linkedin}
              </a>
            </p>
          )}
          {d.resume && (
            <button className="cta-button resume-button" onClick={() => openExternalWebsite(d.resume)}>
              Download Resume
            </button>
          )}
        </section>
      </Section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} {d.name}. Built with React</p>
        <p>All rights reserved</p>
        <p>Designed with a focus on user experience</p>
      </footer>

      {/* Scroll to Top */}
      <ScrollToTop />
    </div>
  );
}
