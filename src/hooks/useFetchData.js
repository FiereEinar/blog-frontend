import axios from 'axios';

const useFetchBlogs = async () => {
	const { data } = await axios.get('https://heady-star-waste.glitch.me/blog')

	return data.data;
};

export default useFetchBlogs;
