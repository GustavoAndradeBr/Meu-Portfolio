import "./Header.css";

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
