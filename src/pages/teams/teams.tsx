import React from "react";
import "./teams.css";

const Teams: React.FC = () => {
  return (
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
          <h2>John Doe</h2>
          <p>CEO & Founder</p>
        </div>

        <div className="teamMember">
          <img src="https://via.placeholder.com/150" alt="Team Member" />
          <h2>Jane Smith</h2>
          <p>Lead Developer</p>
        </div>

        <div className="teamMember">
          <img src="https://via.placeholder.com/150" alt="Team Member" />
          <h2>Mark Taylor</h2>
          <p>UI/UX Designer</p>
        </div>

        <div className="teamMember">
          <img src="https://via.placeholder.com/150" alt="Team Member" />
          <h2>Lisa Brown</h2>
          <p>Marketing Specialist</p>
        </div>
      </div>
    </div>
  );
};

export default Teams;
