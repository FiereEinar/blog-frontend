import axios from 'axios';

export const fetchTopics = async () => {
  const { data } = await axios.get('https://heady-star-waste.glitch.me/topic')

  return data.data;
};
