"use client";

import type React from "react";

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  InputAdornment,
  IconButton,
  Divider,
  Fade,
  Slide,
  Avatar,
  Chip,
} from "@mui/material";
import {
  Email,
  Lock,
  Visibility,
  VisibilityOff,
  ArrowBack,
  Google,
  GitHub,
  Twitter,
  Person,
} from "@mui/icons-material";
import "./authentication.css";

const Login: React.FC = () => {
  const [userLoginData, setUserLoginData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

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

        Swal.fire({
          title: "Welcome Back!",
          text: "Login successful!",
          icon: "success",
          confirmButtonText: "Continue",
          confirmButtonColor: "#6366f1",
        });
        navigate("/home");
      }
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || "Something went wrong";
      Swal.fire({
        title: "Login Failed",
        text: errorMessage,
        icon: "error",
        confirmButtonText: "Try Again",
        confirmButtonColor: "#ef4444",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <div className="auth-page">
      {/* Background */}
      <div className="auth-background">
        <div className="gradient-overlay"></div>
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
        </div>
      </div>

      {/* Back Button */}
      <IconButton className="back-button" onClick={handleBackToHome}>
        <ArrowBack />
      </IconButton>

      <Container maxWidth="sm" className="auth-container">
        <Fade in={true} timeout={800}>
          <Paper className="auth-card" elevation={0}>
            <Slide direction="up" in={true} timeout={1000}>
              <Box className="auth-content">
                {/* Header */}
                <Box className="auth-header">
                  <Avatar className="auth-avatar">
                    <Person />
                  </Avatar>
                  <Typography variant="h3" className="auth-title">
                    Welcome Back
                  </Typography>
                  <Typography variant="body1" className="auth-subtitle">
                    Sign in to continue your writing journey
                  </Typography>
                  <Chip label="✨ Join 50K+ Writers" className="auth-badge" />
                </Box>

                {/* Social Login */}
                <Box className="social-login">
                  <Button
                    className="social-btn google-btn"
                    fullWidth
                    startIcon={<Google />}
                  >
                    Continue with Google
                  </Button>
                  <Box className="social-row">
                    <Button
                      className="social-btn github-btn"
                      startIcon={<GitHub />}
                    >
                      GitHub
                    </Button>
                    <Button
                      className="social-btn twitter-btn"
                      startIcon={<Twitter />}
                    >
                      Twitter
                    </Button>
                  </Box>
                </Box>

                <Divider className="auth-divider">
                  <Typography variant="body2" color="textSecondary">
                    or continue with email
                  </Typography>
                </Divider>

                {/* Login Form */}
                <form onSubmit={handleSubmitForm} className="auth-form">
                  <TextField
                    fullWidth
                    label="Email Address"
                    type="email"
                    value={userLoginData.email}
                    onChange={(e) =>
                      setUserLoginData((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email className="input-icon" />
                        </InputAdornment>
                      ),
                    }}
                    className="auth-input"
                    required
                  />

                  <TextField
                    fullWidth
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    value={userLoginData.password}
                    onChange={(e) =>
                      setUserLoginData((prev) => ({
                        ...prev,
                        password: e.target.value,
                      }))
                    }
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock className="input-icon" />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    className="auth-input"
                    required
                  />

                  <Box className="form-options">
                    <Button variant="text" className="forgot-password">
                      Forgot Password?
                    </Button>
                  </Box>

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    className="auth-submit-btn"
                    disabled={isLoading}
                    size="large"
                  >
                    {isLoading ? "Signing In..." : "Sign In"}
                  </Button>
                </form>

                {/* Footer */}
                <Box className="auth-footer">
                  <Typography variant="body2" color="textSecondary">
                    Don't have an account?{" "}
                    <Link to="/registration" className="auth-link">
                      Create one
                    </Link>
                  </Typography>
                </Box>
              </Box>
            </Slide>
          </Paper>
        </Fade>
      </Container>
    </div>
  );
};

export default Login;
