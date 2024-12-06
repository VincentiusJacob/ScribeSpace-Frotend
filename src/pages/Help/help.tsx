import React from "react";
import "./help.css";

const Help: React.FC = () => {
  return (
    <div className="helpContainer">
      <div className="helpHeader">
        <h1>How Can We Help You?</h1>
        <p>
          If you have any questions or need assistance, you're in the right
          place. We're here to guide you through using ScribeSpace.
        </p>
      </div>

      <div className="helpContent">
        <div className="helpSection">
          <h2>How to Sign Up?</h2>
          <p>
            To get started with ScribeSpace, simply click on the "Sign Up"
            button on the homepage. You'll need to provide a valid email address
            and create a password to create your account.
          </p>
        </div>

        <div className="helpSection">
          <h2>How to Write an Article?</h2>
          <p>
            Once you're logged in, you can start writing by clicking the "Write"
            button. You can write your article, add a title, and publish it for
            others to read.
          </p>
        </div>

        <div className="helpSection">
          <h2>How to Edit My Profile?</h2>
          <p>
            To update your profile information, go to the "Settings" page where
            you can change your personal details, profile picture, and other
            preferences.
          </p>
        </div>

        <div className="helpSection">
          <h2>Having Trouble Logging In?</h2>
          <p>
            If you're having trouble logging in, ensure you're using the correct
            email and password. You can also use the "Forgot Password" feature
            to reset your password.
          </p>
        </div>

        <div className="helpSection">
          <h2>Contact Us</h2>
          <p>
            If you're still having trouble or need more personalized support,
            feel free to contact us at support@scribespace.com. We'll get back
            to you as soon as possible.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Help;
