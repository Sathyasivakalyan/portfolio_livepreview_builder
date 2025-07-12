import React from "react";
import "../App.css";

export default function PortfolioPreview({ data }) {
  const {
    profilePic,
    resume,
    name,
    bio,
    contact = {},
    education = [],
    experience = [],
    awards = [],
    skills = [],
    projects = [],
  } = data;

  return (
    <div
      className="preview"
      style={{
        padding: "2rem",
        backgroundColor: "#f9f9f9",
        border: "1px solid #ddd",
        borderRadius: "1rem",
        marginTop: "2rem",
      }}
    >
      {/* Profile Section */}
      {profilePic && (
        <div className="profile-pic-container" style={{ textAlign: "center", marginBottom: "1rem" }}>
          <img
            src={profilePic}
            alt="Profile"
            className="profile-pic"
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "2px solid #6366f1",
            }}
          />
        </div>
      )}

      <h2 style={{ textAlign: "center" }}>{name}</h2>
      <p style={{ textAlign: "center", maxWidth: "600px", margin: "auto" }}>{bio}</p>

      {/* Skills */}
      {skills.length > 0 && (
        <>
          <h3>🧠 Skills</h3>
          <ul>
            {Array.isArray(skills)
              ? skills.map((skill, idx) => <li key={idx}>{skill}</li>)
              : skills.split(",").map((skill, idx) => <li key={idx}>{skill.trim()}</li>)}
          </ul>
        </>
      )}

      {/* Education */}
      {education.length > 0 && (
        <>
          <h3>🎓 Education</h3>
          <ul>
            {education.map((item, idx) => (
              <li key={idx}>
                <strong>{item.title}</strong> - {item.subtitle}
              </li>
            ))}
          </ul>
        </>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <>
          <h3>💼 Experience</h3>
          <ul>
            {experience.map((item, idx) => (
              <li key={idx}>
                <strong>{item.title}</strong> - {item.subtitle}
              </li>
            ))}
          </ul>
        </>
      )}

      {/* Awards */}
      {awards.length > 0 && (
        <>
          <h3>🏆 Awards</h3>
          <ul>
            {awards.map((item, idx) => (
              <li key={idx}>
                <strong>{item.title}</strong> - {item.subtitle}
              </li>
            ))}
          </ul>
        </>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <>
          <h3>🛠️ Projects</h3>
          <ul>
            {projects.map((proj, idx) => (
              <li key={idx} style={{ marginBottom: "1rem" }}>
                <div className="project">
                  <strong>Title:</strong> {proj.title}<br />
                  <strong>Description:</strong> {proj.description}<br />
                  {proj.tech && <div><strong>Tech:</strong> {proj.tech}</div>}
                  {proj.live && (
                    <div>
                      <a href={proj.live} target="_blank" rel="noreferrer">
                        🔗 Live
                      </a>
                    </div>
                  )}
                  {proj.github && (
                    <div>
                      <a href={proj.github} target="_blank" rel="noreferrer">
                        🐙 GitHub
                      </a>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </>
      )}

      {/* Contact */}
      <h3>📞 Contact</h3>
      <ul>
        {contact.email && <li>📧 {contact.email}</li>}
        {contact.phone && <li>📞 {contact.phone}</li>}
        {contact.github && (
          <li>
            <a href={contact.github} target="_blank" rel="noreferrer">GitHub</a>
          </li>
        )}
        {contact.linkedin && (
          <li>
            <a href={contact.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          </li>
        )}
        {contact.twitter && (
          <li>
            <a href={contact.twitter} target="_blank" rel="noreferrer">Twitter</a>
          </li>
        )}
        {contact.instagram && (
          <li>
            <a href={contact.instagram} target="_blank" rel="noreferrer">Instagram</a>
          </li>
        )}
        {contact.facebook && (
          <li>
            <a href={contact.facebook} target="_blank" rel="noreferrer">Facebook</a>
          </li>
        )}
      </ul>

      {/* Resume */}
      {resume && (
        <div style={{ marginTop: "1rem" }}>
          <a href={resume} target="_blank" rel="noreferrer">
            📄 View Resume
          </a>
        </div>
      )}

      {/* View Full Button */}
      <div style={{ marginTop: "2rem", textAlign: "center" }}>
        <button
          onClick={() => {
            localStorage.setItem("portfolioData", JSON.stringify(data));
            window.open("/opennewwebsite", "_blank");
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          View Full Portfolio ↗
        </button>
      </div>
    </div>
  );
}
