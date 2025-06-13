const isDevelopment = import.meta.env.VITE_MODE === "development";

export default {
  HOST: isDevelopment
    ? import.meta.env.VITE_LOCAL_HOST
    : `https://${import.meta.env.VITE_API_URL}/api`,
};
