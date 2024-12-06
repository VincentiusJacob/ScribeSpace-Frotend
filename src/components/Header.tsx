import React, { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import CreateIcon from "@mui/icons-material/Create";
import PersonIcon from "@mui/icons-material/Person";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Header.css";

interface HeaderProps {
  onSearch: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const [showProfileSettings, setShowProfileSettings] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const userData = JSON.parse(user);
      const userId = userData.user_id;

      axios
        .get(`http://localhost:6543/api/users/getUserById/${userId}`)
        .then((response) => {
          const profilePictureUrl = response.data.user.profile_picture;
          setProfilePicture(profilePictureUrl);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, []);

  const toggleProfileSettings = () => {
    setShowProfileSettings(!showProfileSettings);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleSignOut = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="headerContainer">
      <div className="header-left">
        <h1> ScribeSpace </h1>
        <form className="blog-search" onSubmit={handleSearchSubmit}>
          <SearchIcon id="search-icon-header" fontSize="large" />
          <input
            type="text"
            placeholder="Search"
            id="search-bar"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </form>
      </div>
      <div className="header-right">
        <div className="create-blog">
          <CreateIcon fontSize="large" />
          <Link to="/write" className="link-text">
            Write
          </Link>
        </div>

        <div
          className="profile-image-display"
          onClick={toggleProfileSettings}
          style={{
            backgroundImage: profilePicture ? `url(${profilePicture})` : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div
            className="profile-settings"
            style={{ display: showProfileSettings ? "block" : "none" }}
          >
            <ul>
              <li>
                <Link to="/profile" className="navigation-link">
                  <PersonIcon />
                  Profile
                </Link>
              </li>

              <li>
                <Link to="/myStory" className="navigation-link">
                  <LibraryBooksIcon /> My Story
                </Link>
              </li>
            </ul>
            <button onClick={handleSignOut}> Sign Out </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
