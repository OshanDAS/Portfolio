import React, { useState, useEffect } from 'react';
import './App.css';
import projectsData from './data/projects.json';
import skillsData from './data/skills.json';

const App = () => {
  const [expandedProject, setExpandedProject] = useState(null);
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const phrases = [
    'Computer Science Undergraduate',
    'Full Stack Web Developer',
    'Passionate Tech Enthusiast',
    'Problem Solver',
    'Creative Thinker'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhrase((prev) => (prev + 1) % phrases.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [phrases.length]);

  const projects = projectsData;

  const skills = skillsData;

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleProject = (id) => {
    setExpandedProject(expandedProject === id ? null : id);
  };

  const openPanel = (project) => {
    setSelectedProject(project);
  };

  const closePanel = () => {
    setSelectedProject(null);
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Portfolio</h1>
        <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
          ☰
        </button>
        <nav className={`nav ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          <ul className="nav-links">
            <li className="nav-link" onClick={() => scrollToSection('about')}>About</li>
            <li className="nav-link" onClick={() => scrollToSection('projects')}>Projects</li>
            <li className="nav-link" onClick={() => scrollToSection('skills')}>Skills</li>
            <li className="nav-link" onClick={() => scrollToSection('education')}>Education</li>
            <li className="nav-link" onClick={() => scrollToSection('contact')}>Contact</li>
          </ul>
        </nav>
      </header>

      <main className="container">
        <section className="hero section">
          <div className="hero-content">
            <h1>
              <span>Hi, I'm</span>
              Sithija Oshan
            </h1>
            <div className="rotating-text" key={currentPhrase}>
              {phrases[currentPhrase]}
            </div>
            <p className="hero-description">
              Aspiring software developer with a passion for creating innovative solutions. 
              Currently pursuing Computer Science and building projects that make a difference. 
              Always eager to learn new technologies and collaborate on exciting challenges.
            </p>
          </div>
          <div className="hero-photo">
            <div className="profile-photo">
              <img src="/profPicProfessional.png" alt="Profile" />
            </div>
          </div>
        </section>

        <section id="about" className="section">
          <h2>Who Am I?</h2>
          <p>
            I am a Computer Science undergraduate with a strong interest in software engineering and full-stack application development. I have hands-on experience designing and building real-world systems using Java, Spring Boot, MySQL, and modern frontend frameworks such as React and React Native. Through academic and personal projects, I have worked on end-to-end solutions involving RESTful APIs, database design, cloud deployment, and user-focused interfaces.
          </p>
          <br></br>
          <p>
            I am naturally curious and enjoy learning new technologies, tools, and concepts that help me improve as a developer. I enjoy exploring how systems work under the hood and continuously seek opportunities to expand my knowledge and refine my skills. With a solid foundation in core computer science concepts and a passion for problem-solving, I aim to grow as a software engineer while contributing to impactful, well-engineered solutions.
          </p>
        </section>

        <section id="education" className="section">
          <h2>Education</h2>
          <div className="education-card">
            <div className="education-header">
              <div className="education-icon">🎓</div>
              <div className="education-info">
                <h3>BSc. (Hons) Computer Science</h3>
                <p className="university">Sri Lanka Institute of Information Technology</p>
                <p className="duration">2023 - 2027 (Expected)</p>
              </div>
            </div>
            <div className="coursework">
              <h4>Relevant Coursework</h4>
              <div className="coursework-list">
                <span className="course-tag">Data Structures</span>
                <span className="course-tag">Algorithms</span>
                <span className="course-tag">Web Development</span>
                <span className="course-tag">Database Systems</span>
                <span className="course-tag">Software Engineering</span>
                <span className="course-tag">OOP</span>
                <span className="course-tag">Operating Systems</span>
                <span className="course-tag">Computer Networks</span>
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="section">
          <h2>Projects</h2>
          <div className="projects-grid">
            {projects.map(project => (
              <div 
                key={project.id} 
                className="project-item"
                onClick={() => openPanel(project)}
              >
                <div className="project-header">
                  <div>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                  </div>
                  <span className="expand-icon">→</span>
                </div>
              </div>
            ))}
            <a 
              href="https://github.com/OshanDAS" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="more-projects-card"
            >

              <h3>Want to see more?</h3>
              <p>Check out all my projects on GitHub</p>
            </a>
          </div>
        </section>

        <div className={`side-panel-overlay ${selectedProject ? 'open' : ''}`} onClick={closePanel}></div>
        <div className={`side-panel ${selectedProject ? 'open' : ''}`}>
          {selectedProject && (
            <>
              <div className="side-panel-header">
                <h3>{selectedProject.title}</h3>
                <button className="close-panel" onClick={closePanel}>×</button>
              </div>
              <div className="project-tech">
                {selectedProject.tech.split(', ').map((tech, index) => (
                  <span key={index} className="tech-badge">{tech}</span>
                ))}
              </div>
              <p className="details">{selectedProject.details}</p>
              <a href={selectedProject.github} target="_blank" rel="noopener noreferrer" className="github-link">
                <span>🔗</span> View on GitHub
              </a>
            </>
          )}
        </div>

        <section id="skills" className="section">
          <h2>Skills</h2>
          <div className="skills-container">
            {Object.entries(skills).map(([category, skillList]) => (
              <div key={category} className="skill-category">
                <h3>{category}</h3>
                {skillList.map((skill, index) => (
                  <div key={index} className="skill-item">
                    <div className="skill-name">
                      <span>{skill.name}</span>
                      <span>{skill.level}%</span>
                    </div>
                    <div className="skill-bar">
                      <div className="skill-progress" style={{ width: `${skill.level}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="section">
          <h2>Contact</h2>
          <div className="contact-container">
            <p className="contact-intro">
              I'm always open to discussing new opportunities, collaborations, or just having a chat about technology!
            </p>
            <div className="contact-links">
              <a href="mailto:your.email@example.com" className="contact-link">
                <div className="contact-icon">📧</div>
                <div className="contact-info">
                  <div className="contact-label">Email</div>
                  <div className="contact-value">sithijaoshan6@gmail.com</div>
                </div>
              </a>
              <a href="tel:+94123456789" className="contact-link">
                <div className="contact-icon">📱</div>
                <div className="contact-info">
                  <div className="contact-label">Phone</div>
                  <div className="contact-value">+94 760254406</div>
                </div>
              </a>
              <div className="contact-link" style={{ cursor: 'default' }}>
                <div className="contact-icon">📍</div>
                <div className="contact-info">
                  <div className="contact-label">Location</div>
                  <div className="contact-value">Negombo, Sri Lanka</div>
                </div>
              </div>
              <a href="https://linkedin.com/in/sithija-oshan" target="_blank" rel="noopener noreferrer" className="contact-link">
                <div className="contact-icon">👤</div>
                <div className="contact-info">
                  <div className="contact-label">LinkedIn</div>
                  <div className="contact-value">linkedin.com/in/sithija-oshan</div>
                </div>
              </a>
              <a href="https://github.com/OshanDAS" target="_blank" rel="noopener noreferrer" className="contact-link">
                <div className="contact-icon">👨‍💻</div>
                <div className="contact-info">
                  <div className="contact-label">GitHub</div>
                  <div className="contact-value">github.com/OshanDAS</div>
                </div>
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default App;