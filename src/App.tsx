import {
  useEffect,
  useState,
  type ComponentType,
  type SVGProps,
} from "react";

import { getExperiences, getProfile, getProjects, getSkills } from "./api";

function IconBase(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    />
  );
}

const ArrowDown = (props: SVGProps<SVGSVGElement>) => (
  <IconBase {...props}>
    <path d="M12 4v12" />
    <path d="m6 18 6 6 6-6" />
  </IconBase>
);

const ArrowUpRight = (props: SVGProps<SVGSVGElement>) => (
  <IconBase {...props}>
    <path d="M7 17 17 7" />
    <path d="M8 7h9v9" />
  </IconBase>
);

const Code2 = (props: SVGProps<SVGSVGElement>) => (
  <IconBase {...props}>
    <path d="m9 8-5 4 5 4" />
    <path d="m15 8 5 4-5 4" />
    <path d="m13 4-2 16" />
  </IconBase>
);

const Database = (props: SVGProps<SVGSVGElement>) => (
  <IconBase {...props}>
    <ellipse cx="12" cy="5" rx="7" ry="3" />
    <path d="M5 5v8c0 1.7 3.1 3 7 3s7-1.3 7-3V5" />
    <path d="M5 13v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" />
  </IconBase>
);

const Globe2 = (props: SVGProps<SVGSVGElement>) => (
  <IconBase {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18" />
    <path d="M12 3a15 15 0 0 1 0 18" />
    <path d="M12 3a15 15 0 0 0 0 18" />
  </IconBase>
);

const Mail = (props: SVGProps<SVGSVGElement>) => (
  <IconBase {...props}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m4 7 8 6 8-6" />
  </IconBase>
);

const MapPin = (props: SVGProps<SVGSVGElement>) => (
  <IconBase {...props}>
    <path d="M12 21s6-5.7 6-12a6 6 0 1 0-12 0c0 6.3 6 12 6 12Z" />
    <circle cx="12" cy="9" r="2.5" />
  </IconBase>
);

const Menu = (props: SVGProps<SVGSVGElement>) => (
  <IconBase {...props}>
    <path d="M3 6h18" />
    <path d="M3 12h18" />
    <path d="M3 18h18" />
  </IconBase>
);

const Server = (props: SVGProps<SVGSVGElement>) => (
  <IconBase {...props}>
    <rect x="4" y="4" width="16" height="6" rx="2" />
    <rect x="4" y="14" width="16" height="6" rx="2" />
    <path d="M8 7h.01" />
    <path d="M8 17h.01" />
    <path d="M12 7h4" />
    <path d="M12 17h4" />
  </IconBase>
);

const ShieldCheck = (props: SVGProps<SVGSVGElement>) => (
  <IconBase {...props}>
    <path d="M12 3 5 6v6c0 4.2 2.7 7.7 7 9 4.3-1.3 7-4.8 7-9V6l-7-3Z" />
    <path d="m9 12 2 2 4-5" />
  </IconBase>
);

const Sparkles = (props: SVGProps<SVGSVGElement>) => (
  <IconBase {...props}>
    <path d="m12 2 1.8 5.2L19 9l-5.2 1.8L12 16l-1.8-5.2L5 9l5.2-1.8L12 2Z" />
    <path d="M19 14l.9 2.1L22 17l-2.1.9L19 20l-.9-2.1L16 17l2.1-.9L19 14Z" />
    <path d="M5 14l.9 2.1L8 17l-2.1.9L5 20l-.9-2.1L2 17l2.1-.9L5 14Z" />
  </IconBase>
);

const X = (props: SVGProps<SVGSVGElement>) => (
  <IconBase {...props}>
    <path d="M5 5 19 19" />
    <path d="M19 5 5 19" />
  </IconBase>
);

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
