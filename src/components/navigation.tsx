import "./navigation.css";
import { LuBarChart3 } from "react-icons/lu";

// type NavigationProps = {
//   data: string[];
//   title: string;
//   menu: {
//     items: string[];
//   };
// };

export default function Navigation() {
  return (
    <section className="navigation-container">
      <div className="title">
        <LuBarChart3 className="icon" size={25} />
        <div>Sorting Algorithms</div>
      </div>
      <div className="item">Home</div>
      <div className="item">Randomize</div>
      {/* <div>Path Algorithms</div> */}
    </section>
  );
}
