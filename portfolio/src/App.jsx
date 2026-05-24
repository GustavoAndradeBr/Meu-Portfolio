import { Analytics } from '@vercel/analytics/react';
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Header />
      <Main />
      <Footer />
      <Analytics />
    </>
  );
}

export default App;
