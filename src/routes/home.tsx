import "./home.css";
import { Link } from "react-router-dom";

import { LuBarChart3 } from "react-icons/lu";
import { RiRoadMapLine } from "react-icons/ri";

import react from "../assets/react.png";
import typescript from "../assets/typescript.png";
import esbuild from "../assets/esbuild.png";
import eslint from "../assets/eslint.png";
import prettier from "../assets/prettier.png";
import sort from "../assets/sort.png";
import path from "../assets/path.png";

export default function Home() {
  return (
    <>
      <main className="home-container">
        <section className="algorithm-container">
          <Link to={`/sort`} className="algorithm-item">
            <div className="algorithm-title">
              <LuBarChart3 className="icon" size={25} />
              Sorting
            </div>
            <img
              src={sort}
              alt=""
              style={{
                width: "20rem",
                height: "10rem",
                border: "solid 1px",
                borderRadius: "5px",
                borderColor: "mediumslateblue",
              }}
            />
          </Link>
          <Link to={`/path`} className="algorithm-item">
            <div className="algorithm-title">
              <RiRoadMapLine className="icon" size={25} />
              Path Finding
            </div>
            <img
              src={path}
              alt=""
              style={{
                width: "20rem",
                height: "10rem",
                border: "solid 1px",
                borderRadius: "5px",
                borderColor: "mediumslateblue",
              }}
            />
          </Link>
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
