import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:5000", // Default fallback
  timeout: 10000,
});

// Utility function for API requests
const apiRequest = async (method, url, data = null, headers = {}) => {
  try {
    const options = {
      method,
      url,
      data,
      headers,
    };

    const res = await apiClient(options);

    if (res.status >= 200 && res.status < 300) {
      return res.data;
    } else {
      console.error("Unexpected response:", res);
    }
  } catch (err) {
    console.error(`API ${method} error on ${url}:`, err);
    throw err;
  }
};

// Fetch all projects
export const getAllProjects = () => apiRequest("GET", "/projects");
export const getAllImages = () => apiRequest("GET", "/image-gallery");

// Login request
export const loginRequest = (data) =>
  apiRequest("POST", "/users/login", {
    email: data.email,
    password: data.password,
  });

// Signup request
export const signupRequest = (data) =>
  apiRequest("POST", "/users/signup", {
    name: data.name,
    email: data.email,
    password: data.password,
  });

// Add a project (with file upload)
export const addProject = async (data) => {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("description", data.description);
  formData.append("image", data.image); // Ensure this is a File object

  return apiRequest("POST", "/projects/new", formData, {
    "Content-Type": "multipart/form-data", // Required header for file uploads
  });
};

// Get project details by ID
export const getProjectDetails = (id) => apiRequest("GET", `/projects/${id}`);

// Update a project
export const projectUpdate = (data, id) =>
  apiRequest("PUT", `/projects/${id}`, {
    title: data.title,
    image: data.image,
    description: data.description,
  });

// Delete a project
export const projectDelete = (id) => apiRequest("DELETE", `/projects/${id}`);
export const deleteImage = (url) => apiRequest("DELETE", `/image-gallery/delete-by-url/${encodeURIComponent(url)}`);

// Send email
export const sendEmail = async (data) => {
  try {
    const res = await axios.post("/contact-us", data);

    if (res.status === 200) {
      console.log("Email sent successfully:", res.data);
      return res.data;
    } else {
      console.error("Failed to send email:", res);
    }
  } catch (err) {
    console.error("Error sending email:", err);
    throw err;
  }
};
