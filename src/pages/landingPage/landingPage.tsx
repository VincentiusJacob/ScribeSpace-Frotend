import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import "./landingPage.css";

const LandingPage: React.FC = () => {
  // Fungsi untuk menangani klik pada "Write"
  const handleWriteClick = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (!isLoggedIn) {
      Swal.fire({
        title: "You need to log in first",
        text: "Please sign in to write an article.",
        icon: "warning",
        confirmButtonText: "OK",
      });
    } else {
      window.location.href = "/write"; // Arahkan ke halaman menulis artikel
    }
  };

  // Fungsi untuk menangani klik pada "Start reading"
  const handleReadClick = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (!isLoggedIn) {
      Swal.fire({
        title: "You need to log in first",
        text: "Please sign in to start reading.",
        icon: "warning",
        confirmButtonText: "OK",
      });
    } else {
      window.location.href = "/home"; // Arahkan ke halaman membaca artikel (sesuaikan dengan path)
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h1> ScribeSpace </h1>
        <ul className="navigationlist">
          <li>
            <Link to="/ourstory"> Our Story</Link>
          </li>
          <li>
            <Link to="/" onClick={handleWriteClick}>
              {" "}
              Write
            </Link>{" "}
          </li>
          <li>
            <Link to="/login"> Sign in</Link>
          </li>
        </ul>
        <Link to="/registration" className="button">
          Get Started
        </Link>
      </div>
      <div className="body">
        <div className="bodyleft">
          <h1> Inspiration is everywhere</h1>
          <p> A place to read, write, and deepen your understanding</p>
          <button className="button" onClick={handleReadClick}>
            {" "}
            Start reading
          </button>{" "}
        </div>
        <div className="bodyright"></div>
      </div>
      <div className="footer">
        <ul className="navigationlist">
          <li>
            <Link to="/help"> Help </Link>
          </li>
          <li>
            <Link to="/about"> About</Link>
          </li>
          <li>
            <Link to="/status"> Status</Link>
          </li>
          <li>
            <Link to="/teams"> Teams </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LandingPage;
