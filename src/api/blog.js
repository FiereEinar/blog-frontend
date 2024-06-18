import axios from "axios";

const BASE_URL = 'https://heady-star-waste.glitch.me';

export const fetchBlogs = async () => {
  const { data } = await axios.get(`${BASE_URL}/blog`)
  return data.data;
};

// UNUSED
export const fetchBlogById = async (blogId) => {
  const { data } = await axios.get(`${BASE_URL}/blog/${blogId}`)

  return data.data;
};

// UNUSED
export const fetchBlogByTopicId = async (topicId) => {
  const { data } = await axios.get(`${BASE_URL}/topic/${topicId}`);

  return data.data;
};
