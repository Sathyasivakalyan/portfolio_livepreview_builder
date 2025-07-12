import React, { useState } from "react";

import "../App.css"

export default function PortfolioBuilder({ onDataChange = () => {} } ) {
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

  const handleArrayChange = (field, index, value, key) => {
    const newArray = [...data[field]];
    newArray[index] = { ...newArray[index], [key]: value };
    setData({ ...data, [field]: newArray });
    onDataChange({ ...data, [field]: newArray });
  };

  const addItem = (field) => {
    const newItem = field === "skills" ? "" : { title: "", subtitle: "" };
    const updated = [...data[field], newItem];
    setData({ ...data, [field]: updated });
    onDataChange({ ...data, [field]: updated });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("contact.")) {
      const contactKey = name.split(".")[1];
      const updatedContact = { ...data.contact, [contactKey]: value };
      setData({ ...data, contact: updatedContact });
      onDataChange({ ...data, contact: updatedContact });
    } else {
      setData({ ...data, [name]: value });
      onDataChange({ ...data, [name]: value });
    }
  };

  return (
    <div className="builder">
      <h2>Portfolio Builder</h2>

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
      <h3>🖼️ Profile Picture</h3>
<input
  type="file"
  accept="image/*"
  onChange={(e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result;
        setData({ ...data, profilePic: base64Image });
        onDataChange({ ...data, profilePic: base64Image });
      };
      reader.readAsDataURL(file);
    }
  }}
/>

{data.profilePic && (
  <div style={{ marginTop: "1rem" }}>
    <img
      src={data.profilePic}
      alt="Profile Preview"
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

      <h3>📄 Resume</h3>
      <input
  type="file"
  accept=".pdf,.doc,.docx"
  onChange={(e) => {
    const file = e.target.files[0];
    if (file) {
      const resumeURL = URL.createObjectURL(file);
      setData({ ...data, resume: resumeURL });
      onDataChange({ ...data, resume: resumeURL });
    }
  }}
/>


      <h3>📞 Contact Information</h3>
      <input
        name="contact.email"
        placeholder="📧 Email"
        value={data.contact.email}
        onChange={handleInputChange}
      />
      <input
        name="contact.phone"
        placeholder="📱 Phone Number"
        value={data.contact.phone}
        onChange={handleInputChange}
      />
      <input
        name="contact.github"
        placeholder="💻 GitHub URL"
        value={data.contact.github}
        onChange={handleInputChange}
      />
      <input
        name="contact.linkedin"
        placeholder="🔗 LinkedIn URL"
        value={data.contact.linkedin}
        onChange={handleInputChange}
      />
      <input
        name="contact.twitter"
        placeholder="🐦 Twitter URL"
        value={data.contact.twitter}
        onChange={handleInputChange}
      />
      <input
        name="contact.instagram"
        placeholder="📸 Instagram URL"
        value={data.contact.instagram}
        onChange={handleInputChange}
      />
      <input
        name="contact.facebook"
        placeholder="📘 Facebook URL"
        value={data.contact.facebook}
        onChange={handleInputChange}
      />

      <h3>🎓 Education</h3>
      {data.education.map((item, i) => (
        <div key={i}>
          <input
            placeholder="School"
            value={item.title}
            onChange={(e) =>
              handleArrayChange("education", i, e.target.value, "title")
            }
          />
          <input
            placeholder="grade/CGPA"
            value={item.subtitle}
            onChange={(e) =>
              handleArrayChange("education", i, e.target.value, "subtitle")
            }
          />
        </div>
      ))}
      <button onClick={() => addItem("education")}>Add Education</button>

      <h3>💼 Experience</h3>
      {data.experience.map((item, i) => (
        <div key={i}>
          <input
            placeholder="Company"
            value={item.title}
            onChange={(e) =>
              handleArrayChange("experience", i, e.target.value, "title")
            }
          />
          <input
            placeholder="Role"
            value={item.subtitle}
            onChange={(e) =>
              handleArrayChange("experience", i, e.target.value, "subtitle")
            }
          />
        </div>
      ))}
      <button onClick={() => addItem("experience")}>Add Experience</button>

      <h3>🏆 Awards</h3>
      {data.awards.map((item, i) => (
        <div key={i}>
          <input
            placeholder="Award"
            value={item.title}
            onChange={(e) =>
              handleArrayChange("awards", i, e.target.value, "title")
            }
          />
          <input
            placeholder="Year / Organization"
            value={item.subtitle}
            onChange={(e) =>
              handleArrayChange("awards", i, e.target.value, "subtitle")
            }
          />
        </div>
      ))}
      <button onClick={() => addItem("awards")}>Add Award</button>

      <h3>🧠 Skills</h3>
      {data.skills.map((s, i) => (
        <input
          key={i}
          placeholder="Skill"
          value={s}
          onChange={(e) => {
            const skills = [...data.skills];
            skills[i] = e.target.value;
            setData({ ...data, skills });
            onDataChange({ ...data, skills });
          }}
        />
      ))}
      <button onClick={() => addItem("skills")}>Add Skill</button>

      <h3>🛠️ Projects (Works)</h3>
      {data.projects.map((proj, i) => (
        <div key={i}>
          <input
            placeholder="Project Title"
            value={proj.title}
            onChange={(e) =>
              handleArrayChange("projects", i, e.target.value, "title")
            }
          />
          <input
            placeholder="Description"
            value={proj.description}
            onChange={(e) =>
              handleArrayChange("projects", i, e.target.value, "description")
            }
          />
          <input
            placeholder="Tech Used"
            value={proj.tech}
            onChange={(e) =>
              handleArrayChange("projects", i, e.target.value, "tech")
            }
          />
          <input
            placeholder="Live Link"
            value={proj.live}
            onChange={(e) =>
              handleArrayChange("projects", i, e.target.value, "live")
            }
          />
          <input
            placeholder="GitHub Link"
            value={proj.github}
            onChange={(e) =>
              handleArrayChange("projects", i, e.target.value, "github")
            }
          />
        </div>
      ))}
      <button onClick={() => addItem("projects")}>Add Project</button>
    </div>
  );
}
