import axios from "axios";

const fetchBlogById = async (blogId) => {
  const { data } = await axios.get(`https://heady-star-waste.glitch.me/blog/${blogId}`)

  return data.data;
};

export default fetchBlogById;
