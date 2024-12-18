import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteIcon from "@mui/icons-material/Delete";
import "./story.css";

interface Article {
  article_id: string;
  title: string;
  content: string;
  image_url: string;
  article_tags: { tags: { name: string } }[];
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
        `https://scribe-space-backend.vercel.app/api/articles/user/${userId}`
      );
      setArticles(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching articles:", error);
      setLoading(false);
    }
  };

  const handleDelete = async (articleId: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this article?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(
          `https://scribe-space-backend.vercel.app/api/articles/${articleId}`
        );
        setArticles(
          articles.filter((article) => article.article_id !== articleId)
        );
      } catch (error) {
        console.error("Error deleting article:", error);
      }
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
            <div key={article.article_id} className="article-card">
              <Link to={`/${article.article_id}`} className="article-card">
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
              <button onClick={() => handleDelete(article.article_id)}>
                <DeleteIcon fontSize="small" />
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StoryPage;
