import axios from "axios";
import { commonLoader } from "../utils/commonEnum";

const axiosServices = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL || "https://farm2fresh-kyhc.onrender.com",
});

// ==============================|| AXIOS - FOR MOCK SERVICES ||============================== //

axiosServices.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem("serviceToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosServices.interceptors.response.use(
  (response) => response,
  (error) => {
    
    if (
      error.response.status === 401 &&
      !window.location.href.includes("/")
    ) {
      window.location = "/";
    }
    return Promise.reject(
      (error.response && error.response.data) || "Wrong Services"
    );
  }
);

export default axiosServices;

export const fetcher = async (args) => {
  commonLoader("show");
  const [url, config] = Array.isArray(args) ? args : [args];
  const res = await axiosServices.get(url, { ...config });
  commonLoader("hide");
  return res.data;
};

export const fetcherPost = async (args) => {
  
  commonLoader("show");
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await axiosServices.post(url, { ...config });
  commonLoader("hide");
  return res.data;
};

export const fetcherPostFormData = async (args) => {
  commonLoader("show");
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await axiosServices.post(url, config);
  commonLoader("hide");
  return res.data;
};

export const fetcherDownload = async (args, headers) => {
	commonLoader("show");axiosServices.interceptors.request.use(
  async (config) => {
    console.log('Request:', config);
    const accessToken = localStorage.getItem("serviceToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

axiosServices.interceptors.response.use(
  (response) => {
    console.log('Response:', response);
    return response;
  },
  (error) => {
    console.error('Response Error:', error);
    if (
      error.response.status === 401 &&
      !window.location.href.includes("/")
    ) {
      window.location = "/";
    }
    return Promise.reject(
      (error.response && error.response.data) || "Wrong Services"
    );
  }
);
	// Extract URL and config from args
	const [url, config = {}] = Array.isArray(args) ? args : [args];

	// Pass the config directly to Axios
	const res = await axiosServices.post(url, config, headers);

	commonLoader("hide");

	return res;
};