import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "../App.css";

// Scroll to Top Button
const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    setVisible(scrolled > 300);
  };

  useEffect(() => {
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

// Main Component
export default function OpenNewWebsite({ data }) {
  return (
    
      <div style={{ backgroundColor: "#000", color: "#fff", minHeight: "100vh" }}>
      {/* Navigation */}
      <nav className="navbar sticky">
        <div className="nav-logo">{data.name}</div>
        <div className="nav-links">
          <a href="#about">About</a>
          
          <a href="#portfolio">projects</a>
          <a href="#testimonials">Testimonials</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-split-row">
        {/* Left */}
        <div className="hero-left-text">
          <p className="intro">HELLO</p>
          <h1 className="hero-title">I'm {data.name}</h1>
          <p className="hero-subtitle">{data.bio}</p>
          <div className="hero-buttons">
            {data.resume && (
              <a href={data.resume} target="_blank" rel="noreferrer" className="btn black">
                GET MY CV
              </a>
            )}
            <a href="#contact" className="btn outline">Get In Touch</a>
          </div>
        </div>

        {/* Right */}
        <div className="hero-right-image">
          <div className="profile-container">
            <img src={data.profilePic} alt="Profile" className="hero-full-img" />
            <div className="floating-social-icons">
              {data.contact.github && (
                <a href={data.contact.github} target="_blank" rel="noreferrer" className="icon github">
                  <i className="fab fa-github"></i>
                </a>
              )}
              {data.contact.linkedin && (
                <a href={data.contact.linkedin} target="_blank" rel="noreferrer" className="icon linkedin">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              )}
              {data.contact.twitter && (
                <a href={data.contact.twitter} target="_blank" rel="noreferrer" className="icon twitter">
                  <i className="fab fa-twitter"></i>
                </a>
              )}
              {data.contact.instagram && (
                <a href={data.contact.instagram} target="_blank" rel="noreferrer" className="icon instagram">
                  <i className="fab fa-instagram"></i>
                </a>
              )}
            </div>
          </div>
          <img src={data.profilePic} alt="Profile" className="hero-full-img" />
        </div>
      </section>

      {/* About */}
      <Section>
  <section id="about" className="section">
    <h2>About Me</h2>
    <p>{data.bio}</p>

    <div className="about-grid">
      {/* Education */}
      <div className="about-column">
        <h3>🎓 Education</h3>
        <ul className="info-list">
          {data.education?.map((edu, idx) => (
            <li key={idx}>
              <strong>{edu.title}</strong> — {edu.subtitle}
            </li>
          ))}
        </ul>
      </div>

      {/* Experience */}
      <div className="about-column">
        <h3>💼 Experience</h3>
        <ul className="info-list">
          {data.experience?.map((exp, idx) => (
            <li key={idx}>
              <strong>{exp.title}</strong> — {exp.subtitle}
            </li>
          ))}
        </ul>
      </div>

      {/* Awards */}
      <div className="about-column">
        <h3>🏆 Awards</h3>
        <ul className="info-list">
          {data.awards?.map((award, idx) => (
            <li key={idx}>
              <strong>{award.title}</strong> — {award.subtitle}
            </li>
          ))}
        </ul>
      </div>

      {/* Skills */}
      <div className="about-column">
        <h3>🛠️ Skills</h3>
        <ul className="info-list">
          {data.skills?.map((skill, idx) => (
            <li key={idx}>{skill}</li>
          ))}
        </ul>
      </div>
    </div>
  </section>
</Section>


      

      {/* Portfolio */}
      <Section delay={0.3}>
        <section id="portfolio" className="section">
          <h2>Projects</h2>
          <div className="portfolio-grid">
            {data.projects?.map((proj, i) => (
              <div key={i} className="portfolio-item">
                <h3>{proj.title}</h3>
                <p>{proj.description}</p>
                <span>{proj.tech}</span>
                <div>
                  {proj.live && (
                    <a href={proj.live} target="_blank" rel="noreferrer">Live</a>
                  )}
                  {" | "}
                  {proj.github && (
                    <a href={proj.github} target="_blank" rel="noreferrer">Code</a>
                  )}
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
          <div className="testimonial">
            <p>"Amazing work and super easy to work with!"</p>
            <span>- Client A</span>
          </div>
          <div className="testimonial">
            <p>"Delivered the project on time with exceptional quality."</p>
            <span>- Client B</span>
          </div>
        </section>
      </Section>

      {/* Contact */}
      <Section delay={0.5}>
        <section id="contact" className="section">
          <h2>Contact</h2>
          {data.contact?.email && (
            <p><i className="fas fa-envelope"></i> {data.contact.email}</p>
          )}
          {data.contact?.phone && (
            <p><i className="fas fa-phone"></i> {data.contact.phone}</p>
          )}
          {data.contact?.github && (
            <p>
              <i className="fab fa-github"></i>{" "}
              <a href={data.contact.github} target="_blank" rel="noreferrer">{data.contact.github}</a>
            </p>
          )}
          {data.contact?.linkedin && (
            <p>
              <i className="fab fa-linkedin"></i>{" "}
              <a href={data.contact.linkedin} target="_blank" rel="noreferrer">{data.contact.linkedin}</a>
            </p>
          )}
          {data.resume && (
            <a href={data.resume} download className="cta-button resume-button">
              Download Resume
            </a>
          )}
        </section>
      </Section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} {data.name}. Built with React</p>
        <p>All rights reserved</p>
        <p>Designed with a focus on user experience</p>
      </footer>

      {/* Scroll to Top */}
      <ScrollToTop />
    </div>
  );
}
