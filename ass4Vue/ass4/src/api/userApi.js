
export const createUserApi = async (userData) => {
  const response = await fetch('http://localhost:9090/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error('Failed to create user');
  }

  const data = await response.json();
  console.log("Create API", data);
  return data;
};


export const loginUserApi = async (userData) => {
  const response = await fetch('http://localhost:9090/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    console.log(response)
  }

  const data = await response.json();
  console.log("Login API", data);
  return data;
};
