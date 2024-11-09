// src/utils/apiService.ts

import axios from "axios";
import Cookies from "js-cookie";

// Function to handle the file upload API call with the required JSON structure
export const submitOrderForm = async (title: string, file: File) => {
  try {
    // Create FormData and append JSON-structured data as a string
    const formData = new FormData();
    formData.append("data", JSON.stringify({ title: title, form: "" })); // JSON with empty `form` as a placeholder
    formData.append("files.form", file); // Append file as `form`

    // Get token from cookies
    const token = Cookies.get("jwt");
    if (!token) {
      throw new Error("No token found");
    }

    // Make the API call with FormData
    const response = await axios.post(
      "http://localhost:1337/api/orders",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data", // Required for FormData
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error submitting file", error);
    throw error; // Propagate the error to be handled by the caller
  }
};

