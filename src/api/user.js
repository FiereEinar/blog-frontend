const BASE_URL = 'https://heady-star-waste.glitch.me';

export const postSignIn = async (data) => {
  const response = await fetch(
    `${BASE_URL}/auth/login`,
    {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }
  );
  const result = await response.json();

  return result;
};
