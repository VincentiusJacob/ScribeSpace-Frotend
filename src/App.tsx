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
      </Routes>
    </Router>
  );
};

export default App;
