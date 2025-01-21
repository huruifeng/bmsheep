import axios from "axios";

const BASE_URL = "http://localhost:3000"; // Replace with your backend URL

export const varident_post = async (formData) => {
  try {
    const response = await axios.post(`${BASE_URL}/varident`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};