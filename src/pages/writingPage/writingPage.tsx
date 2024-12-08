import React, { useState, useRef, useEffect } from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PersonIcon from "@mui/icons-material/Person";

import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import AddIcon from "@mui/icons-material/Add";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./writingPage.css";

const WritingPage: React.FC = () => {
  const [showProfileSettings, setShowProfileSettings] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [contentBlocks, setContentBlocks] = useState<
    (string | { type: string; src: string; mediaType: string })[]
  >([""]);
  const [title, setTitle] = useState("");
  const [currentLine, setCurrentLine] = useState<number | null>(0);
  const [tags, setTags] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const textAreaRefs = useRef<(HTMLTextAreaElement | null)[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const predefinedTags = [
      "Sports",
      "Science",
      "Technology",
      "Health",
      "Education",
      "Entertainment",
      "Business",
      "Politics",
      "Travel",
      "Lifestyle",
    ];
    setTags(predefinedTags);

    const currentUserData = localStorage.getItem("user");
    if (currentUserData) {
      setCurrentUser(JSON.parse(currentUserData));
    }
  }, []);

  const toggleProfileSettings = () => {
    setShowProfileSettings(!showProfileSettings);
  };

  const handleTagToggle = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleTextChange = (index: number, value: string) => {
    const updatedBlocks = [...contentBlocks];
    updatedBlocks[index] = value;
    setContentBlocks(updatedBlocks);
  };

  const handleUploadMedia = async (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const files = event.target.files;
    if (files) {
      const updatedBlocks = [...contentBlocks];
      for (const file of files) {
        const uploadedUrl = await uploadMediaToSupabase(file, title);

        if (uploadedUrl) {
          const mediaType = file.type.startsWith("image") ? "image" : "video";
          const mediaBlock = { type: "media", src: uploadedUrl, mediaType };

          updatedBlocks[index] = mediaBlock;
          updatedBlocks.splice(index + 1, 0, "");
        }
      }

      setContentBlocks(updatedBlocks);
      setCurrentLine(index + 1);
      setFocusToNewLine(index + 1);
    }
  };

  const uploadMediaToSupabase = async (file: File, articleId: string) => {
    if (!file) {
      console.error("No file selected for upload");
      return null;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("articleId", articleId);

    try {
      const response = await axios.post(
        "https://scribe-space-backend.vercel.app/api/articles/uploadMedia",
        formData
      );
      return response.data.url;
    } catch (err) {
      console.error("Media upload error:", err);
      return null;
    }
  };

  const addTextBlock = (index: number) => {
    const updatedBlocks = [...contentBlocks];
    updatedBlocks.splice(index + 1, 0, "");
    setContentBlocks(updatedBlocks);
    setCurrentLine(index + 1);
    setFocusToNewLine(index + 1);
  };

  const setFocusToNewLine = (index: number) => {
    if (textAreaRefs.current[index]) {
      textAreaRefs.current[index]?.focus();
    }
  };

  const isPublishDisabled =
    !title.trim() ||
    contentBlocks.every(
      (block) => typeof block === "string" && block.trim() === ""
    );

  const publishArticle = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const userId = user?.user_id;

      const articleContent = await Promise.all(
        contentBlocks.map(async (block) => {
          if (typeof block === "string") {
            return { type: "text", content: block };
          } else if (block.type === "media") {
            if (block.src.startsWith("blob:")) {
              const blob = await fetch(block.src).then((r) => r.blob());
              const file = new File([blob], "uploaded-media", {
                type: blob.type,
              });
              const uploadedUrl = await uploadMediaToSupabase(file, title);

              return {
                ...block,
                src: uploadedUrl || block.src,
              };
            }
          }
          return block;
        })
      );

      const response = await axios.post(
        "https://scribe-space-backend.vercel.app/api/articles/publish",
        {
          title,
          content: articleContent,
          userId,
          tags: selectedTags,
        }
      );

      if (response.status === 200) {
        alert("Article published successfully!");
        setTitle("");
        setContentBlocks([""]);
        setSelectedTags([]);
      } else {
        alert(`Failed to publish: ${response.data.message}`);
      }
    } catch (err) {
      console.error("Error publishing article:", err);
      alert("An unexpected error occurred.");
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="writingPageContainer">
      <div className="writingPageHeader">
        <div className="writingPageHeader-left">
          <h1>ScribeSpace</h1>
          {currentUser && <span>Draft in {currentUser.username}</span>}
        </div>
        <div className="writingPageHeader-right">
          <button
            id="publishBtn"
            disabled={isPublishDisabled}
            onClick={publishArticle}
          >
            Publish
          </button>
          <NotificationsIcon fontSize="large" />
          <div
            className="profile-image-display"
            onClick={toggleProfileSettings}
          >
            <div
              className="profile-settings"
              style={{ display: showProfileSettings ? "block" : "none" }}
            >
              <ul>
                <li>
                  <Link to="/profile" className="profile-nav">
                    <PersonIcon />
                    Profile
                  </Link>
                </li>
                <li>
                  <Link to="myStory" className="profile-nav">
                    <LibraryBooksIcon />
                    My Story
                  </Link>
                </li>
              </ul>
              <button onClick={handleSignOut}>Sign Out</button>
            </div>
          </div>
        </div>
      </div>

      <div className="writingPageBody">
        <div className="tags-container">
          <h4>Select Tags:</h4>
          {tags.map((tag, idx) => (
            <button
              key={idx}
              className={`tag-button ${
                selectedTags.includes(tag) ? "selected" : ""
              }`}
              onClick={() => handleTagToggle(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
        <div className="title-container">
          <textarea
            placeholder="Enter your title here..."
            className="title-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="editor-container">
          {contentBlocks.map((block, index) => (
            <div key={index} className="content-block-detail">
              {typeof block === "string" ? (
                <>
                  <textarea
                    ref={(el) => (textAreaRefs.current[index] = el)}
                    className="content-input"
                    placeholder="Start writing here..."
                    value={block}
                    onChange={(e) => handleTextChange(index, e.target.value)}
                    onFocus={() => setCurrentLine(index)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addTextBlock(index);
                      }
                    }}
                  />
                  {currentLine === index && (
                    <button
                      className="add-media-btn"
                      onClick={() =>
                        document
                          .getElementById(`upload-media-${index}`)
                          ?.click()
                      }
                    >
                      <AddIcon />
                    </button>
                  )}
                </>
              ) : block.type === "media" ? (
                block.mediaType === "image" ? (
                  <img
                    src={block.src}
                    alt="Uploaded"
                    className="uploaded-media"
                  />
                ) : (
                  <video src={block.src} controls className="uploaded-media" />
                )
              ) : null}
              <input
                id={`upload-media-${index}`}
                type="file"
                accept="image/*,video/*"
                multiple
                onChange={(e) => handleUploadMedia(e, index)}
                style={{ display: "none" }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WritingPage;
