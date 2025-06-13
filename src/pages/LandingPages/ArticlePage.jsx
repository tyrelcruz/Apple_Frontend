import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getArticle } from "../../services/ArticleService";
import "../../styles/ArticlesPage.css";
import constants from "../../../constants";

function ArticlePage() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const data = await getArticle(id);
        setArticle(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (loading) {
    return <div className="article-loading">Loading...</div>;
  }

  if (error || !article) {
    return (
      <div className="article-not-found">
        <h1>Article not found</h1>
        <Link to="/articles" className="back-link">
          ← Back to Articles
        </Link>
      </div>
    );
  }

  // Split content into paragraphs by newlines
  const paragraphs = article.content.split("\n").filter((p) => p.trim());

  // Handle image URL
  const imageUrl = article.image
    ? article.image.startsWith("/uploads/")
      ? `${constants.HOST.replace("/api", "")}${article.image}`
      : article.image
    : "/default-article-image.jpg";

  return (
    <div className="article-detail-container">
      <div className="article-detail">
        <div className="article-hero">
          <img
            src={imageUrl}
            alt={article.title}
            className="article-hero-image"
          />
          <div className="article-hero-overlay"></div>
          <div className="article-hero-content">
            <h1>{article.title}</h1>
            <p className="article-subtitle">{article.excerpt}</p>
          </div>
        </div>

        <div className="article-body">
          {paragraphs.map((paragraph, index) => (
            <p key={index} className="article-paragraph">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="article-footer">
          <Link to="/articles" className="back-button">
            ← All Articles
          </Link>
          <span className="article-date">
            Last updated: {new Date(article.updatedAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ArticlePage;
