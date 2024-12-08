import "./authentication.css";
import LandingPage from "../landingPage/landingPage";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { Link } from "react-router-dom";

const Login: React.FC = () => {
  const [userLoginData, setUserLoginData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://scribe-space-backend.vercel.app/api/users/login",
        userLoginData,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      if (response.status === 200) {
        const userData = response.data;

        localStorage.setItem("user", JSON.stringify(userData));

        Swal.fire("Success", "Login successful!", "success");
        navigate("/home");
      }
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || "Something went wrong";
      Swal.fire("Error", errorMessage, "error");
    }
  };

  return (
    <div className="loginPage">
      <div className="landingPage">
        <LandingPage />
      </div>
      <div className="authenticationBox">
        <h2> Welcome Back. </h2>
        <form className="authenticationForm" onSubmit={handleSubmitForm}>
          <div className="form-detail">
            <label>Email</label>
            <input
              type="text"
              value={userLoginData.email}
              onChange={(e) =>
                setUserLoginData((prev) => ({
                  ...prev,
                  email: e.target.value,
                }))
              }
            />
          </div>
          <div className="form-detail">
            <label>Password</label>
            <input
              type="password"
              value={userLoginData.password}
              onChange={(e) =>
                setUserLoginData((prev) => ({
                  ...prev,
                  password: e.target.value,
                }))
              }
            />
          </div>
          <input type="submit" id="submit-btn" value="Continue" />
        </form>
        <p>
          No Account?{" "}
          <Link id="sign-up-btn" to="/registration">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
