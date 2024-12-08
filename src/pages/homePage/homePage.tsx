import axios from "axios";
import Header from "../../components/Header";
import "./homePage.css";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Tag {
  name: string;
}

interface ContentItem {
  type: string;
  content?: string;
  src?: string;
  mediaType?: string;
}

interface Article {
  article_id: string;
  title: string;
  content: string;
  views: number;
  image_url: string | null;
  article_tags: { tags: Tag }[];
}

const HomePage: React.FC = () => {
  const [articleData, setArticleData] = useState<Article[]>([]);
  const [mostTrending, setMostTrending] = useState<Article[]>([]);
  const [exploreMore, setExploreMore] = useState<Article[]>([]);
  const [selectedTags, setSelectedTags] = useState<string>("For You");
  const [searchResults, setSearchResults] = useState<Article[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleTagToggle = (tag: string) => {
    setSelectedTags(tag === selectedTags ? "" : tag);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query) {
      const filteredArticles = articleData.filter((article) =>
        article.title.toLowerCase().startsWith(query.toLowerCase())
      );
      setSearchResults(filteredArticles);
    } else {
      setSearchResults([]);
    }
  };

  const tags = [
    "For You",
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

  const extractTextContent = (content: string) => {
    try {
      const contentArray: ContentItem[] = JSON.parse(content);
      return contentArray
        .filter((item) => item.type === "text")
        .map((item) => item.content)
        .join(" ");
    } catch (error) {
      console.error("Error parsing content:", error);
      return "";
    }
  };

  const handleArticleClick = async (articleId: string) => {
    try {
      await axios.put(
        `https://scribe-space-backend.vercel.app/api/articles/incrementViews/${articleId}`
      );
    } catch (error) {
      console.error("Error updating views:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://scribe-space-backend.vercel.app/api/articles/getArticles"
        );
        const rawArticles: Article[] = response.data;

        const processedArticles = rawArticles.map(async (article) => {
          let imageUrl = "";
          try {
            const contentArray: ContentItem[] = JSON.parse(article.content);
            const imageItem = contentArray.find(
              (item) => item.type === "media" && item.mediaType === "image"
            );
            if (imageItem?.src) {
              imageUrl = imageItem.src;
            }
          } catch (error) {
            console.error(
              `Error parsing content for article ${article.article_id}:`,
              error
            );
          }

          if (imageUrl && imageUrl !== article.image_url) {
            try {
              await axios.put(
                `https://scribe-space-backend.vercel.app/api/articles/updateImageUrl/${article.article_id}`,
                { image_url: imageUrl }
              );
            } catch (error) {
              console.error("Error updating image_url:", error);
            }
          }

          return {
            ...article,
            image_url: imageUrl || null,
          };
        });

        const processedArticlesWithImages = await Promise.all(
          processedArticles
        );

        const sortedArticles = processedArticlesWithImages.sort(
          (a, b) => b.views - a.views
        );

        setMostTrending(sortedArticles.slice(0, 4));
        setExploreMore(sortedArticles.slice(4));
        setArticleData(processedArticlesWithImages);
      } catch (err) {
        console.error("Error fetching articles:", err);
      }
    };

    fetchData();
  }, []);

  const filteredArticles = (articles: Article[]) => {
    if (!selectedTags || selectedTags === "For You") return articles;
    return articles.filter((article) =>
      article.article_tags.some(
        (tagWrapper) => tagWrapper.tags.name === selectedTags
      )
    );
  };

  return (
    <div className="homePageContainer">
      <Header onSearch={handleSearch} />
      <div className="main-page">
        <div className="tags-container homePageTag">
          {tags.map((tag, idx) => (
            <button
              key={idx}
              className={`tag-button ${selectedTags === tag ? "selected" : ""}`}
              onClick={() => handleTagToggle(tag)}
            >
              {tag}
            </button>
          ))}
        </div>

        {searchQuery && selectedTags === "For You" && (
          <div className="search-results">
            <h1>Search Results</h1>
            <div className="article-list">
              {searchResults.map((article) => (
                <Link
                  to={`/${article.article_id}`}
                  key={article.article_id}
                  className="article-card"
                  onClick={() => handleArticleClick(article.article_id)}
                >
                  {article.image_url && (
                    <img src={article.image_url} alt={article.title} />
                  )}
                  <h2>{article.title}</h2>
                  <p>
                    {extractTextContent(article.content).substring(0, 100)}...
                  </p>
                  <p className="article-views">
                    <RemoveRedEyeIcon fontSize="medium" /> {article.views}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {selectedTags === "For You" && !searchQuery && (
          <>
            <div className="most-trending">
              <h1>Most Trending</h1>
              <div className="article-list">
                {mostTrending.length === 0 ? (
                  <p> No articles have been created yet.</p>
                ) : (
                  <>
                    <div className="left-column">
                      {filteredArticles(mostTrending)
                        .slice(0, 1)
                        .map((article) => (
                          <Link
                            to={`/${article.article_id}`}
                            key={article.article_id}
                            className="article-card large"
                            onClick={() =>
                              handleArticleClick(article.article_id)
                            }
                          >
                            {article.image_url && (
                              <img
                                src={article.image_url}
                                alt={article.title}
                              />
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
                              <RemoveRedEyeIcon fontSize="medium" />{" "}
                              {article.views}
                            </p>
                          </Link>
                        ))}
                    </div>
                    <div className="right-column">
                      {filteredArticles(mostTrending)
                        .slice(1, 4)
                        .map((article) => (
                          <Link
                            to={`/${article.article_id}`}
                            key={article.article_id}
                            className="article-card"
                            onClick={() =>
                              handleArticleClick(article.article_id)
                            }
                          >
                            {article.image_url && (
                              <img
                                src={article.image_url}
                                alt={article.title}
                              />
                            )}
                            <div className="article-trending-info">
                              <h2>{article.title}</h2>
                              <p>
                                {extractTextContent(article.content).substring(
                                  0,
                                  100
                                )}
                                ...
                              </p>
                              <div className="article-tags">
                                {article.article_tags.map(
                                  (tagWrapper, index) => (
                                    <p className="tag" key={index}>
                                      {tagWrapper.tags.name}
                                    </p>
                                  )
                                )}
                              </div>
                              <p className="article-views">
                                <RemoveRedEyeIcon fontSize="medium" />{" "}
                                {article.views}
                              </p>
                            </div>
                          </Link>
                        ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="explore-more">
              <h1>Explore More</h1>
              <div className="article-list">
                {filteredArticles(exploreMore).map((article) => (
                  <Link
                    to={`/${article.article_id}`}
                    key={article.article_id}
                    className="article-card"
                    onClick={() => handleArticleClick(article.article_id)}
                  >
                    {article.image_url && (
                      <img src={article.image_url} alt={article.title} />
                    )}
                    <h2>{article.title}</h2>
                    <p>
                      {extractTextContent(article.content).substring(0, 100)}...
                    </p>

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
                {filteredArticles(exploreMore).length === 0 && (
                  <p>No articles found for the selected tag.</p>
                )}
              </div>
            </div>
          </>
        )}

        {selectedTags && selectedTags !== "For You" && (
          <div className="articles-related">
            <h1>Articles related to {selectedTags}</h1>
            <div className="article-list">
              {filteredArticles(articleData).map((article) => (
                <Link
                  to={`/${article.article_id}`}
                  key={article.article_id}
                  className="article-card"
                  onClick={() => handleArticleClick(article.article_id)}
                >
                  {article.image_url && (
                    <img src={article.image_url} alt={article.title} />
                  )}
                  <h2>{article.title}</h2>
                  <p>
                    {extractTextContent(article.content).substring(0, 100)}...
                  </p>

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
              {filteredArticles(articleData).length === 0 && (
                <p>No articles found for the selected tag.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
