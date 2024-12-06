import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye"; // Import icon
import "./story.css";

// Define the Article type
interface Article {
  article_id: string;
  title: string;
  content: string;
  image_url: string;
  article_tags: { tags: { name: string } }[]; // Assuming article_tags is an array of tag objects
  views: number;
}

const StoryPage = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      if (parsedUser && parsedUser.user_id) {
        const userId = parsedUser.user_id;
        fetchArticles(userId);
      }
    }
  }, []);

  const fetchArticles = async (userId: string) => {
    try {
      const response = await axios.get(
        `http://localhost:6543/api/articles/user/${userId}`
      );
      setArticles(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching articles:", error);
      setLoading(false);
    }
  };

  return (
    <div className="story-page">
      <h1> My Collections </h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="article-grid">
          {articles.map((article: Article) => (
            <Link
              to={`/${article.article_id}`}
              key={article.article_id}
              className="article-card"
            >
              {article.image_url && (
                <img src={article.image_url} alt={article.title} />
              )}
              <h2>{article.title}</h2>
              <div className="article-tags">
                {article.article_tags.map((tagWrapper, index) => (
                  <p className="tag" key={index}>
                    {tagWrapper.tags.name}
                  </p>
                ))}
              </div>
              <p className="article-views">
                <RemoveRedEyeIcon fontSize="medium" /> {article.views}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default StoryPage;
