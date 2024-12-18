import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { FaPen, FaBook, FaUsers, FaQuestionCircle } from "react-icons/fa";
import "./landingPage.css";

const LandingPage: React.FC = () => {
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
      window.location.href = "/write";
    }
  };

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
      window.location.href = "/home";
    }
  };

  return (
    <div className="landing-page">
      {/* Header Section */}
      <motion.header
        className="header"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="logo">
          <h1>ScribeSpace</h1>
        </div>
        <nav className="navigation">
          <ul className="navigation-list">
            <li>
              <Link to="/ourstory">Our Story</Link>
            </li>
            <li>
              <Link to="/" onClick={handleWriteClick}>
                Write
              </Link>
            </li>
            <li>
              <Link to="/login">Sign in</Link>
            </li>
          </ul>
          <Link to="/registration" className="button primary-button">
            Get Started
          </Link>
        </nav>
      </motion.header>

      {/* Hero Section */}
      <motion.div
        className="hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="hero-text"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1>Inspiration is everywhere</h1>
          <p>
            ScribeSpace is a platform where ideas come to life. Read articles,
            share stories, and explore endless possibilities.
          </p>
          <button className="button primary-button" onClick={handleReadClick}>
            Start Reading
          </button>
        </motion.div>
        <motion.div
          className="hero-image"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src="https://via.placeholder.com/500x300"
            alt="Inspiration everywhere"
          />
        </motion.div>
      </motion.div>

      {/* Features Section */}
      <motion.section
        className="features"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <h2>Why Choose ScribeSpace?</h2>
        <div className="feature-list">
          <motion.div
            className="feature-item"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <FaPen className="feature-icon" />
            <h3>Write</h3>
            <p>Share your stories and ideas with a global audience.</p>
          </motion.div>
          <motion.div
            className="feature-item"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <FaBook className="feature-icon" />
            <h3>Read</h3>
            <p>Discover articles and insights from around the world.</p>
          </motion.div>
          <motion.div
            className="feature-item"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <FaUsers className="feature-icon" />
            <h3>Community</h3>
            <p>Connect with like-minded individuals and collaborate.</p>
          </motion.div>
          <motion.div
            className="feature-item"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <FaQuestionCircle className="feature-icon" />
            <h3>Support</h3>
            <p>We're here to help you every step of the way.</p>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer Section */}
      <motion.footer
        className="footer"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="footer-links">
          <ul className="navigation-list">
            <li>
              <Link to="/help">Help</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/status">Status</Link>
            </li>
            <li>
              <Link to="/teams">Teams</Link>
            </li>
          </ul>
        </div>
        <p>&copy; 2024 ScribeSpace. All Rights Reserved.</p>
      </motion.footer>
    </div>
  );
};

export default LandingPage;
