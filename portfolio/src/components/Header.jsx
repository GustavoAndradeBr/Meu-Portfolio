import { motion } from "framer-motion";
import "./Header.css";

export default function Header() {
  const toggleTheme = () => document.body.classList.toggle("dark");

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <nav className="Menu" aria-label="Navegação principal">
        {["Home", "Sobre Mim", "Conhecimentos", "Projetos", "Contatos"].map(
          (item, i) => {
            const hrefs = [
              "#Home",
              "#About",
              "#Knowledge",
              "#Projects",
              "#Contact",
            ];
            return (
              <motion.a
                key={item}
                href={hrefs[i]}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * i }}
              >
                {item}
              </motion.a>
            );
          },
        )}
      </nav>

      <motion.button
        onClick={toggleTheme}
        className="botaotema"
        aria-label="Alternar tema"
        whileHover={{ scale: 1.2, color: "#ffb703" }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        ☾☼
      </motion.button>
    </motion.header>
  );
}
