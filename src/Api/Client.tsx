import customAxios from "./BaseUrl";

export const getProfile = async (token: string) => {
    return customAxios.get('client/profile', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then((response) => {
            return response.data.client;
        })
        .catch(error => {
            console.error('Error', error)
        })
}

export const updateProfile = async (lastname: string, firstname: string, mail: string, password: string, phone: string) => {
    return customAxios.put('client/profile', {
        lastname,
        firstname,
        mail,
        password,
        phone
    })
        .then((response) => {
            return response.data
        })
        .catch(error => {
            return error.response.data;
        })
}