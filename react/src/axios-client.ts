import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";

const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
});

axiosClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem("ACCESS_TOKEN");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    const { response } = error;
    if (response) {
      if (response.status === 401) {
        localStorage.removeItem("ACCESS_TOKEN");
        // window.location.reload();
      } else if (response.status === 404) {
        // Handle 404 (Not Found)
      }
    }
    throw error;
  }
);

export default axiosClient;
