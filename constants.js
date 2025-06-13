const isDevelopment = import.meta.env.VITE_MODE === "development";

export default {
  HOST: import.meta.env.VITE_API_URL,
  API_URL: import.meta.env.VITE_API_URL + "/api",
};
