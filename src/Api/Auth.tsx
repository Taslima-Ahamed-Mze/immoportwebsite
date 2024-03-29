import customAxios from "./BaseUrl";

export const login = async (mail: string, password: string) => {
    return customAxios.get('authentification/client', {
        params: {
            mail,
            password
        }

    }).then((response) => {
        if (response.data.access_token) {
            localStorage.setItem("access_token", response.data.access_token);
        }
        return response;
    }).catch(error => {
        return error.response;
    });

};

export const logoutProfile = () => {
  localStorage.removeItem("access_token");
};

export const register = async (
  lastname: string,
  firstname: string,
  mail: string,
  password: string,
  phone: string
) => {
  return customAxios
    .post("register/client", {
      lastname,
      firstname,
      mail,
      password,
      phone,
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
};

export const getProfile = async (token: string) => {
  return customAxios
    .get("customer/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response.data.client;
    })
    .catch((error) => {
      console.error("Error", error);
    });
};
