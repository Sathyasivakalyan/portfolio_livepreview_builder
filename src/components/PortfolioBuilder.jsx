// src/Components/PortfolioBuilder.jsx
import React, { useState } from "react";
import "../App.css";

export default function PortfolioBuilder({ onDataChange = () => {} }) {
  const [data, setData] = useState({
    name: "",
    bio: "",
    profilePic: "",
    resume: "",
    contact: {
      email: "",
      phone: "",
      github: "",
      linkedin: "",
      twitter: "",
      facebook: "",
      instagram: "",
    },
    education: [],
    experience: [],
    awards: [],
    skills: [],
    projects: [],
  });

  // 🔹 Update local state and parent
  const updateData = (updated) => {
    setData(updated);
    onDataChange(updated);
  };

  // 🔹 Handle input fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name.includes("contact.")) {
      const key = name.split(".")[1];
      const updatedContact = { ...data.contact, [key]: value };
      updateData({ ...data, contact: updatedContact });
    } else {
      updateData({ ...data, [name]: value });
    }
  };

  // 🔹 Handle array changes (education, experience, awards, projects)
  const handleArrayChange = (field, index, key, value) => {
    const updatedArray = [...data[field]];
    updatedArray[index] = { ...updatedArray[index], [key]: value };
    updateData({ ...data, [field]: updatedArray });
  };

  const addItem = (field) => {
    let newItem;
    if (field === "skills") newItem = "";
    else if (field === "projects")
      newItem = { title: "", description: "", tech: "", live: "", github: "", image: "" };
    else newItem = { title: "", subtitle: "" };

    updateData({ ...data, [field]: [...data[field], newItem] });
  };

  return (
    <div className="builder">
      <h2>Portfolio Builder</h2>

      {/* 🔹 Basic Info */}
      <input
        name="name"
        placeholder="Your Name"
        value={data.name}
        onChange={handleInputChange}
      />
      <textarea
        name="bio"
        placeholder="Your Bio"
        value={data.bio}
        onChange={handleInputChange}
      />

      {/* 🔹 Profile Picture */}
      <h3>🖼️ Profile Picture</h3>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
              updateData({ ...data, profilePic: reader.result });
            };
            reader.readAsDataURL(file);
          }
        }}
      />
      {data.profilePic && (
        <img
          src={data.profilePic}
          alt="Profile Preview"
          style={{
            marginTop: "1rem",
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            objectFit: "cover",
            border: "2px solid #6366f1",
          }}
        />
      )}

      {/* 🔹 Resume */}
      <h3>📄 Resume</h3>
      <input
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) {
            const resumeURL = URL.createObjectURL(file);
            updateData({ ...data, resume: resumeURL });
          }
        }}
      />
      {data.resume && (
        <p style={{ marginTop: "0.5rem" }}>
          ✅ Resume uploaded –{" "}
          <a href={data.resume} target="_blank" rel="noreferrer">
            Preview
          </a>
        </p>
      )}

      {/* 🔹 Contact */}
      <h3>📞 Contact Information</h3>
      {Object.keys(data.contact).map((key) => (
        <input
          key={key}
          name={`contact.${key}`}
          placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
          value={data.contact[key]}
          onChange={handleInputChange}
        />
      ))}

      {/* 🔹 Education */}
      <h3>🎓 Education</h3>
      {data.education.map((edu, i) => (
        <div key={i}>
          <input
            placeholder="School / College"
            value={edu.title}
            onChange={(e) => handleArrayChange("education", i, "title", e.target.value)}
          />
          <input
            placeholder="Grade / CGPA"
            value={edu.subtitle}
            onChange={(e) => handleArrayChange("education", i, "subtitle", e.target.value)}
          />
        </div>
      ))}
      <button onClick={() => addItem("education")}>+ Add Education</button>

      {/* 🔹 Experience */}
      <h3>💼 Experience</h3>
      {data.experience.map((exp, i) => (
        <div key={i}>
          <input
            placeholder="Company"
            value={exp.title}
            onChange={(e) => handleArrayChange("experience", i, "title", e.target.value)}
          />
          <input
            placeholder="Role"
            value={exp.subtitle}
            onChange={(e) => handleArrayChange("experience", i, "subtitle", e.target.value)}
          />
        </div>
      ))}
      <button onClick={() => addItem("experience")}>+ Add Experience</button>

      {/* 🔹 Awards */}
      <h3>🏆 Awards</h3>
      {data.awards.map((award, i) => (
        <div key={i}>
          <input
            placeholder="Award"
            value={award.title}
            onChange={(e) => handleArrayChange("awards", i, "title", e.target.value)}
          />
          <input
            placeholder="Year / Organization"
            value={award.subtitle}
            onChange={(e) => handleArrayChange("awards", i, "subtitle", e.target.value)}
          />
        </div>
      ))}
      <button onClick={() => addItem("awards")}>+ Add Award</button>

      {/* 🔹 Skills */}
      <h3>🧠 Skills</h3>
      {data.skills.map((skill, i) => (
        <input
          key={i}
          placeholder="Skill"
          value={skill}
          onChange={(e) => {
            const updated = [...data.skills];
            updated[i] = e.target.value;
            updateData({ ...data, skills: updated });
          }}
        />
      ))}
      <button onClick={() => addItem("skills")}>+ Add Skill</button>

      {/* 🔹 Projects */}
      <h3>🛠️ Projects</h3>
      {data.projects.map((proj, i) => (
        <div key={i} className="project-card">
          <input
            placeholder="Project Title"
            value={proj.title}
            onChange={(e) => handleArrayChange("projects", i, "title", e.target.value)}
          />
          <input
            placeholder="Description"
            value={proj.description}
            onChange={(e) => handleArrayChange("projects", i, "description", e.target.value)}
          />
          <input
            placeholder="Tech Used"
            value={proj.tech}
            onChange={(e) => handleArrayChange("projects", i, "tech", e.target.value)}
          />
          <input
            placeholder="Live Link"
            value={proj.live}
            onChange={(e) => handleArrayChange("projects", i, "live", e.target.value)}
          />
          <input
            placeholder="GitHub Link"
            value={proj.github}
            onChange={(e) => handleArrayChange("projects", i, "github", e.target.value)}
          />

          <label>Project Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                  const updated = [...data.projects];
                  updated[i] = { ...updated[i], image: reader.result };
                  updateData({ ...data, projects: updated });
                };
                reader.readAsDataURL(file);
              }
            }}
          />

          {proj.image && (
            <img
              src={proj.image}
              alt="Project Preview"
              style={{
                marginTop: "0.5rem",
                width: "100%",
                maxHeight: "180px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
          )}
        </div>
      ))}
      <button onClick={() => addItem("projects")}>+ Add Project</button>
    </div>
  );
}
