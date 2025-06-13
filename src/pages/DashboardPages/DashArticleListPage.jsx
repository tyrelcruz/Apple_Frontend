import React, { useEffect, useState } from "react";
import {
  fetchArticles,
  createArticle,
  updateArticle,
  deleteArticle,
} from "../../services/ArticleService";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  Box,
  Modal,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import Footer from "../../components/Footer";
import "../../styles/ArticleList.css";

const emptyArticle = {
  title: "",
  content: "",
  category: "",
  status: "draft",
  image: null,
};

function DashArticleListPage() {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [currentArticle, setCurrentArticle] = useState(emptyArticle);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    setLoading(true);
    try {
      const data = await fetchArticles();
      console.log("Loaded articles:", data);
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

  const handleAdd = () => {
    setCurrentArticle(emptyArticle);
    setEditing(false);
    setOpen(true);
  };

  const handleEdit = (article) => {
    setCurrentArticle({ ...article });
    setEditing(true);
    setOpen(true);
    if (article.image) {
      setPreviewUrl(article.image);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteArticle(deleteId);
      setDeleteDialogOpen(false);
      setDeleteId(null);
      loadArticles();
    } catch (err) {
      setError("Failed to delete article");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCurrentArticle({
        ...currentArticle,
        image: file,
      });
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("You must be logged in to save articles");
        return;
      }

      // Validate required fields
      if (!currentArticle.title?.trim()) {
        setError("Title is required");
        return;
      }
      if (!currentArticle.content?.trim()) {
        setError("Content is required");
        return;
      }
      if (!currentArticle.category?.trim()) {
        setError("Category is required");
        return;
      }

      const userId = localStorage.getItem("userId");
      console.log("userId from localStorage:", userId);

      const articleData = {
        title: currentArticle.title.trim(),
        content: currentArticle.content.trim(),
        category: currentArticle.category.trim(),
        status: currentArticle.status,
        author: userId,
      };

      // Include image if it exists
      if (currentArticle.image) {
        articleData.image = currentArticle.image;
      }

      if (editing) {
        await updateArticle(currentArticle._id, articleData);
      } else {
        await createArticle(articleData);
      }

      setOpen(false);
      setPreviewUrl("");
      setCurrentArticle(emptyArticle);
      loadArticles();
    } catch (err) {
      console.error("Error saving article:", err);
      setError(err.message || "Error saving article");
    }
  };

  return (
    <Box className="dash-article-list-page" sx={{ p: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Article Management
        </Typography>
        <Button
          onClick={handleAdd}
          startIcon={<AddIcon />}
          sx={{
            background: "linear-gradient(90deg, #4cd964 0%, #5ac8fa 100%)",
            color: "#fff",
            borderRadius: 2,
            fontWeight: 600,
            textTransform: "none",
            px: 3,
          }}
        >
          Add Article
        </Button>
      </Box>

      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Created</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7}>Loading...</TableCell>
              </TableRow>
            ) : articles.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7}>No articles found.</TableCell>
              </TableRow>
            ) : (
              articles.map((article) => (
                <TableRow key={article._id} hover>
                  <TableCell>
                    {article.image ? (
                      <img
                        src={article.image}
                        alt={article.title}
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "cover",
                          borderRadius: "4px",
                        }}
                      />
                    ) : (
                      "No image"
                    )}
                  </TableCell>
                  <TableCell>{article.title}</TableCell>
                  <TableCell>
                    {article.author?.firstName || "-"}{" "}
                    {article.author?.lastName || ""}
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        px: 1,
                        py: 0.5,
                        borderRadius: 1,
                        display: "inline-block",
                        bgcolor:
                          article.status === "published"
                            ? "#4cd964"
                            : article.status === "draft"
                              ? "#FF9500"
                              : "#FF2D55",
                        color: "white",
                        fontSize: "0.875rem",
                      }}
                    >
                      {article.status}
                    </Box>
                  </TableCell>
                  <TableCell>{article.category}</TableCell>
                  <TableCell>
                    {new Date(article.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Tooltip title="Edit">
                      <IconButton
                        size="small"
                        onClick={() => handleEdit(article)}
                        sx={{ mr: 1 }}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => {
                          setDeleteId(article._id);
                          setDeleteDialogOpen(true);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add/Edit Article Modal */}
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
          setPreviewUrl("");
          setCurrentArticle(emptyArticle);
        }}
        aria-labelledby="article-modal-title"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90%",
            maxWidth: 800,
            maxHeight: "90vh",
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
            overflow: "auto",
          }}
        >
          <Typography
            id="article-modal-title"
            variant="h5"
            component="h2"
            sx={{ mb: 3, fontWeight: "bold" }}
          >
            {editing ? "Edit Article" : "Add New Article"}
          </Typography>

          <form onSubmit={handleSave}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Title"
                  value={currentArticle.title}
                  onChange={(e) =>
                    setCurrentArticle({
                      ...currentArticle,
                      title: e.target.value,
                    })
                  }
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Content"
                  value={currentArticle.content}
                  onChange={(e) =>
                    setCurrentArticle({
                      ...currentArticle,
                      content: e.target.value,
                    })
                  }
                  multiline
                  rows={6}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Category"
                  value={currentArticle.category}
                  onChange={(e) =>
                    setCurrentArticle({
                      ...currentArticle,
                      category: e.target.value,
                    })
                  }
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={currentArticle.status}
                    label="Status"
                    onChange={(e) =>
                      setCurrentArticle({
                        ...currentArticle,
                        status: e.target.value,
                      })
                    }
                  >
                    <MenuItem value="draft">Draft</MenuItem>
                    <MenuItem value="published">Published</MenuItem>
                    <MenuItem value="archived">Archived</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <input
                  accept="image/*"
                  type="file"
                  id="image-upload"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
                <label htmlFor="image-upload">
                  <Button variant="outlined" component="span" sx={{ mb: 2 }}>
                    Upload Image
                  </Button>
                </label>
                {previewUrl && (
                  <Box sx={{ mt: 2 }}>
                    <img
                      src={previewUrl}
                      alt="Preview"
                      style={{
                        maxWidth: "100%",
                        maxHeight: "200px",
                        borderRadius: "4px",
                      }}
                    />
                  </Box>
                )}
              </Grid>

              <Grid item xs={12}>
                <Box
                  sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}
                >
                  <Button
                    onClick={() => {
                      setOpen(false);
                      setPreviewUrl("");
                      setCurrentArticle(emptyArticle);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      background:
                        "linear-gradient(90deg, #4cd964 0%, #5ac8fa 100%)",
                    }}
                  >
                    {editing ? "Update" : "Create"}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Modal>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this article? This action cannot be
            undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default DashArticleListPage;
