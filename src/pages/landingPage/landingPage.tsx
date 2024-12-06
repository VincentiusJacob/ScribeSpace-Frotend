import { Link } from "react-router-dom";
import "./landingPage.css";

const LandingPage: React.FC = () => {
  return (
    <div className="container">
      <div className="header">
        <h1> MEDIUM </h1>
        <ul className="navigationlist">
          <li>
            <a> Our Story</a>
          </li>
          <li>
            <a> Write</a>
          </li>
          <li>
            <Link to="/login"> Sign in</Link>
          </li>
        </ul>
        <Link to="/registration" className="button">
          {" "}
          Get Started
        </Link>
      </div>
      <div className="body">
        <div className="bodyleft">
          <h1> Inspiration is everywhere</h1>
          <p> A place to read, write, and deepen your understanding</p>
          <button className="button"> Start reading</button>
        </div>
        <div className="bodyright"></div>
      </div>
      <div className="footer">
        <ul className="navigationlist">
          <li>
            <a> Help </a>
          </li>
          <li>
            <a> About </a>
          </li>
          <li>
            <a> Status </a>
          </li>
          <li>
            <a> Teams </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LandingPage;
