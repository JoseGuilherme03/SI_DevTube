let username = '';
let password = '';

const url = 'https://si-devtube-api.onrender.com'

const getHeaders = () => ({
  "Content-Type": "application/json",
  "Authorization": "Basic " + btoa(`${username}:${password}`),
});

export const login = async (user, pass) => {
  username = user;
  password = pass;

  const response = await fetch(`${url}/login`, {
    method: "POST",
    headers: getHeaders(),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

export const register = async (user, pass) => {
  const response = await fetch(`${url}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: user, password: pass }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

export const getVideos = () => {
  return fetch(`${url}/videos/`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
};

export const getCategories = () => {
  return fetch(`${url}/categories/`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
};

export const createVideo = (videoData) => {
  return fetch(`${url}/videos/`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(videoData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      throw error;
    });
};
