import "./navigation.css";
import { Link, useLocation } from "react-router-dom";
import { LuBarChart3 } from "react-icons/lu";
import { RiRoadMapLine } from "react-icons/ri";
import { FaGithub } from "react-icons/fa6";

export default function Navigation() {
  const location = useLocation();
  console.log(location.pathname.replace("/", ""));

  const route = location.pathname.replace("/", "");
  switch (route) {
    case "":
      return (
        <section className="navigation-container">
          <div className="title">
            <div>Algorithm Visualizer</div>
          </div>
          <Link
            to={"https://github.com/sudo-adduser-jordan/Algorithm-Visualizer"}
            target="_blank"
            className="right-container"
          >
            <FaGithub className="icon" size={25} />
          </Link>
        </section>
      );

    case "sort":
      return (
        <section className="navigation-container">
          <div className="title">
            <LuBarChart3 className="icon" size={25} />
            <div>Sorting Algorithms</div>
          </div>
          <Link to={`/`} className="item">
            Home
          </Link>
          <Link
            to={"https://github.com/sudo-adduser-jordan/Algorithm-Visualizer"}
            target="_blank"
            className="right-container"
          >
            <FaGithub className="icon" size={25} />
          </Link>
        </section>
      );

    case "path":
      return (
        <section className="navigation-container">
          <div className="title">
            <RiRoadMapLine className="icon" size={25} />
            <div style={{ paddingLeft: "5px" }}>Path Finding Algorithms</div>
          </div>
          <Link to={`/`} className="item">
            Home
          </Link>
          <Link
            to={"https://github.com/sudo-adduser-jordan/Algorithm-Visualizer"}
            target="_blank"
            className="right-container"
          >
            <FaGithub className="icon" size={25} />
          </Link>
        </section>
      );
  }
}
