import axios from "axios";

export const fetchBlogs = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get("api/v1/blog/bulk", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response?.data?.data?.posts;
};
