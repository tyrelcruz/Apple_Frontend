const IMGBB_API_KEY = "bd64896c77dbb44bac75f1ae43d8b3ad";
const IMGBB_UPLOAD_URL = "https://api.imgbb.com/1/upload";

export const uploadImageToImgBB = async (file) => {
  try {
    const formData = new FormData();
    formData.append("image", file);

    const response = await fetch(`${IMGBB_UPLOAD_URL}?key=${IMGBB_API_KEY}`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.error?.message || "Failed to upload image");
    }

    return data.data.url; // Return the direct image URL
  } catch (error) {
    console.error("Error uploading image to ImgBB:", error);
    throw new Error("Failed to upload image. Please try again.");
  }
};
