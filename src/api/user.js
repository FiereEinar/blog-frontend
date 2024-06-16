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

export const postSignUp = async (data) => {
  const response = await fetch(
    `${BASE_URL}/auth/signup`,
    {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }
  );

  return response;
};

export const getUserById = async (userId) => {
  const response = await fetch(
    `${BASE_URL}/user/${userId}`,
    {
      mode: 'cors',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('Token')
      },
    }
  );

  const result = await response.json();

  return result.data;
};

export const updateUserById = async (data, userId) => {
  const response = await fetch(
    `${BASE_URL}/user/${userId}`,
    {
      mode: 'cors',
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('Token')
      },
      body: JSON.stringify(data)
    }
  );

  return response
};
