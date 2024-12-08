import "./authentication.css";
import LandingPage from "../landingPage/landingPage";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const signUp: React.FC = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.post(
        "https://scribe-space-backend.vercel.app/api/users/createUser",
        userData
      );
      Swal.fire({
        title: "Account Registered",
        text: "You can now log in with your credentials.",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        navigate("/login");
      });
    } catch (err) {
      console.log(err);
      Swal.fire({
        title: "Registration Failed",
        text: "Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="signUpPage">
      <div className="landingPage">
        <LandingPage />
      </div>

      <div className="authenticationBox">
        <h2> Join ScribeSpace. </h2>
        <form className="authenticationForm" onSubmit={handleSubmitForm}>
          <div className="form-detail">
            <label> Name</label>
            <input
              type="text"
              value={userData.username}
              onChange={(e) =>
                setUserData((prev) => ({
                  ...prev,
                  username: e.target.value,
                }))
              }
            />
          </div>
          <div className="form-detail">
            <label> Email </label>
            <input
              type="text"
              value={userData.email}
              onChange={(e) =>
                setUserData((prev) => ({
                  ...prev,
                  email: e.target.value,
                }))
              }
            />
          </div>
          <div className="form-detail">
            <label> Password </label>
            <input
              type="text"
              value={userData.password}
              onChange={(e) =>
                setUserData((prev) => ({
                  ...prev,
                  password: e.target.value,
                }))
              }
            />
          </div>
          <input type="submit" id="submit-btn" />
        </form>
        <p>
          Already have an account?{" "}
          <Link id="sign-in-btn" to="/login">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default signUp;
