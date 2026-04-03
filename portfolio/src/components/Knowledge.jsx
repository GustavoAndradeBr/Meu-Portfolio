import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import "./Knowledge.css";

const frontEnd = [
  { name: "JavaScript", level: 65, rank: "A" },
  { name: "TypeScript", level: 50, rank: "B" },
  { name: "React.js", level: 55, rank: "B" },
  { name: "HTML5 / CSS3", level: 70, rank: "A" },
  { name: "Tailwind CSS", level: 60, rank: "B" },
];

const backEnd = [
  { name: "Node.js", learning: true },
  { name: "PostgreSQL", learning: true },
  { name: "Python", learning: true },
];

// rank → classe da barra
// "S+" usa a chave "splus" pois "+" não é válido em nome de classe CSS
const rankBarClass = {
  "S+": "bar-splus",
  S: "bar-gold",
  A: "bar-green",
  B: "bar-blue",
  C: "bar-gray",
};

// rank → classe do badge
const rankBadgeClass = {
  "S+": "rank-splus",
  S: "rank-s",
  A: "rank-a",
  B: "rank-b",
  C: "rank-c",
};

const colunas = [
  {
    titulo: "Front End",
    foto: "/images/Front.png",
    alt: "Ilustração pixel art front end",
    skills: frontEnd,
  },
  {
    titulo: "Back End",
    foto: "/images/Back.png",
    alt: "Ilustração pixel art back end",
    skills: backEnd,
  },
];

function SkillBar({ name, level, rank, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  const barClass = rankBarClass[rank] ?? "bar-blue";
  const badgeClass = rankBadgeClass[rank] ?? "rank-b";

  return (
    <motion.div
      ref={ref}
      className="skill-row"
      initial={{ opacity: 0, x: -16 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.35, delay: index * 0.07 }}
    >
      <div className="skill-meta">
        <span className="skill-name">{name}</span>
        <span className={`rank-badge ${badgeClass}`}>{rank}</span>
      </div>
      <div className="bar-track">
        <motion.div
          className={`bar-fill ${barClass}`}
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{
            duration: 0.9,
            delay: index * 0.07 + 0.15,
            ease: [0.4, 0, 0.2, 1],
          }}
        />
        <div className="bar-shine" />
      </div>
    </motion.div>
  );
}

function LearningBar({ name, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      className="skill-row"
      initial={{ opacity: 0, x: -16 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.35, delay: index * 0.07 }}
    >
      <div className="skill-meta">
        <span className="skill-name">{name}</span>
        <span className="rank-badge rank-learning">estudando</span>
      </div>
      <div className="bar-track">
        <div className="bar-loading">
          <div className="bar-loading-inner" />
        </div>
        <div className="bar-shine" />
      </div>
    </motion.div>
  );
}

export default function Knowledge() {
  return (
    <section id="Knowledge" className="Knowledge">
      <br />
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        Conhecimentos
      </motion.h2>

      <div className="knowledge-grid">
        {colunas.map((col, i) => (
          <motion.div
            key={col.titulo}
            className="coluna"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            viewport={{ once: true }}
          >
            <div className="coluna-header">
              <img src={col.foto} alt={col.alt} className="coluna-img" />
              <h3>{col.titulo}</h3>
              <p className="coluna-sub">skill tree</p>
            </div>

            <div className="skill-list">
              {col.skills.map((skill, idx) =>
                skill.learning ? (
                  <LearningBar key={skill.name} name={skill.name} index={idx} />
                ) : (
                  <SkillBar key={skill.name} {...skill} index={idx} />
                ),
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
