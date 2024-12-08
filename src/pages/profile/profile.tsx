import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./profile.css";

const ProfilePage = () => {
  const [userData, setUserData] = useState({
    username: "",
    profile_picture: "",
  });
  const [newUsername, setNewUsername] = useState(userData.username);
  const [profilePic, setProfilePic] = useState<File | null>(null);

  const userId = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") as string).user_id
    : null;

  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      axios
        .get(
          `https://scribe-space-backend.vercel.app/api/users/getUserById/${userId}`
        )
        .then((response) => {
          setUserData(response.data.user);
          setNewUsername(response.data.user.username);
        })
        .catch((error) => console.log(error));
    }
  }, [userId]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePic(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("username", newUsername);
    if (profilePic) {
      formData.append("profile_picture", profilePic);
    }

    try {
      if (userId) {
        const response = await axios.put(
          `https://scribe-space-backend.vercel.app/api/users/profile/${userId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        alert("Profile updated successfully!");
        setUserData(response.data.user);
        navigate("/home");
      }
    } catch (error) {
      console.error("Error updating profile", error);
      alert("Error updating profile");
    }
  };

  return (
    <div className="profile-page">
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
          />
        </div>
        <div className="picture-section">
          {userData.profile_picture && (
            <img src={userData.profile_picture} alt="Profile" width="100" />
          )}
          <label htmlFor="profile_picture">Profile Picture:</label>
          <input
            type="file"
            id="profile_picture"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default ProfilePage;
