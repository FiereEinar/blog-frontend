const BASE_URL = 'https://heady-star-waste.glitch.me';

export const postComment = async (data, blogId) => {
  try {
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
  } catch (error) {
    console.error('Error posting comment:', error);
    throw new Error('Failed to post the comment.');
  }
};
