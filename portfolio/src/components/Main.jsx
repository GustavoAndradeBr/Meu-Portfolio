import React, { useState, useEffect } from "react"; // 1. Importar hooks
import myPhoto from "../assets/asEU.png";
import "./Main.css";
import Knowledge from "./Knowledge";
import Projects from "./Projects";
import Contact from "./Contact";

export default function Main() {
  // Lista de palavras que irão alternar
  const words = [
    "FULL-STACK",
    "FRONT-END",
    "BACK-END",
    "UI/UX",
    "JAVASCRIPT",
    "REACT",
    "WEB",
  ];

  const [currentWord, setCurrentWord] = useState(words[0]);
  const [wordIndex, setWordIndex] = useState(0);

  // 2. Lógica para Trocar a Palavra
  useEffect(() => {
    const intervalId = setInterval(() => {
      setWordIndex((prevIndex) => {
        const newIndex = (prevIndex + 1) % words.length;
        setCurrentWord(words[newIndex]);
        return newIndex;
      });
    }, 2500); // Troca a cada 2.5 segundos

    // Função de limpeza
    return () => clearInterval(intervalId);
  }, [words]); // Adicionado 'words' ao array de dependências (apesar de ser constante, é boa prática)

  return (
    <main>
      <section id="Home" className="Home">
        <h1>Gustavo Andrade</h1>
        <h2>
          Desenvolvedor
          <span className="dynamic-word-container">{currentWord}</span>
        </h2>
        <p>Transformando ideias em experiências digitais interativas.</p>
      </section>

      <section id="About" className="About">
        <div id="sobreAlinhado">
          <h2>Sobre Mim</h2>
          <img
            src={myPhoto}
            alt="Imagem de arte pixelada, um garoto no computador"
          ></img>
        </div>
        <div id="TextAbout">
          <p>
            Olá! Sou Gustavo Andrade, Desenvolvedor apaixonado por transformar
            ideias em experiências digitais. Trabalho com React, JavaScript e
            CSS, criando interfaces modernas, rápidas e responsivas. Gosto de
            desenvolver sites pensados para o usuário, com navegação simples e
            uma experiência agradável.
          </p>
        </div>
      </section>
      <Knowledge></Knowledge>
      <Projects></Projects>
      <Contact></Contact>
    </main>
  );
}
