import { useEffect, useState } from 'react';

const useFetchBlogs = () => {
	const [blogs, setBlogs] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(
					'https://heady-star-waste.glitch.me/blog',
					{
						mode: 'cors',
						method: 'GET',
						headers: {
							'Content-Type': 'application/json',
						},
					}
				);

				if (!response.ok) {
					throw new Error('Network response was not ok');
				}

				const result = await response.json();
				setBlogs(result.data);
			} catch (err) {
				setError(err);
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, []);

	return [blogs, loading, error];
};

export default useFetchBlogs;
