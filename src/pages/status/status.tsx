import React from "react";
import "./status.css";

const Status: React.FC = () => {
  return (
    <div className="statusContainer">
      <div className="statusHeader">
        <h1>System Status</h1>
        <p>Stay updated with the current status of ScribeSpace services.</p>
      </div>

      <div className="statusContent">
        <div className="statusItem">
          <h2>Website</h2>
          <p>
            Status: <span className="online">Online</span>
          </p>
        </div>

        <div className="statusItem">
          <h2>Article Writing</h2>
          <p>
            Status: <span className="online">Online</span>
          </p>
        </div>

        <div className="statusItem">
          <h2>Authentication</h2>
          <p>
            Status: <span className="offline">Offline</span>
          </p>
        </div>

        <div className="statusItem">
          <h2>Database</h2>
          <p>
            Status: <span className="online">Online</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Status;
