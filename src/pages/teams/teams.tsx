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
          <h2>Vincentius Jacob Gunawan</h2>
          <p>Lead Developer</p>
        </div>

        <div className="teamMember">
          <img src="https://via.placeholder.com/150" alt="Team Member" />
          <h2>Tandri Wibowo</h2>
          <p>Data Specialist</p>
        </div>
      </div>
    </div>
  );
};

export default Teams;
