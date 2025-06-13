import React, { useEffect, useState } from "react";
import "../../styles/ArticleList.css";
import ArticleList from "../../components/ArticleList";
import Footer from "../../components/Footer";
import { fetchArticles } from "../../services/ArticleService";

function ArticleListPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const data = await fetchArticles();
        setArticles(data || []); // Ensure we always set an array
      } catch (err) {
        console.error("Error loading articles:", err);
        setError("Failed to load articles");
      } finally {
        setLoading(false);
      }
    };
    loadArticles();
  }, []);

  return (
    <div
      className="article-list-page"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div>
        <h1 className="articles-header"></h1>
        {loading ? (
          <div style={{ padding: 24 }}>Loading...</div>
        ) : error ? (
          <div style={{ color: "#e53935", padding: 24 }}>{error}</div>
        ) : (
          <ArticleList articles={articles} />
        )}
      </div>
      <Footer />
    </div>
  );
}

export default ArticleListPage;
