import React from "react";
import { Link } from "react-router-dom";
import "../styles/ArticleList.css";
import constants from "../../constants";

function ArticleList({ articles = [] }) {
  const publishedArticles = (articles || []).filter(
    (article) => article?.status === "published"
  );

  if (!publishedArticles.length) {
    return (
      <div className="article-list">
        <div className="articles-container">
          <p>No articles available.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="article-list">
      <div className="articles-container">
        {publishedArticles.map((article) => (
          <Link
            key={article.id || article._id}
            to={`/articles/${article.id || article._id}`}
            className="article-card"
            aria-label={`Read more about ${article.title}`}
          >
            <div className="article-image-container">
              <img
                src={
                  article.image
                    ? article.image.startsWith("/uploads/")
                      ? `${constants.HOST.replace("/api", "")}${article.image}`
                      : article.image
                    : "/default-article-image.jpg"
                }
                alt={article.title}
                className="article-image"
                loading="lazy"
              />
              <div className="article-hover-overlay"></div>
            </div>
            <div className="article-content">
              <h3>{article.title}</h3>
              <p className="article-excerpt">{article.excerpt}</p>
              <div className="article-meta">
                <span className="read-more">Read more →</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ArticleList;
