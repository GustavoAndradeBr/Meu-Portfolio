import "./Knowledge.css";
import frontPhoto from "../assets/Front.png";
import backPhoto from "../assets/Back.png";

export default function Knowledge() {
  return (
    <section id="Knowledge" className="Knowledge">
      <h2>Conhecimentos</h2>

      <div className="grid">
        <div className="coluna">
          <h3>Front End</h3>
          <img src={frontPhoto}></img>
          <ul class="tech-tags">
            <li>TypeScript</li>
            <li>JavaScript</li>
            <li>React.js</li>
            <li>Vue.js</li>
            <li>Next.js</li>
            <li>Angular</li>
            <li>HTML5 / CSS3</li>
            <li>Tailwind CSS</li>
            <li>Sass</li>
            <li>Redux</li>
          </ul>
        </div>

        <div className="coluna">
          <h3>Back End</h3>
          <img src={backPhoto}></img>
          <ul class="tech-tags">
            <li>Node.js</li>
            <li>Express</li>
            <li>Python</li>
            <li>Django</li>
            <li>Java</li>
            <li>Spring Boot</li>
            <li>MongoDB</li>
            <li>PostgreSQL</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
