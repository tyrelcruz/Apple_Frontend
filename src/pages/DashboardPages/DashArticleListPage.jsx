import React, { useEffect, useState } from "react";
import {
  fetchArticles,
  createArticle,
  updateArticle,
  deleteArticle,
} from "../../services/ArticleService";
import constants from "../../../constants";
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
} from "@mui/material";
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
      const res = await fetchArticles();
      setArticles(res.data);
    } catch (err) {
      setError("Failed to load articles");
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
      setPreviewUrl(`${constants.HOST.replace("/api", "")}${article.image}`);
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

      const userId = localStorage.getItem("userId");
      console.log("userId from localStorage:", userId);

      const articleData = {
        title: currentArticle.title,
        content: currentArticle.content,
        category: currentArticle.category,
        status: currentArticle.status,
        author: userId,
      };
      if (currentArticle.image instanceof File) {
        articleData.image = currentArticle.image;
      }
      console.log("articleData to send:", articleData);

      if (editing) {
        await updateArticle(currentArticle._id, articleData);
      } else {
        await createArticle(articleData);
      }
      setOpen(false);
      setPreviewUrl("");
      loadArticles();
    } catch (err) {
      console.error("Error saving article:", err);
      setError(err.message || "Error saving article");
    }
  };

  return (
    <Box className="dash-article-list-page">
      <Button
        onClick={handleAdd}
        sx={{
          mb: 2,
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
      {error && <Typography color="error">{error}</Typography>}
      <TableContainer component={Paper} sx={{ borderRadius: 3, mb: 4 }}>
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
                        src={`${constants.HOST.replace("/api", "")}${article.image}`}
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
                  <TableCell>{article.status}</TableCell>
                  <TableCell>{article.category}</TableCell>
                  <TableCell>
                    {new Date(article.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Button
                      size="small"
                      onClick={() => handleEdit(article)}
                      sx={{ mr: 1 }}
                    >
                      Edit
                    </Button>
                    <Button
                      size="small"
                      color="error"
                      onClick={() => {
                        setDeleteId(article._id);
                        setDeleteDialogOpen(true);
                      }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {}
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
          setPreviewUrl("");
          setCurrentArticle(emptyArticle);
        }}
      >
        <Box
          sx={{
            width: 360,
            p: 3,
            bgcolor: "#f9f9f9",
            borderRadius: 3,
            boxShadow: 24,
            mx: "auto",
            my: 8,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
            {editing ? "Edit Article" : "Add Article"}
          </Typography>
          <form onSubmit={handleSave}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <TextField
                  label="Title"
                  value={currentArticle.title}
                  onChange={(e) =>
                    setCurrentArticle({
                      ...currentArticle,
                      title: e.target.value,
                    })
                  }
                  fullWidth
                  size="small"
                  sx={{ mb: 1, background: "#fff" }}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Content"
                  value={currentArticle.content}
                  onChange={(e) =>
                    setCurrentArticle({
                      ...currentArticle,
                      content: e.target.value,
                    })
                  }
                  fullWidth
                  size="small"
                  multiline
                  minRows={3}
                  sx={{ mb: 1, background: "#fff" }}
                  required
                />
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
                  <Button
                    variant="outlined"
                    component="span"
                    fullWidth
                    sx={{ mb: 1 }}
                  >
                    Upload Image
                  </Button>
                </label>
                {previewUrl && (
                  <Box sx={{ mt: 1, mb: 2 }}>
                    <img
                      src={previewUrl}
                      alt="Preview"
                      style={{
                        maxWidth: "100%",
                        maxHeight: "200px",
                        objectFit: "cover",
                      }}
                    />
                  </Box>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Category"
                  value={currentArticle.category}
                  onChange={(e) =>
                    setCurrentArticle({
                      ...currentArticle,
                      category: e.target.value,
                    })
                  }
                  fullWidth
                  size="small"
                  sx={{ mb: 1, background: "#fff" }}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth size="small" sx={{ mb: 1 }}>
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={currentArticle.status}
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
                <Button
                  type="submit"
                  sx={{
                    width: "100%",
                    mt: 1,
                    background:
                      "linear-gradient(90deg, #4cd964 0%, #5ac8fa 100%)",
                    color: "#fff",
                    borderRadius: 2,
                    fontWeight: 600,
                    textTransform: "none",
                    fontSize: 15,
                    py: 1.2,
                    "&:hover": {
                      background:
                        "linear-gradient(90deg, #5ac8fa 0%, #4cd964 100%)",
                    },
                  }}
                >
                  Save Article
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Modal>

      {}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Delete Article</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this article?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button color="error" onClick={handleDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default DashArticleListPage;
