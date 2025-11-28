import "./Header.css";
import HomePhoto from "../assets/home.svg";
// import AboutPhoto from "../assets/about.svg";
// import KnowPhoto from "../assets/know.svg";
// import ProjectsPhoto from "../assets/projects.svg";
// import ContactPhoto from "../assets/contact.svg";

export default function Header() {
  function toggleTheme() {
    document.body.classList.toggle("dark");
  }

  return (
    <header>
      <nav className="Menu">
        <a href="#Home">Home</a>
        <a href="#About">Sobre Mim</a>
        <a href="#Knowledge">Conhecimentos</a>
        <a href="#Projects">Projetos</a>
        <a href="#Contact">Contatos</a>
      </nav>

      <button onClick={toggleTheme} className="botaotema">
        ☾☼
      </button>
    </header>
  );
}
