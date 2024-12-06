import React from "react";
import "./about.css";

const About: React.FC = () => {
  return (
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
  );
};

export default About;
