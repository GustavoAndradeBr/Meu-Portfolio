import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Projects.css";

const projects = [
  {
    title: "Shop Britto",
    description:
      "Atuei no desenvolvimento do site da Shop Britto, sendo responsável pela implementação do menu de navegação, lógica do header e refinamentos em CSS, garantindo melhor experiência e consistência visual.",
    tags: ["JavaScript", "Tailwind CSS", "Shopify", "Liquid"],
    link: "https://www.shopbritto.com/?srsltid=AfmBOoo7Q07vw59kfxecHNuFCAXlXUDcVC9Pb-6ZRMKBDmYKCQTYmLVG",
    video: "/videos/Rom.mp4",
    featured: true,
  },
  {
    title: "Meu Portfólio Pessoal",
    description:
      "Portfólio pessoal desenvolvido com React, JavaScript, CSS e Framer Motion, focado em design moderno e experiência fluida.",
    tags: ["React", "Framer Motion", "JavaScript", "CSS"],
    link: "https://seusite.com",
    video: "/videos/Meu.mp4",
    featured: true,
  },
  {
    title: "Meu Casamento (EM DESENVOLVIMENTO)",
    description:
      "Desenvolvi um site de casamento interativo, com foco em experiência do usuário, animações suaves e design moderno, permitindo apresentação do evento, confirmação de presença e interação com convidados.",
    tags: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Node.js"],
    link: "",
    video: "/videos/Meucasa.mp4",
    featured: true,
  },
  {
    title: "Olfati Store",
    description:
      "Projeto de e-commerce desenvolvido na Shopify, com foco na criação do menu, lógica do header e ajustes visuais. Projeto ainda não publicado.",
    tags: ["JavaScript", "Tailwind CSS", "Shopify", "Liquid"],
    link: "https://www.lojaolfati.com.br/",
    video: "/videos/Olfati.mp4",
  },
  {
    title: "Metallica Store",
    description:
      "Projeto de e-commerce desenvolvido na Shopify, com foco na criação do menu e responsividade mobile, lógica do header e ajustes visuais no footer. Projeto ainda não publicado.",
    tags: ["JavaScript", "Tailwind CSS", "Shopify", "Liquid"],
    link: "https://www.metallicaacessorios.com.br",
    video: "/videos/Metal.mp4",
  },
  {
    title: "Dr Ortop Lucas (EM DESENVOLVIMENTO)",
    description:
      "Site desenvolvido para médico ortopedista em Ribeirão Preto, com projeto completo que abrange desde a definição de metadados até a construção do design, utilizando tecnologias simples, modernas e eficientes para garantir desempenho e boa experiência ao usuário.",
    tags: ["Tailwind CSS", "HTML", "Framer Motion", "JavaScript"],
    link: "",
    video: "/videos/DrOrtopLucas.mp4",
  },
];

function getVisible() {
  if (window.innerWidth < 640) return 1;
  if (window.innerWidth < 950) return 2;
  return 3;
}

function CardMedia({ image, video, title }) {
  const videoRef = useRef(null);

  const handleMouseEnter = () => videoRef.current?.play();
  const handleMouseLeave = () => {
    if (!videoRef.current) return;
    videoRef.current.pause();
    videoRef.current.currentTime = 0;
  };

  if (video) {
    return (
      <div
        className="project-image"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <video
          ref={videoRef}
          src={video}
          muted
          playsInline
          loop
          preload="metadata"
          className="project-video"
        />
      </div>
    );
  }
  if (image) {
    return (
      <div className="project-image">
        <img src={image} alt={title} />
      </div>
    );
  }
  return (
    <div className="project-image">
      <div className="project-placeholder">🖥️</div>
    </div>
  );
}

export default function Projects() {
  const [visibleCount, setVisibleCount] = useState(getVisible);
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      const newVisible = getVisible();
      setVisibleCount(newVisible);
      setPage(0);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalPages = Math.ceil(projects.length / visibleCount);

  const next = () => {
    setDirection(1);
    setPage((p) => (p + 1) % totalPages);
  };

  const prev = () => {
    setDirection(-1);
    setPage((p) => (p - 1 + totalPages) % totalPages);
  };

  const visible = projects.slice(
    page * visibleCount,
    page * visibleCount + visibleCount,
  );

  return (
    <section id="Projects" className="Projects">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        Meus Projetos
      </motion.h2>

      <div className="projects-carousel">
        <button className="arrow" onClick={prev}>
          ‹
        </button>

        <div className="projects-track">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={page}
              className="projects-page"
              custom={direction}
              initial={{ opacity: 0, x: direction * 80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -80 }}
              transition={{ duration: 0.35 }}
            >
              {visible.map((project, i) => (
                <a
                  key={i}
                  href={project.link || undefined}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`project-card ${project.featured ? "project-card--featured" : ""}`}
                >
                  {project.featured && (
                    <div className="featured-shine" aria-hidden="true" />
                  )}
                  {project.featured && (
                    <span className="featured-badge">✦ destaque</span>
                  )}
                  <CardMedia
                    image={project.image}
                    video={project.video}
                    title={project.title}
                  />
                  <div className="project-info">
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <ul className="tech-tags">
                      {project.tags.map((tag) => (
                        <li key={tag}>{tag}</li>
                      ))}
                    </ul>
                  </div>
                </a>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <button className="arrow" onClick={next}>
          ›
        </button>
      </div>

      <div className="dots">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            className={`dot ${i === page ? "active" : ""}`}
            onClick={() => {
              setDirection(i > page ? 1 : -1);
              setPage(i);
            }}
          />
        ))}
      </div>
    </section>
  );
}
