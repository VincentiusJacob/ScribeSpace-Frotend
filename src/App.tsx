import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landingPage/landingPage";
import SignUp from "./pages/Authentication/signUp";
import Login from "./pages/Authentication/login";
import HomePage from "./pages/homePage/homePage";
import WritingPage from "./pages/writingPage/writingPage";
import ArticleDetail from "./pages/articleDetail/articleDetail";
import "./App.css";
import ProfilePage from "./pages/profile/profile";
import StoryPage from "./pages/story/story";
import OurStory from "./pages/ourStory/ourStory";
import Help from "./pages/Help/help";
import Status from "./pages/status/status";
import About from "./pages/about/about";
import Teams from "./pages/teams/teams";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/registration" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/write" element={<WritingPage />} />
        <Route path="/:articleID" element={<ArticleDetail />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/myStory" element={<StoryPage />} />
        <Route path="/ourstory" element={<OurStory />} />
        <Route path="/help" element={<Help />} />
        <Route path="/status" element={<Status />} />
        <Route path="/about" element={<About />} />
        <Route path="/teams" element={<Teams />} />
      </Routes>
    </Router>
  );
};

export default App;
