import customAxios from "./BaseUrl";

export const getProfile = async (token: string) => {
  return customAxios
    .get("client/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response.data.client;
    })
    .catch((error) => {
      return error.response.data;
    });
};

export const updateProfile = async (
  token: string,
  lastname: string,
  firstname: string,
  mail: string,
  phone: string,
  password: string
) => {
  return customAxios
    .put("client/profile", {
      authorization: `Bearer ${token}`,
      lastname,
      firstname,
      mail,
      phone,
      password,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};
