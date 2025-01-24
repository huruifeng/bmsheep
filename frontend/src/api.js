import axios from "axios";

const BASE_URL = "http://localhost:8000/api"; // Replace with your backend URL
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
  try {
    const response = await axios.post(`${BASE_URL}/varident`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error sending varident request:", error);
    throw error;
  }
};


export const chipdesignvcf_post = async (formData) => {
  try {
    const response = await axios.post(`${BASE_URL}/chipdesignvcf`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error sending chipdesignvcf request:", error);
    throw error;
  }
};

export const chipdesignpop_post = async (formData) => {
  try {
    const response = await axios.post(`${BASE_URL}/chipdesignpop`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error sending chipdesignpop request:", error);
    throw error;
  }
};

export const genimpute_post = async (formData) => {
  try {
    const response = await axios.post(`${BASE_URL}/genimpute`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error sending varident request:", error);
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

export const download_results = async (jobId) => {
  try {
    const response = await axios.get(`${BASE_URL}/download_results/${jobId}`, { responseType: 'blob' });
    return response.data;
  } catch (error) {
    console.error("Error downloading results:", error);
    throw error;
  }
}