import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import myPhoto from "../assets/asEu.png";
import "./Main.css";
import Knowledge from "./Knowledge";
import Projects from "./Projects";
import Contact from "./Contact";

const words = [
  "FULL-STACK",
  "FRONT-END",
  "BACK-END",
  "UI/UX",
  "JAVASCRIPT",
  "REACT",
  "WEB",
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay },
  }),
};

export default function Main() {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 2500);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <main>
      <section id="Home" className="Home" aria-label="Apresentação">
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.1}
        >
          Gustavo Andrade
        </motion.h1>

        <motion.h2
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.3}
        >
          Desenvolvedor
          <span className="dynamic-word-container" aria-live="polite">
            {words[wordIndex]}
          </span>
        </motion.h2>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.5}
        >
          Código limpo. Interfaces que funcionam. Resultados reais.
        </motion.p>
      </section>

      <section id="About" className="About" aria-label="Sobre mim">
        <motion.div
          id="sobreAlinhado"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2>Sobre Mim</h2>
          <img src={myPhoto} alt="Arte pixelada de um garoto no computador" />
        </motion.div>

        <motion.div
          id="TextAbout"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <p>
            Olá! Sou Gustavo Andrade, desenvolvedor front-end apaixonado por
            criar interfaces modernas e funcionais. Gosto de transformar ideias
            em experiências digitais rápidas, responsivas e bem estruturadas,
            sempre focando na usabilidade. Trabalho com React, JavaScript e CSS,
            e atualmente estou expandindo minhas habilidades para o full-stack
            com Node.js e bancos de dados.
          </p>
        </motion.div>
      </section>

      <Knowledge />
      <Projects />
      <Contact />
    </main>
  );
}
