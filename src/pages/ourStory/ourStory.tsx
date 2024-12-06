import React from "react";
import "./ourStory.css";

const OurStory: React.FC = () => {
  return (
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
            space where writers can control their narrative without the clutter
            of distractions.
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
            invite you to be part of the ScribeSpace community. Together, we can
            inspire, educate, and motivate each other to reach new heights.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OurStory;
