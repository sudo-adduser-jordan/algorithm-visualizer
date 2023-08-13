import "./home.css";
import { Link } from "react-router-dom";

import { LuBarChart3 } from "react-icons/lu";
import { RiRoadMapLine } from "react-icons/ri";

import react from "../assets/react.png";
import typescript from "../assets/typescript.png";
import esbuild from "../assets/esbuild.png";
import eslint from "../assets/eslint.png";
import prettier from "../assets/prettier.png";

export default function Home() {
  return (
    <>
      <main className="home-container">
        <section className="algorithm-container">
          <div className="algorithm-item">
            <LuBarChart3 className="icon" size={25} />
            <Link to={`/sort`}>Sorting</Link>
          </div>
          <div className="algorithm-item">
            <RiRoadMapLine className="icon" size={25} />
            <Link to={`/path`}>Path Finding</Link>
          </div>
        </section>

        <section className="technology-container">
          Technologies
          <div className="image-container">
            <img src={react} alt="" style={{ width: "3rem", height: "3rem" }} />
            <img src={typescript} alt="" style={{ width: "3rem", height: "3rem" }} />
            <img src={esbuild} alt="" style={{ width: "3rem", height: "3rem" }} />
            <img src={eslint} alt="" style={{ width: "3rem", height: "3rem" }} />
            <img src={prettier} alt="" style={{ width: "3rem", height: "3rem" }} />
          </div>
        </section>
      </main>
    </>
  );
}
