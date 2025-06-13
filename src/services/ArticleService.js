import axios from "axios";
import constants from "../../constants";

const baseURL =
  import.meta.env.VITE_MODE === "development"
    ? import.meta.env.VITE_LOCAL_HOST + "/api/articles"
    : import.meta.env.VITE_API_URL + "/api/articles";

console.log("Current API URL:", baseURL); // Debug log

const api = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
  // Add CORS configuration
  crossDomain: true,
});

// Add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("Request Error:", error);
    return Promise.reject(error);
  }
);

// Add response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error("API Error:", error.response.data);
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error setting up request:", error.message);
    }
    return Promise.reject(error);
  }
);

// Fetch all articles
export const fetchArticles = async () => {
  try {
    const response = await api.get("/");
    return response.data;
  } catch (error) {
    console.error("Fetch Articles Error:", error);
    throw error;
  }
};

// Rest of your code remains the same...

// Create article
export const createArticle = async (article) => {
  try {
    const formData = new FormData();

    // Append all article fields to formData
    Object.keys(article).forEach((key) => {
      if (key === "image" && article[key] instanceof File) {
        formData.append("image", article[key]);
      } else if (key !== "image") {
        // Don't append image if it's not a File
        formData.append(key, article[key]);
      }
    });

    const response = await api.post("/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating article:", error);
    throw new Error(
      error.response?.data?.message || "Failed to create article"
    );
  }
};

// Update article
export const updateArticle = async (id, article) => {
  try {
    const formData = new FormData();

    // Append all article fields to formData
    Object.keys(article).forEach((key) => {
      if (key === "image" && article[key] instanceof File) {
        formData.append("image", article[key]);
      } else if (key !== "image") {
        // Don't append image if it's not a File
        formData.append(key, article[key]);
      }
    });

    const response = await api.put(`/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating article:", error);
    throw new Error(
      error.response?.data?.message || "Failed to update article"
    );
  }
};

// Delete article
export const deleteArticle = async (id) => {
  try {
    const response = await api.delete(`/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to delete article"
    );
  }
};

// Get single article
export const getArticle = async (id) => {
  try {
    const response = await api.get(`/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch article");
  }
};
