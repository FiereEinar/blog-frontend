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

export const postEditComment = async (data, commentId, blogId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/blog/${blogId}/comments/${commentId}`,
      {
        mode: 'cors',
        method: 'PUT',
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

export const deleteComment = async (commentId, blogId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/blog/${blogId}/comments/${commentId}`,
      {
        mode: 'cors',
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('Token'),
        },
      }
    );

    const result = await response.json();

    return result;
  } catch (error) {
    console.error('Error posting comment:', error);
    throw new Error('Failed to post the comment.');
  }
};