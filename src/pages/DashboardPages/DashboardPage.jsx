import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Paper,
  Button,
} from "@mui/material";
import {
  BarChart as BarChartIcon,
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  Article as ArticleIcon,
  List as ListIcon,
} from "@mui/icons-material";
import { fetchArticles } from "../../services/ArticleService";

function DashboardPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    setLoading(true);
    try {
      const data = await fetchArticles();
      if (Array.isArray(data)) {
        setArticles(data);
      } else {
        console.error("Received non-array data:", data);
        setArticles([]);
      }
    } catch (err) {
      console.error("Error loading articles:", err);
      setError("Failed to load articles");
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  // Dashboard stats
  const stats = {
    totalArticles: articles.length,
    publishedArticles: articles.filter((a) => a.status === "published").length,
    draftArticles: articles.filter((a) => a.status === "draft").length,
    categories: [...new Set(articles.map((a) => a.category))].length,
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Dashboard Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ mb: 2, fontWeight: "bold" }}>
          Dashboard Overview
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Welcome to your content management dashboard
        </Typography>
      </Box>

      {/* Quick Stats Section */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h6"
          sx={{
            mb: 2,
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <BarChartIcon /> Quick Stats
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                height: "100%",
                background: "linear-gradient(45deg, #4cd964 30%, #5ac8fa 90%)",
                color: "white",
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <Typography variant="h6">Total Articles</Typography>
                    <Typography variant="h4">{stats.totalArticles}</Typography>
                  </Box>
                  <ArticleIcon sx={{ fontSize: 40, opacity: 0.8 }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                height: "100%",
                background: "linear-gradient(45deg, #007AFF 30%, #5856D6 90%)",
                color: "white",
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <Typography variant="h6">Published</Typography>
                    <Typography variant="h4">
                      {stats.publishedArticles}
                    </Typography>
                  </Box>
                  <VisibilityIcon sx={{ fontSize: 40, opacity: 0.8 }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                height: "100%",
                background: "linear-gradient(45deg, #FF9500 30%, #FF2D55 90%)",
                color: "white",
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <Typography variant="h6">Drafts</Typography>
                    <Typography variant="h4">{stats.draftArticles}</Typography>
                  </Box>
                  <EditIcon sx={{ fontSize: 40, opacity: 0.8 }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                height: "100%",
                background: "linear-gradient(45deg, #5856D6 30%, #FF2D55 90%)",
                color: "white",
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <Typography variant="h6">Categories</Typography>
                    <Typography variant="h4">{stats.categories}</Typography>
                  </Box>
                  <BarChartIcon sx={{ fontSize: 40, opacity: 0.8 }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Content Management Section */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h6"
          sx={{
            mb: 2,
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <ArticleIcon /> Content Management
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="subtitle1" color="text.secondary">
            Recent Articles
          </Typography>
          <Button
            href="/dashboard/articles"
            sx={{
              background: "linear-gradient(90deg, #4cd964 0%, #5ac8fa 100%)",
              color: "#fff",
              borderRadius: 2,
              fontWeight: 600,
              textTransform: "none",
              px: 3,
            }}
          >
            View All Articles
          </Button>
        </Box>
        <Paper sx={{ p: 2, borderRadius: 3 }}>
          {loading ? (
            <Typography>Loading articles...</Typography>
          ) : error ? (
            <Typography color="error">{error}</Typography>
          ) : articles.length === 0 ? (
            <Typography>No articles found.</Typography>
          ) : (
            <Box>
              {articles.slice(0, 5).map((article) => (
                <Box
                  key={article._id}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    py: 1,
                    borderBottom: "1px solid",
                    borderColor: "divider",
                    "&:last-child": { borderBottom: "none" },
                  }}
                >
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      bgcolor:
                        article.status === "published"
                          ? "#4cd964"
                          : article.status === "draft"
                            ? "#FF9500"
                            : "#FF2D55",
                      mr: 2,
                    }}
                  />
                  <Typography variant="body2">{article.title}</Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ ml: "auto" }}
                  >
                    {new Date(article.createdAt).toLocaleDateString()}
                  </Typography>
                </Box>
              ))}
            </Box>
          )}
        </Paper>
      </Box>

      {/* Activity Section */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h6"
          sx={{
            mb: 2,
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <ListIcon /> Recent Activity
        </Typography>
        <Paper sx={{ p: 2, borderRadius: 3 }}>
          <Typography variant="body2" color="text.secondary">
            Last 5 actions:
          </Typography>
          <Box sx={{ mt: 2 }}>
            {articles.slice(0, 5).map((article) => (
              <Box
                key={article._id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  py: 1,
                  borderBottom: "1px solid",
                  borderColor: "divider",
                  "&:last-child": { borderBottom: "none" },
                }}
              >
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    bgcolor:
                      article.status === "published"
                        ? "#4cd964"
                        : article.status === "draft"
                          ? "#FF9500"
                          : "#FF2D55",
                    mr: 2,
                  }}
                />
                <Typography variant="body2">
                  {article.title} was{" "}
                  {article.status === "published" ? "published" : "updated"}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ ml: "auto" }}
                >
                  {new Date(article.createdAt).toLocaleDateString()}
                </Typography>
              </Box>
            ))}
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}

export default DashboardPage;
