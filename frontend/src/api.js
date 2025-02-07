import axios from "axios";
import useAuthStore from "./stores/authStore.js";

const BASE_URL = "http://localhost:8000"; // Replace with your backend URL
// const BASE_URL = "http://39.103.137.84:8000/api"; // Replace with your backend URL

const API_URL = `${BASE_URL}/api`;
const AUTH_URL = `${BASE_URL}/auth`;
const USER_URL = `${BASE_URL}/user`;

export const register_post = async (formData) => {
    try {
        const response = await axios.post(`${AUTH_URL}/register`, formData);
        return response.data;
    } catch (error) {
        console.error("Error registering user:", error);
        throw error;
    }
}

export const verify_email = async (formData) => {
    try {
        const response = await axios.post(`${AUTH_URL}/verify_email`, formData);
        return response.data;
    } catch (error) {
        console.error("Error verifying email:", error);
        throw error;
    }
}

export const send_code = async (formData) => {
    try {
        const response = await axios.post(`${AUTH_URL}/send_code`, formData);
        return response.data;
    } catch (error) {
        console.error("Error sending code:", error);
        throw error;
    }
}

export const login_post = async (formData) => {
    try {
        const response = await axios.post(`${AUTH_URL}/login`, formData,{
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error logging in:", error);
        throw error;
    }
}

export const get_profile = async (email, token) => {
    try {
        const response = await axios.get(`${USER_URL}/get_profile?email=${encodeURIComponent(email)}`,{
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error getting profile:", error);
        throw error;
    }
}

export const update_profile = async (formData, token) => {
    try {
        const response = await axios.put(`${USER_URL}/update_profile`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error updating profile:", error);
        throw error;
    }
}

export const update_password = async (formData, token) => {
    try {
        const response = await axios.put(`${USER_URL}/update_password`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error updating password:", error);
        throw error;
    }
}


export const upload_file_post = async (formData) => {
    try {
        const response = await axios.post(`${API_URL}/upload_file`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                'Authorization': `Bearer ${useAuthStore.getState().token}`,
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
    const response = await axios.post(`${API_URL}/varident`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
          'Authorization': `Bearer ${useAuthStore.getState().token}`,
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
    const response = await axios.post(`${API_URL}/chipdesignvcf`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
          'Authorization': `Bearer ${useAuthStore.getState().token}`,
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
    const response = await axios.post(`${API_URL}/chipdesignpop`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
          'Authorization': `Bearer ${useAuthStore.getState().token}`,
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
    const response = await axios.post(`${API_URL}/genimpute`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
          'Authorization': `Bearer ${useAuthStore.getState().token}`,
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
    const response = await axios.post(`${API_URL}/check_jobs`, userData,{
         headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${useAuthStore.getState().token}`,
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
    const response = await axios.get(`${API_URL}/download_results/${jobId}`, {
        responseType: 'blob',
        headers: {
            'Authorization': `Bearer ${useAuthStore.getState().token}`,
        },
    });
    return response.data;
  } catch (error) {
    console.error("Error downloading results:", error);
    throw error;
  }
}