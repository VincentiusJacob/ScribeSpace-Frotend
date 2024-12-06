import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import axios from "axios";
import "./articleDetail.css";
import { Link } from "react-router-dom";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

interface Tag {
  name: string;
}

interface ContentBlock {
  type: "text" | "media";
  content?: string;
  src?: string;
  mediaType?: "image" | "video";
}

interface Article {
  article_id: string;
  title: string;
  content: string;
  views: number;
  image_url: string | null;
  article_tags: { tags: Tag }[];
  created_at: string;
  user_id: string; // Menambahkan user_id untuk mengambil username
}

const ArticleDetail = () => {
  const { articleID } = useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [recommendations, setRecommendations] = useState<Article[]>([]);
  const [creator, setCreator] = useState<any>(null); // State untuk username

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(
          `https://scribe-space-backend.vercel.app/api/articles/getArticle/${articleID}`
        );
        setArticle(response.data);
      } catch (error) {
        console.error("Error fetching article:", error);
      }
    };

    if (articleID) {
      fetchArticle();
    }
  }, [articleID]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (!article || !article.article_tags || !article.article_id) return; // Pastikan article_id ada

      // Ambil semua tag yang valid
      const tags = article.article_tags
        .filter((tagWrapper) => tagWrapper.tags && tagWrapper.tags.name) // Hanya ambil tag yang valid
        .map((tagWrapper) => tagWrapper.tags.name); // Ambil nama tag

      console.log("Tags being sent:", tags); // Log untuk melihat tags yang dikirim

      try {
        const response = await axios.post(
          "https://scribe-space-backend.vercel.app/api/articles/getRecommendations",
          { tags, excludeArticleID: article.article_id, limit: 6 }
        );
        console.log("Recommended articles:", response.data); // Log untuk melihat data artikel yang diterima
        setRecommendations(response.data);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      }
    };

    fetchRecommendations();
  }, [article]);

  useEffect(() => {
    const fetchCreatorUsername = async () => {
      if (article && article.user_id) {
        try {
          // Ganti URL dengan endpoint API yang sesuai untuk mengambil username berdasarkan user_id
          const response = await axios.get(
            `https://scribe-space-backend.vercel.app/api/users/getUserById/${article.user_id}`
          );
          setCreator(response.data.user); // Simpan username di state
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    if (article && article.user_id) {
      fetchCreatorUsername();
    }
  }, [article]);

  const extractTextContent = (content: string) => {
    try {
      const contentArray: ContentBlock[] = JSON.parse(content);
      return contentArray
        .filter((item) => item.type === "text") // Filter for only text items
        .map((item) => item.content) // Extract the text content
        .join(" "); // Join all text content into a single string
    } catch (error) {
      console.error("Error parsing content:", error);
      return ""; // Return empty string if parsing fails
    }
  };

  const handleArticleClick = async (articleId: string) => {
    try {
      // Kirim request ke server untuk menambah 1 pada jumlah views artikel
      await axios.put(
        `http://localhost:6543/api/articles/incrementViews/${articleId}`
      );
    } catch (error) {
      console.error("Error updating views:", error);
    }
  };

  if (!article) return <div>Loading...</div>;

  const contentBlocks: ContentBlock[] = JSON.parse(article.content);

  return (
    <div className="articleDetailContainer">
      <div className="articleDetailContent">
        <div className="articleDetailContent-header">
          <h1>{article.title}</h1>
          <div className="article-creator">
            <img src={creator.profile_picture} alt="Profile" />
            <div className="article-creator-info">
              <p>{creator ? creator.username : "Unknown User"}</p>
              <p>
                {new Date(article.created_at).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>

        <div className="content">
          {contentBlocks.map((block, index) => {
            if (block.type === "text" && block.content) {
              return (
                <p key={index} className="content-text">
                  {block.content}
                </p>
              );
            }
            if (block.type === "media" && block.src) {
              if (block.mediaType === "image") {
                return (
                  <img
                    key={index}
                    src={block.src}
                    alt={`Content media ${index}`}
                    className="content-image"
                  />
                );
              }
              if (block.mediaType === "video") {
                return (
                  <video
                    key={index}
                    controls
                    className="content-video"
                    src={block.src}
                  />
                );
              }
            }
            return null;
          })}
        </div>

        <div className="articleRecommendation">
          <h2>Recommended Articles</h2>
          <div className="recommendation-list">
            {recommendations.map((rec) => (
              <Link
                to={`/${rec.article_id}`}
                key={rec.article_id}
                className="recommendation-card"
                onClick={() => handleArticleClick(rec.article_id)}
              >
                {rec.image_url && <img src={rec.image_url} alt={rec.title} />}
                <div className="article-trending-info">
                  <h2>{rec.title}</h2>
                  <p>
                    {extractTextContent(rec.content).substring(0, 100)}
                    ...
                  </p>
                  <div className="article-tags">
                    {rec.article_tags.map((tagWrapper, index) => (
                      <p className="tag" key={index}>
                        {tagWrapper.tags?.name}
                      </p>
                    ))}
                  </div>
                  <p className="article-views">
                    <RemoveRedEyeIcon fontSize="medium" /> {rec.views}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;
