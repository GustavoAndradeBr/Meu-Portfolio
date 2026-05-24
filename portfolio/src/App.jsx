import { SpeedInsights } from "@vercel/speed-insights/react";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Header />
      <Main />
      <Footer />
      <SpeedInsights />
    </>
  );
}

export default App;
