import { motion } from "framer-motion";
import "./Footer.css";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <p>© 2025 Gustavo Andrade. Todos os direitos reservados.</p>
    </motion.footer>
  );
}
