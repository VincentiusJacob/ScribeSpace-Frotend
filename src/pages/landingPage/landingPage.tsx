import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useState, useEffect, useRef } from "react";
import mojs from "@mojs/core";
import creative from "../../assets/creative.png";
import inclusive from "../../assets/inclusion.png";
import innovation from "../../assets/innovation.png";
import community from "../../assets/community.jpg";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import fb from "../../assets/facebook.png";
import twt from "../../assets/twitter.png";
import linkedin from "../../assets/linkedin.png";
import pp from "../../assets/pp.jpg";
import "./landingPage.css";

const LandingPage: React.FC = () => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const ourStoryRef = useRef<HTMLDivElement | null>(null);
  const teamsContainerRef = useRef<HTMLDivElement | null>(null);
  const aboutContainerRef = useRef<HTMLDivElement | null>(null);
  const missionRef = useRef<HTMLDivElement | null>(null);
  const valuesRef = useRef<HTMLDivElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const createScrollAnimation = (
    element: HTMLElement | null,
    animation: any
  ) => {
    if (!element) return;

    const handleScroll = () => {
      const rect = element.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom >= 0) {
        animation.play();
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  };

  useEffect(() => {
    if (missionRef.current) {
      const missionAnimation = new mojs.Html({
        el: missionRef.current,
        opacity: { 0: 1 },
        y: { 100: 0 },
        duration: 3000,
        easing: "ease.out",
        delay: 400,
      });
      createScrollAnimation(missionRef.current, missionAnimation);
    }

    if (valuesRef.current) {
      const valuesAnimation = new mojs.Html({
        el: valuesRef.current,
        opacity: { 0: 1 },
        scale: { 0.5: 1 },
        x: { 100: 0 },
        duration: 3000,
        easing: "ease.out",
        delay: 400,
      });
      createScrollAnimation(valuesRef.current, valuesAnimation);
    }

    if (ourStoryRef.current) {
      const ourStoryAnimation = new mojs.Html({
        el: ourStoryRef.current,
        opacity: { 0: 1 },
        y: { 100: 0 },
        duration: 3000,
        easing: "ease.out",
      });
      createScrollAnimation(ourStoryRef.current, ourStoryAnimation);
    }

    if (teamsContainerRef.current) {
      const teamsAnimation = new mojs.Html({
        el: teamsContainerRef.current,
        opacity: { 0: 1 },
        scale: { 0.5: 1 },
        y: { 100: 0 },
        duration: 2000,
        easing: "ease.out",
      });
      createScrollAnimation(teamsContainerRef.current, teamsAnimation);
    }

    const heroTitle = document.querySelector("h1");
    const heroSubtitle = document.querySelector("p");

    if (heroTitle && heroSubtitle) {
      const titleAnimation = new mojs.Html({
        el: heroTitle,
        opacity: { 0: 1 },
        x: { 0: 100 },
        duration: 1000,
        easing: "ease.out",
      });

      const subtitleAnimation = new mojs.Html({
        el: heroSubtitle,
        opacity: { 0: 1 },
        y: { 100: 0 },
        duration: 1200,
        easing: "ease.out",
      });

      titleAnimation.play();
      subtitleAnimation.play();
    }

    if (buttonRef.current) {
      const burstAnimation = new mojs.Burst({
        parent: buttonRef.current,
        radius: { 50: 100 },
        count: 6,
        angle: 45,
        children: {
          shape: "circle",
          radius: 4,
          fill: "#ff7e00",
          scale: { 1: 0 },
          easing: "cubic.out",
        },
      });

      buttonRef.current.addEventListener("mouseover", () => {
        burstAnimation.replay();
      });
    }
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

  const story = [
    {
      title: "Our Mission",
      content:
        "Our mission at ScribeSpace is to empower individuals to express themselves through writing. Whether it's an article, a personal story, or an idea, we provide a platform for people to share their voices and connect with others.",
    },
    {
      title: "Why We Built ScribeSpace",
      content:
        "We believe that everyone has a story to tell, and ScribeSpace is here to help make that story accessible to the world. With the advent of social media and online communication, we've created a space where writers can control their narrative without the clutter of distractions.",
    },
    {
      title: "Our Vision",
      content:
        "Our vision is to become the go-to platform for passionate writers around the globe. We want to foster a community of creators, thinkers, and storytellers who share a common love for writing and knowledge exchange.",
    },
    {
      title: "Join Us on This Journey",
      content:
        "Whether you're an experienced writer or just getting started, we invite you to be part of the ScribeSpace community. Together, we can inspire, educate, and motivate each other to reach new heights.",
    },
  ];

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % story.length);
  };

  const goToPrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + story.length) % story.length
    );
  };

  return (
    <div className="container" ref={containerRef}>
      <div className="header">
        <h1> ScribeSpace </h1>
        <ul className="navigationlist">
          <li>
            <Link to="/" onClick={handleWriteClick}>
              Write
            </Link>
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
        <div className="body-first">
          <div className="bodyleft">
            <h1> Inspiration is everywhere</h1>
            <p> A place to read, write, and deepen your understanding</p>
            <button
              className="button"
              ref={buttonRef}
              onClick={handleReadClick}
            >
              Start reading
            </button>
          </div>
          <div className="bodyright"></div>
        </div>
        <div className="aboutContainer" ref={aboutContainerRef}>
          <div className="aboutHeader">
            <span> What We Are? </span>
            <h2>
              ScribeSpace is a platform where creativity, ideas, and
              storytelling come to life.
            </h2>
          </div>

          <div className="aboutContent">
            <div className="our-mission" ref={missionRef}>
              <p>
                Our mission is to empower individuals to express themselves
                through writing, foster creativity, and build a community of
                passionate storytellers. We aim to make it easier for people to
                connect, learn, and grow.
              </p>
            </div>

            <div className="our-values" ref={valuesRef}>
              <span> Our Values </span>
              <h2>
                Our values center on creativity, community, inclusivity, and
                innovation, guiding every step we take toward empowering
                individuals and creating meaningful impact.
              </h2>
              <ul>
                <li>
                  Creativity
                  <img src={creative} width={200} height={200} />
                </li>
                <li>
                  Community <img src={community} width={200} height={200} />
                </li>
                <li>
                  Inclusivity <img src={inclusive} width={200} height={200} />
                </li>
                <li>
                  Innovation <img src={innovation} width={200} height={200} />
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="ourStoryContainer" ref={ourStoryRef}>
          <div className="storyHeader">
            <h1>Our Story</h1>
            <p>
              ScribeSpace was born out of a simple idea: to create a space where
              anyone can share their stories, ideas, and knowledge with the
              world.
            </p>
          </div>

          <div className="storyCarousel">
            <div className="carouselItems">
              <div className="carouselItem">
                <h2>{story[currentIndex].title}</h2>
                <p>{story[currentIndex].content}</p>
              </div>
            </div>

            <div className="carouselControls">
              <button className="prev" onClick={goToPrevious}>
                <ArrowLeftIcon />
              </button>
              <button className="next" onClick={goToNext}>
                <ArrowRightIcon />
              </button>
            </div>
          </div>
        </div>

        <div className="teamsContainer" ref={teamsContainerRef}>
          <div className="teamsHeader">
            <h1>Meet Our Team</h1>
            <p>
              Our team is made up of passionate individuals who are dedicated to
              bringing the best experience to the ScribeSpace community.
            </p>
          </div>

          <div className="teamMembers">
            <div className="teamMember">
              <img src={pp} width={200} height={200} alt="Team Member" />
              <h2>Vincentius Jacob Gunawan</h2>
              <p>Lead Developer</p>
            </div>
          </div>
        </div>
      </div>

      <div className="footer">
        <h1> ScribeSpace </h1>
        <p>
          ScribeSpace is an innovative platform designed to empower individuals
          to express themselves through writing. Whether it’s crafting articles,
          sharing personal stories, or exploring new ideas, ScribeSpace offers a
          space where anyone can write, publish, and connect with others.
        </p>
        <div className="socialmedia">
          <img src={twt} width={40} height={40} />
          <img src={fb} width={40} height={40} />
          <img src={linkedin} width={40} height={40} />
        </div>
        <span> @ 2024. All Rights Reserved</span>
      </div>
    </div>
  );
};

export default LandingPage;
