import axios from "axios";

export const fetchBlogByTopicId = async (topicId) => {
  const { data } = await axios.get(`https://heady-star-waste.glitch.me/topic/${topicId}`);

  return data.data;
};
