import axios from "axios";

const BASE_URL = "http://localhost:3000/api"; // Replace with your backend URL

export const varident_post = async (formData) => {
  for (let pair of formData.entries()) {
  console.log(`${pair[0]}: ${pair[1]}`);
}
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