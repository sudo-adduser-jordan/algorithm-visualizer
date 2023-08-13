import "./home.css";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <main className="home-container">
        <section>
          <Link to={`/sort`} className="home-item">
            Sort
          </Link>
          <Link to={`/path`} className="home-item">
            Path
          </Link>
        </section>
      </main>
    </>
  );
}
