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

export const updateProfile = async (token: string, lastname: string, firstname: string, mail: string, phone: string) => {
    return customAxios.put('client/profile', {
        lastname,
        firstname,
        mail,
        phone,
    }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then((response) => {
            return response
        })
        .catch(error => {
            return error.response.data;
        })
}

export const updatePassword = async (token: string, password: string) => {
    return customAxios.put('client/profile/password', {
        password
    }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then((response) => {
            return response.data
        })
        .catch(error => {
            return error.response;
        })
}
