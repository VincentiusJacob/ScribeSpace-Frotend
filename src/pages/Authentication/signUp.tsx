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
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import {
  Email,
  Lock,
  Person,
  Visibility,
  VisibilityOff,
  ArrowBack,
  Google,
  GitHub,
  Twitter,
  PersonAdd,
} from "@mui/icons-material";
import "./authentication.css";

const SignUp: React.FC = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const navigate = useNavigate();

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!agreeToTerms) {
      Swal.fire({
        title: "Terms Required",
        text: "Please agree to the Terms of Service and Privacy Policy",
        icon: "warning",
        confirmButtonText: "OK",
        confirmButtonColor: "#f59e0b",
      });
      return;
    }

    setIsLoading(true);

    try {
      await axios.post(
        "https://scribe-space-backend.vercel.app/api/users/createUser",
        userData
      );
      Swal.fire({
        title: "Welcome to ScribeSpace!",
        text: "Your account has been created successfully. You can now log in.",
        icon: "success",
        confirmButtonText: "Continue to Login",
        confirmButtonColor: "#6366f1",
      }).then(() => {
        navigate("/login");
      });
    } catch (err) {
      console.log(err);
      Swal.fire({
        title: "Registration Failed",
        text: "Please check your information and try again.",
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
                  <Avatar className="auth-avatar signup-avatar">
                    <PersonAdd />
                  </Avatar>
                  <Typography variant="h3" className="auth-title">
                    Join ScribeSpace
                  </Typography>
                  <Typography variant="body1" className="auth-subtitle">
                    Start your writing journey with us today
                  </Typography>
                  <Chip
                    label="🚀 Free Forever"
                    className="auth-badge signup-badge"
                  />
                </Box>

                {/* Social Login */}
                <Box className="social-login">
                  <Button
                    className="social-btn google-btn"
                    fullWidth
                    startIcon={<Google />}
                  >
                    Sign up with Google
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
                    or create account with email
                  </Typography>
                </Divider>

                {/* Signup Form */}
                <form onSubmit={handleSubmitForm} className="auth-form">
                  <TextField
                    fullWidth
                    label="Full Name"
                    type="text"
                    value={userData.username}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        username: e.target.value,
                      }))
                    }
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person className="input-icon" />
                        </InputAdornment>
                      ),
                    }}
                    className="auth-input"
                    required
                  />

                  <TextField
                    fullWidth
                    label="Email Address"
                    type="email"
                    value={userData.email}
                    onChange={(e) =>
                      setUserData((prev) => ({
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
                    value={userData.password}
                    onChange={(e) =>
                      setUserData((prev) => ({
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

                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={agreeToTerms}
                        onChange={(e) => setAgreeToTerms(e.target.checked)}
                        className="terms-checkbox"
                      />
                    }
                    label={
                      <Typography variant="body2" color="textSecondary">
                        I agree to the{" "}
                        <Link to="/terms" className="auth-link">
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link to="/privacy" className="auth-link">
                          Privacy Policy
                        </Link>
                      </Typography>
                    }
                    className="terms-agreement"
                  />

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    className="auth-submit-btn signup-btn"
                    disabled={isLoading}
                    size="large"
                  >
                    {isLoading ? "Creating Account..." : "Create Account"}
                  </Button>
                </form>

                {/* Footer */}
                <Box className="auth-footer">
                  <Typography variant="body2" color="textSecondary">
                    Already have an account?{" "}
                    <Link to="/login" className="auth-link">
                      Sign in
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

export default SignUp;
