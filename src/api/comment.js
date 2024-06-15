const BASE_URL = 'https://heady-star-waste.glitch.me';

export const postComment = async (data, blogId) => {
  const response = await fetch(
    `${BASE_URL}/blog/${blogId}/comments`,
    {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('Token'),
      },
      body: JSON.stringify(data),
    }
  );

  const result = await response.json();

  return result;
};
