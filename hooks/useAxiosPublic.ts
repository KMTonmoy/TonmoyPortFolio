 
import axios from "axios";

export const useAxiosPublic = () => {
  const axiosPublic = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
  });

  return axiosPublic;
};