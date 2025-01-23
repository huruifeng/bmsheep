import axios from "axios";

const BASE_URL = "http://localhost:3000/api"; // Replace with your backend URL
// const BASE_URL = "http://39.103.137.84:8000/api"; // Replace with your backend URL

export const upload_file_post = async (formData) => {
    try {
        const response = await axios.post(`${BASE_URL}/upload_file`, formData, {
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

export const check_jobs_post = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/check_jobs`, userData,{
         headers: {
            'Content-Type': 'application/json',
        },
    });
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    throw error;
  }
};