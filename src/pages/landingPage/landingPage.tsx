"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import mojs from "@mojs/core";
import {
  ArrowForward,
  Edit,
  People,
  Favorite,
  Lightbulb,
  Public,
  ChevronLeft,
  ChevronRight,
  Twitter,
  Facebook,
  LinkedIn,
  Star,
  MenuBook,
  TrendingUp,
  EmojiEvents,
} from "@mui/icons-material";
import {
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Grid,
  Typography,
  Box,
  Paper,
  Avatar,
  Fade,
  Slide,
  Zoom,
  IconButton,
} from "@mui/material";
import "./landingPage.css";

interface Story {
  title: string;
  content: string;
  icon: JSX.Element;
}

interface Value {
  title: string;
  description: string;
  icon: JSX.Element;
  color: string;
}

interface Stat {
  number: string;
  label: string;
  icon: JSX.Element;
}

const ScribeSpaceLanding: React.FC = () => {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    setIsVisible(true);

    // Mo.js animations
    if (buttonRef.current) {
      const burstAnimation = new mojs.Burst({
        parent: buttonRef.current,
        radius: { 50: 100 },
        count: 6,
        angle: 45,
        children: {
          shape: "circle",
          radius: 4,
          fill: "#6366f1",
          scale: { 1: 0 },
          easing: "cubic.out",
        },
      });

      buttonRef.current.addEventListener("mouseover", () => {
        burstAnimation.replay();
      });
    }
  }, []);

  const stories: Story[] = [
    {
      title: "Our Mission",
      content:
        "Our mission at ScribeSpace is to empower individuals to express themselves through writing. Whether it's an article, a personal story, or an idea, we provide a platform for people to share their voices and connect with others.",
      icon: <Edit sx={{ fontSize: 32 }} />,
    },
    {
      title: "Why We Built ScribeSpace",
      content:
        "We believe that everyone has a story to tell, and ScribeSpace is here to help make that story accessible to the world. With the advent of social media and online communication, we've created a space where writers can control their narrative without the clutter of distractions.",
      icon: <People sx={{ fontSize: 32 }} />,
    },
    {
      title: "Our Vision",
      content:
        "Our vision is to become the go-to platform for passionate writers around the globe. We want to foster a community of creators, thinkers, and storytellers who share a common love for writing and knowledge exchange.",
      icon: <Public sx={{ fontSize: 32 }} />,
    },
    {
      title: "Join Us on This Journey",
      content:
        "Whether you're an experienced writer or just getting started, we invite you to be part of the ScribeSpace community. Together, we can inspire, educate, and motivate each other to reach new heights.",
      icon: <Favorite sx={{ fontSize: 32 }} />,
    },
  ];

  const values: Value[] = [
    {
      title: "Creativity",
      description: "Unleash your creative potential",
      icon: <Lightbulb sx={{ fontSize: 48 }} />,
      color: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    },
    {
      title: "Community",
      description: "Connect with like-minded writers",
      icon: <People sx={{ fontSize: 48 }} />,
      color: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    },
    {
      title: "Inclusivity",
      description: "Every voice matters here",
      icon: <Favorite sx={{ fontSize: 48 }} />,
      color: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    },
    {
      title: "Innovation",
      description: "Pushing boundaries in storytelling",
      icon: <Star sx={{ fontSize: 48 }} />,
      color: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    },
  ];

  const stats: Stat[] = [
    {
      number: "50K+",
      label: "Active Writers",
      icon: <Edit sx={{ fontSize: 24 }} />,
    },
    {
      number: "1M+",
      label: "Stories Published",
      icon: <MenuBook sx={{ fontSize: 24 }} />,
    },
    {
      number: "10M+",
      label: "Monthly Readers",
      icon: <TrendingUp sx={{ fontSize: 24 }} />,
    },
    {
      number: "95%",
      label: "Satisfaction Rate",
      icon: <EmojiEvents sx={{ fontSize: 24 }} />,
    },
  ];

  const nextStory = () => {
    setCurrentStoryIndex((prev) => (prev + 1) % stories.length);
  };

  const prevStory = () => {
    setCurrentStoryIndex(
      (prev) => (prev - 1 + stories.length) % stories.length
    );
  };

  const handleWriteClick = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      Swal.fire({
        title: "You need to log in first",
        text: "Please sign in to write an article.",
        icon: "warning",
        confirmButtonText: "OK",
      });
    } else {
      window.location.href = "/write";
    }
  };

  const handleReadClick = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      Swal.fire({
        title: "You need to log in first",
        text: "Please sign in to start reading.",
        icon: "warning",
        confirmButtonText: "OK",
      });
    } else {
      window.location.href = "/home";
    }
  };

  return (
    <div className="modern-landing-container">
      {/* Header */}
      <header className="modern-header">
        <Container maxWidth="xl">
          <Box className="header-content">
            <Typography variant="h4" className="logo-text">
              ScribeSpace
            </Typography>

            <nav className="navigation">
              <Button
                color="inherit"
                onClick={handleWriteClick}
                className="nav-link"
              >
                Write
              </Button>
              <Button color="inherit" className="nav-link">
                Explore
              </Button>
              <Link to="/login" style={{ textDecoration: "none" }}>
                <Button color="inherit" className="nav-link">
                  Sign In
                </Button>
              </Link>
            </nav>

            <Link to="/registration" style={{ textDecoration: "none" }}>
              <Button className="cta-button" variant="contained">
                Get Started
              </Button>
            </Link>
          </Box>
        </Container>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <Container maxWidth="xl">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} lg={6}>
              <Fade in={isVisible} timeout={1000}>
                <Box className="hero-content">
                  <Chip
                    label="✨ Where Stories Come to Life"
                    className="hero-badge"
                  />
                  <Typography variant="h1" className="hero-title">
                    Inspiration is{" "}
                    <span className="gradient-text">everywhere</span>
                  </Typography>
                  <Typography variant="h5" className="hero-subtitle">
                    A place to read, write, and deepen your understanding. Join
                    millions of writers and readers in the world's most vibrant
                    storytelling community.
                  </Typography>

                  <Box className="hero-buttons">
                    <Button
                      ref={buttonRef}
                      className="primary-button"
                      variant="contained"
                      size="large"
                      onClick={handleReadClick}
                      endIcon={<ArrowForward />}
                    >
                      Start Reading
                    </Button>
                    <Button
                      className="secondary-button"
                      variant="outlined"
                      size="large"
                      onClick={handleWriteClick}
                    >
                      Start Writing
                    </Button>
                  </Box>

                  {/* Stats */}
                  <Grid container spacing={3} className="stats-grid">
                    {stats.map((stat, index) => (
                      <Grid item xs={6} md={3} key={index}>
                        <Zoom in={isVisible} timeout={800 + index * 200}>
                          <Box className="stat-item">
                            <Box className="stat-icon">{stat.icon}</Box>
                            <Typography variant="h4" className="stat-number">
                              {stat.number}
                            </Typography>
                            <Typography variant="body2" className="stat-label">
                              {stat.label}
                            </Typography>
                          </Box>
                        </Zoom>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </Fade>
            </Grid>

            <Grid item xs={12} lg={6}>
              <Slide direction="left" in={isVisible} timeout={1200}>
                <Box className="hero-card-container">
                  <Paper className="featured-story-card" elevation={0}>
                    <Box className="story-header">
                      <Avatar className="story-avatar">
                        <Edit />
                      </Avatar>
                      <Box>
                        <Typography variant="h6" className="story-title">
                          Featured Story
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          By Sarah Johnson
                        </Typography>
                      </Box>
                    </Box>
                    <Box className="story-content">
                      <Typography variant="h5" className="story-headline">
                        The Art of Digital Storytelling
                      </Typography>
                      <Typography variant="body1" color="textSecondary">
                        Discover how modern writers are revolutionizing the way
                        we tell stories in the digital age...
                      </Typography>
                    </Box>
                    <Box className="story-footer">
                      <Box className="story-meta">
                        <Typography variant="caption">5 min read</Typography>
                        <Typography variant="caption">•</Typography>
                        <Typography variant="caption">1.2k claps</Typography>
                      </Box>
                      <Button size="small" className="read-more-btn">
                        Read More
                      </Button>
                    </Box>
                  </Paper>
                </Box>
              </Slide>
            </Grid>
          </Grid>
        </Container>
      </section>

      {/* About Section */}
      <section className="about-section">
        <Container maxWidth="xl">
          <Box className="section-header">
            <Chip label="What We Are" className="section-badge" />
            <Typography variant="h2" className="section-title">
              ScribeSpace is where creativity,{" "}
              <span className="gradient-text">ideas, and storytelling</span>{" "}
              come to life
            </Typography>
            <Typography variant="h6" className="section-subtitle">
              Our mission is to empower individuals to express themselves
              through writing, foster creativity, and build a community of
              passionate storytellers.
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {values.map((value, index) => (
              <Grid item xs={12} sm={6} lg={3} key={index}>
                <Zoom in={isVisible} timeout={600 + index * 200}>
                  <Card className="value-card">
                    <CardContent className="value-content">
                      <Box
                        className="value-icon"
                        sx={{ background: value.color }}
                      >
                        {value.icon}
                      </Box>
                      <Typography variant="h5" className="value-title">
                        {value.title}
                      </Typography>
                      <Typography variant="body1" color="textSecondary">
                        {value.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Zoom>
              </Grid>
            ))}
          </Grid>
        </Container>
      </section>

      {/* Our Story Section */}
      <section className="story-section">
        <Container maxWidth="lg">
          <Box className="section-header">
            <Typography variant="h2" className="section-title">
              Our Story
            </Typography>
            <Typography variant="h6" className="section-subtitle">
              ScribeSpace was born out of a simple idea: to create a space where
              anyone can share their stories, ideas, and knowledge with the
              world.
            </Typography>
          </Box>

          <Paper className="story-carousel" elevation={0}>
            <Box className="carousel-content">
              <Box className="carousel-icon">
                {stories[currentStoryIndex].icon}
              </Box>
              <Typography variant="h4" className="carousel-title">
                {stories[currentStoryIndex].title}
              </Typography>
              <Typography variant="body1" className="carousel-text">
                {stories[currentStoryIndex].content}
              </Typography>
            </Box>

            <Box className="carousel-controls">
              <IconButton onClick={prevStory} className="carousel-btn">
                <ChevronLeft />
              </IconButton>
              <IconButton onClick={nextStory} className="carousel-btn">
                <ChevronRight />
              </IconButton>
            </Box>
          </Paper>

          <Box className="carousel-dots">
            {stories.map((_, index) => (
              <Box
                key={index}
                className={`dot ${index === currentStoryIndex ? "active" : ""}`}
                onClick={() => setCurrentStoryIndex(index)}
              />
            ))}
          </Box>
        </Container>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <Container maxWidth="lg">
          <Box className="section-header">
            <Typography variant="h2" className="section-title">
              Meet Our Team
            </Typography>
            <Typography variant="h6" className="section-subtitle">
              Our team is made up of passionate individuals who are dedicated to
              bringing the best experience to the ScribeSpace community.
            </Typography>
          </Box>

          <Box className="team-member-container">
            <Card className="team-card">
              <CardContent className="team-content">
                <Box className="team-avatar-container">
                  <Avatar
                    className="team-avatar"
                    sx={{ width: 120, height: 120 }}
                  >
                    VJ
                  </Avatar>
                  <Chip label="Lead Developer" className="team-badge" />
                </Box>
                <Typography variant="h5" className="team-name">
                  Vincentius Jacob Gunawan
                </Typography>
                <Typography
                  variant="body1"
                  color="textSecondary"
                  className="team-description"
                >
                  Passionate about creating platforms that empower writers and
                  storytellers worldwide.
                </Typography>
                <Box className="team-social">
                  <IconButton size="small">
                    <Twitter />
                  </IconButton>
                  <IconButton size="small">
                    <LinkedIn />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <Container maxWidth="lg">
          <Box className="cta-content">
            <Typography variant="h2" className="cta-title">
              Ready to Share Your Story?
            </Typography>
            <Typography variant="h6" className="cta-subtitle">
              Join thousands of writers who have already discovered the power of
              ScribeSpace. Your voice matters, and your story deserves to be
              heard.
            </Typography>
            <Box className="cta-buttons">
              <Button
                className="cta-primary-btn"
                variant="contained"
                size="large"
                onClick={handleWriteClick}
                endIcon={<Edit />}
              >
                Start Writing Today
              </Button>
              <Button
                className="cta-secondary-btn"
                variant="outlined"
                size="large"
                onClick={handleReadClick}
              >
                Explore Stories
              </Button>
            </Box>
          </Box>
        </Container>
      </section>

      {/* Footer */}
      <footer className="modern-footer">
        <Container maxWidth="xl">
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography variant="h4" className="footer-logo">
                ScribeSpace
              </Typography>
              <Typography variant="body1" className="footer-description">
                ScribeSpace is an innovative platform designed to empower
                individuals to express themselves through writing. Whether it's
                crafting articles, sharing personal stories, or exploring new
                ideas, ScribeSpace offers a space where anyone can write,
                publish, and connect with others.
              </Typography>
              <Box className="footer-social">
                <IconButton>
                  <Twitter />
                </IconButton>
                <IconButton>
                  <Facebook />
                </IconButton>
                <IconButton>
                  <LinkedIn />
                </IconButton>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" className="footer-section-title">
                Platform
              </Typography>
              <Box className="footer-links">
                <Button color="inherit" onClick={handleWriteClick}>
                  Write
                </Button>
                <Button color="inherit" onClick={handleReadClick}>
                  Read
                </Button>
                <Button color="inherit">Explore</Button>
                <Button color="inherit">Community</Button>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" className="footer-section-title">
                Company
              </Typography>
              <Box className="footer-links">
                <Button color="inherit">About</Button>
                <Button color="inherit">Careers</Button>
                <Button color="inherit">Contact</Button>
                <Button color="inherit">Privacy</Button>
              </Box>
            </Grid>
          </Grid>

          <Box className="footer-bottom">
            <Typography variant="body2" color="textSecondary">
              © 2024 ScribeSpace. All Rights Reserved.
            </Typography>
          </Box>
        </Container>
      </footer>
    </div>
  );
};

export default ScribeSpaceLanding;
