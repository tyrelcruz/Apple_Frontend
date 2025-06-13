import React from "react";
import { useParams, Link } from "react-router-dom";
import articles from "../../article-content";
import "../../styles/ArticlesPage.css";

function ArticlePage() {
  const { id } = useParams();
  const article = articles.find((article) => article.id === parseInt(id));

  if (!article) {
    return (
      <div className="article-not-found">
        <h1>Article not found</h1>
        <Link to="/articles" className="back-link">
          ← Back to Articles
        </Link>
      </div>
    );
  }

  return (
    <div className="article-detail-container">
      <div className="article-detail">
        <div className="article-hero">
          <img
            src={article.image}
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
          {article.content.map((paragraph, index) => (
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
            Last updated: {new Date().toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ArticlePage;
