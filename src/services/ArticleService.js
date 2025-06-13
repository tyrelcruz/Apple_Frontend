import axios from "axios";
import constants from "../../constants";

const baseURL = import.meta.env.VITE_API_URL + "/api/articles";

console.log("Environment:", import.meta.env.VITE_MODE);
console.log("API URL:", baseURL);

const api = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
  // Add these options for CORS
  crossDomain: true,
  xhrFields: {
    withCredentials: true,
  },
});

// Add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // Ensure credentials are included
    config.withCredentials = true;
    console.log("Request config:", {
      url: config.url,
      method: config.method,
      headers: config.headers,
      withCredentials: config.withCredentials,
    });
    return config;
  },
  (error) => {
    console.error("Request Error:", error);
    return Promise.reject(error);
  }
);

// Add response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    console.log("Response:", response.data);
    return response;
  },
  (error) => {
    if (error.response) {
      console.error("API Error:", error.response.data);
      console.error("Status:", error.response.status);
      console.error("Headers:", error.response.headers);
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
    console.log("Fetching articles from:", baseURL);
    const token = localStorage.getItem("token");
    console.log("Auth token present:", !!token);

    const response = await api.get("/", {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-Requested-With": "XMLHttpRequest",
      },
    });
    console.log("Articles response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Fetch Articles Error:", error);
    if (error.response) {
      console.error("Error response:", error.response.data);
      console.error("Error status:", error.response.status);
      console.error("Error headers:", error.response.headers);
    }
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
