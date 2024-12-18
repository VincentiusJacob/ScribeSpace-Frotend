import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./landingPage.css";

gsap.registerPlugin(ScrollTrigger);
const LandingPage: React.FC = () => {
  useEffect(() => {
    // Header text animation with letter splitting
    gsap.from(".header h1", {
      duration: 2,
      text: { value: "ScribeSpace", delimiter: "" },
      ease: "power4.out",
    });

    // Navigation links pop-in with rotation
    gsap.from(".navigationlist li", {
      duration: 1.5,
      y: -50,
      opacity: 0,
      rotationX: 360,
      stagger: 0.2,
      ease: "back.out(2)",
    });

    // Button spinning entrance
    gsap.from(".button", {
      duration: 1.5,
      scale: 0.5,
      rotation: 360,
      opacity: 0,
      ease: "elastic.out(1, 0.75)",
    });

    // Body left section slide-in
    gsap.from(".bodyleft h1", {
      duration: 1,
      x: -150,
      opacity: 0,
      ease: "power3.out",
    });

    gsap.from(".bodyleft p", {
      duration: 1.5,
      x: -150,
      opacity: 0,
      delay: 0.3,
      ease: "power3.out",
    });

    gsap.from(".bodyleft button", {
      duration: 1.2,
      scale: 0,
      opacity: 0,
      ease: "bounce.out",
    });

    // Body right floating effect
    gsap.to(".bodyright", {
      y: 20,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // Scroll-triggered animations for about section
    gsap.from(".aboutContainer", {
      scrollTrigger: {
        trigger: ".aboutContainer",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
      x: -200,
      opacity: 0,
      duration: 1.5,
      ease: "power3.out",
    });

    // Our story container scroll-triggered animation
    gsap.from(".ourStoryContainer", {
      scrollTrigger: {
        trigger: ".ourStoryContainer",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
      y: 100,
      opacity: 0,
      duration: 1.5,
      ease: "power3.out",
    });

    // Team container pop-in effect
    gsap.from(".teamsContainer", {
      scrollTrigger: {
        trigger: ".teamsContainer",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
      opacity: 0,
      scale: 0.5,
      duration: 1.5,
      ease: "elastic.out(1, 0.5)",
    });

    // Footer bouncing effect on scroll
    gsap.from(".footer", {
      scrollTrigger: {
        trigger: ".footer",
        start: "top 90%",
        toggleActions: "play none none reverse",
      },
      y: 50,
      opacity: 0,
      duration: 1.5,
      ease: "bounce.out",
    });

    // Hover effect for navigation links
    const links = document.querySelectorAll(".navigationlist a");
    links.forEach((link) => {
      link.addEventListener("mouseenter", () => {
        gsap.to(link, {
          scale: 1.2,
          rotation: 15,
          duration: 0.3,
          ease: "power2.out",
        });
      });
      link.addEventListener("mouseleave", () => {
        gsap.to(link, {
          scale: 1,
          rotation: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      });
    });
  }, []);

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
      <div className="aboutContainer">
        <div className="aboutHeader">
          <h1>About ScribeSpace</h1>
          <p>
            ScribeSpace is a platform where creativity, ideas, and storytelling
            come to life. It is a place for writers, readers, and creators to
            share their stories, insights, and experiences with the world.
          </p>
        </div>

        <div className="aboutContent">
          <h2>Our Mission</h2>
          <p>
            Our mission is to empower individuals to express themselves through
            writing, foster creativity, and build a community of passionate
            storytellers. We aim to make it easier for people to connect, learn,
            and grow.
          </p>

          <h2>Our Values</h2>
          <ul>
            <li>Creativity</li>
            <li>Community</li>
            <li>Inclusivity</li>
            <li>Innovation</li>
          </ul>
        </div>
      </div>

      <div className="ourStoryContainer">
        <div className="storyHeader">
          <h1>Our Story</h1>
          <p>
            ScribeSpace was born out of a simple idea: to create a space where
            anyone can share their stories, ideas, and knowledge with the world.
          </p>
        </div>

        <div className="storyContent">
          <div className="contentSection">
            <h2>Our Mission</h2>
            <p>
              Our mission at ScribeSpace is to empower individuals to express
              themselves through writing. Whether it's an article, a personal
              story, or an idea, we provide a platform for people to share their
              voices and connect with others.
            </p>
          </div>

          <div className="contentSection">
            <h2>Why We Built ScribeSpace</h2>
            <p>
              We believe that everyone has a story to tell, and ScribeSpace is
              here to help make that story accessible to the world. With the
              advent of social media and online communication, we've created a
              space where writers can control their narrative without the
              clutter of distractions.
            </p>
          </div>

          <div className="contentSection">
            <h2>Our Vision</h2>
            <p>
              Our vision is to become the go-to platform for passionate writers
              around the globe. We want to foster a community of creators,
              thinkers, and storytellers who share a common love for writing and
              knowledge exchange.
            </p>
          </div>

          <div className="contentSection">
            <h2>Join Us on This Journey</h2>
            <p>
              Whether you're an experienced writer or just getting started, we
              invite you to be part of the ScribeSpace community. Together, we
              can inspire, educate, and motivate each other to reach new
              heights.
            </p>
          </div>
        </div>
      </div>

      <div className="teamsContainer">
        <div className="teamsHeader">
          <h1>Meet Our Team</h1>
          <p>
            Our team is made up of passionate individuals who are dedicated to
            bringing the best experience to the ScribeSpace community.
          </p>
        </div>

        <div className="teamMembers">
          <div className="teamMember">
            <img src="https://via.placeholder.com/150" alt="Team Member" />
            <h2>Vincentius Jacob Gunawan</h2>
            <p>Lead Developer</p>
          </div>
        </div>
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
