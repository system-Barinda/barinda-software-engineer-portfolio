import { useEffect, useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  Code2,
  Database,
  Globe2,
  // Github,
  Mail,
  MapPin,
  Menu,
  Server,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";

import { getExperiences, getProfile, getProjects, getSkills } from "./api";

import type { Experience, Profile, Project, Skill } from "./types";
import { fallbackProfile, defaultSkills } from "./info";

function App() {
  const [profile, setProfile] = useState<Profile>(fallbackProfile);

  const [skills, setSkills] = useState<Skill[]>(defaultSkills);

  const [projects, setProjects] = useState<Project[]>([]);

  const [experiences, setExperiences] = useState<Experience[]>([]);

  const [menuOpen, setMenuOpen] = useState(false);

  const [contactSent, setContactSent] = useState(false);

  useEffect(() => {
    getProfile()
      .then(setProfile)
      .catch((error) => console.error("Failed to load profile:", error));

    getSkills()
      .then(setSkills)
      .catch((error) => console.error("Failed to load skills:", error));

    getProjects()
      .then(setProjects)
      .catch((error) => console.error("Failed to load projects:", error));

    getExperiences()
      .then(setExperiences)
      .catch((error) => console.error("Failed to load experiences:", error));
  }, []);

  const handleContact = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const name = String(formData.get("name") ?? "");

    const email = String(formData.get("email") ?? "");

    const subject = String(formData.get("subject") ?? "");

    const message = String(formData.get("message") ?? "");

    const mailto = `mailto:${profile.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`,
    )}`;

    window.location.href = mailto;

    setContactSent(true);
    form.reset();
  };

  const navigation = [
    ["About", "#about"],
    ["Skills", "#skills"],
    ["Projects", "#projects"],
    ["Experience", "#experience"],
    ["Contact", "#contact"],
  ];

  return (
    <div className="page">
      <header>
        <nav>
          <a className="logo" href="#home">
            <span>&lt;</span>
            barinda
            <span>/&gt;</span>
          </a>

          <div className="navlinks">
            {navigation.map(([label, href]) => (
              <a href={href} key={href}>
                {label}
              </a>
            ))}
          </div>

          <button
            className="menu"
            onClick={() => setMenuOpen((value) => !value)}
            aria-label="Toggle navigation"
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </nav>

        {menuOpen && (
          <div className="mobile">
            {navigation.map(([label, href]) => (
              <a href={href} key={href} onClick={() => setMenuOpen(false)}>
                {label}
              </a>
            ))}
          </div>
        )}
      </header>

      <main>
        <section id="home" className="hero">
          <div className="gridbg" />

          <div className="heroContent">
            <div>
              <p className="eyebrow">HELLO, I'M</p>

              <h1>
                {profile.name}
                <b>{profile.headline}</b>
              </h1>

              <p className="lead">{profile.summary}</p>

              <div className="buttons">
                <a className="primary" href="#projects">
                  Explore my work
                  <ArrowDown />
                </a>

                <a className="secondary" href="#contact">
                  Contact me
                  <ArrowUpRight />
                </a>
              </div>

              <div className="meta">
                <span>
                  <MapPin />
                  {profile.location}
                </span>

                <span>
                  <Code2 />
                  Clean code
                </span>

                <span>
                  <ShieldCheck />
                  Quality focused
                </span>
              </div>
            </div>

            <div className="codeCard">
              <div className="dots">
                <i />
                <i />
                <i />
              </div>

              <pre>{`const engineer = {
  name: "Barinda",
  role: "Software Engineer",
  focus: [
    "Architecture",
    "React",
    "TypeScript",
    "APIs",
    "Testing",
    "Databases"
  ]
};`}</pre>
            </div>
          </div>
        </section>

        <section id="about">
          <div className="wrap">
            <Heading
              n="01 / ABOUT"
              title="Engineering with purpose."
              text="I care about the parts of software that make products dependable: clear architecture, thoughtful APIs, useful tests, secure access and code that remains understandable as a project grows."
            />

            <div className="cards">
              <InfoCard
                icon={Server}
                title="Software Engineering"
                description="Building maintainable applications with clear architecture, reusable components and clean code."
              />

              <InfoCard
                icon={Database}
                title="Data & APIs"
                description="Designing structured data models and reliable APIs with clear contracts and validation."
              />

              <InfoCard
                icon={Sparkles}
                title="Engineering Craft"
                description="Continuous learning, testing, code review, documentation and deliberate engineering decisions."
              />
            </div>
          </div>
        </section>

        <section id="skills">
          <div className="wrap">
            <Heading
              n="02 / SKILLS"
              title="Tools I use to build."
              text="A practical technology stack focused on modern web development, software engineering and reliable applications."
            />

            <div className="skillgrid">
              {skills.map((skill) => (
                <article className="card" key={skill.category}>
                  <h3>{skill.category}</h3>

                  <p>{skill.description}</p>

                  <div className="tags">
                    {skill.skills.map((item) => (
                      <span key={item.name}>{item.name}</span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="projects">
          <div className="wrap">
            <Heading
              n="03 / SELECTED WORK"
              title="Projects that demonstrate how I think."
              text="Real projects are where engineering decisions become visible."
            />

            <div className="projectgrid">
              {projects.length > 0 ? (
                projects.map((project) => (
                  <ProjectCard project={project} key={project.id} />
                ))
              ) : (
                <article className="card">
                  <p>No projects available yet.</p>
                </article>
              )}
            </div>
          </div>
        </section>

        <section id="experience">
          <div className="wrap">
            <Heading
              n="04 / EXPERIENCE"
              title="My professional journey."
              text="A timeline of my professional growth and software engineering experience."
            />

            <div className="timeline">
              {experiences.length > 0 ? (
                experiences.map((experience) => (
                  <article key={experience.id}>
                    <small>{experience.period}</small>

                    <h3>{experience.role}</h3>

                    <b>{experience.company}</b>

                    <p>{experience.description}</p>

                    <ul>
                      {experience.responsibilities.map((responsibility) => (
                        <li key={responsibility}>{responsibility}</li>
                      ))}
                    </ul>

                    {experience.technologies.length > 0 && (
                      <div className="tags">
                        {experience.technologies.map((technology) => (
                          <span key={technology}>{technology}</span>
                        ))}
                      </div>
                    )}
                  </article>
                ))
              ) : (
                <article className="card">
                  <p>No experience information available yet.</p>
                </article>
              )}
            </div>
          </div>
        </section>

        <section className="stripe">
          <div className="wrap mini">
            <InfoCard
              icon={Globe2}
              title="Web Engineering"
              description="Responsive and accessible interfaces using modern frontend technologies."
            />

            <InfoCard
              icon={Database}
              title="Data & APIs"
              description="Structured data, API design, validation and reliable application logic."
            />

            <InfoCard
              icon={ShieldCheck}
              title="Quality & Security"
              description="Testing, validation, secure development and maintainable code."
            />
          </div>
        </section>

        <section id="contact">
          <div className="wrap contact">
            <div>
              <Heading
                n="05 / CONTACT"
                title="Let's build something useful."
                text="Have a project, opportunity or technical conversation in mind? I'd be happy to hear from you."
              />

              <div className="contactlinks">
                {profile.email && (
                  <a href={`mailto:${profile.email}`}>
                    <Mail />
                    {profile.email}
                  </a>
                )}

                {profile.githubUrl && (
                  <a href={profile.githubUrl} target="_blank" rel="noreferrer">
                    {/* <Github /> */}
                    GitHub
                    <ArrowUpRight />
                  </a>
                )}

                {profile.linkedInUrl && (
                  <a
                    href={profile.linkedInUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span aria-hidden="true">in</span>
                    LinkedIn
                    <ArrowUpRight />
                  </a>
                )}
              </div>
            </div>

            <form className="form" onSubmit={handleContact}>
              <div className="twocol">
                <label>
                  Name
                  <input name="name" required placeholder="Your name" />
                </label>

                <label>
                  Email
                  <input
                    name="email"
                    required
                    type="email"
                    placeholder="you@example.com"
                  />
                </label>
              </div>

              <label>
                Subject
                <input
                  name="subject"
                  required
                  placeholder="Let's work together"
                />
              </label>

              <label>
                Message
                <textarea
                  name="message"
                  required
                  minLength={5}
                  rows={6}
                  placeholder="Tell me about your project..."
                />
              </label>

              <button className="primary" type="submit">
                Send message
                <ArrowUpRight />
              </button>

              {contactSent && (
                <p className="success">
                  Your email application should open now.
                </p>
              )}
            </form>
          </div>
        </section>
      </main>

      <footer>
        <div className="wrap">
          <span>
            © {new Date().getFullYear()} {profile.name}
          </span>

          <span>React · TypeScript · Tailwind CSS · Vite</span>
        </div>
      </footer>
    </div>
  );
}

function InfoCard({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof Server;
  title: string;
  description: string;
}) {
  return (
    <article className="card">
      <Icon />
      <h3>{title}</h3>
      <p>{description}</p>
    </article>
  );
}

function Heading({
  n,
  title,
  text,
}: {
  n: string;
  title: string;
  text?: string;
}) {
  return (
    <div className="heading">
      <small>{n}</small>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="project card">
      <div className="projectImg">
        {project.image ? (
          <img src={project.image} alt={project.title} />
        ) : (
          <span>{"{ }"}</span>
        )}

        {project.featured && <em>Featured</em>}
      </div>

      <div className="projectBody">
        <h3>{project.title}</h3>

        <p>{project.summary}</p>

        <div className="tags">
          {project.technologies.map((technology) => (
            <span key={technology}>{technology}</span>
          ))}
        </div>

        <div className="projectLinks">
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noreferrer">
              {/* <Github /> */}
              Code
            </a>
          )}

          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noreferrer">
              Live
              <ArrowUpRight />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export default App;
