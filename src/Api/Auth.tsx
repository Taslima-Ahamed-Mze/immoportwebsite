import customAxios from "./BaseUrl";

export const login = async (mail: string, password: string) => {
    return customAxios.get('auth', {
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

export const logout = () => {
    localStorage.removeItem('access_token')
}

export const register = async (lastname: string, firstname: string, mail: string, password: string, phone: string) => {
    return customAxios.post('auth', {
        lastname,
        firstname,
        mail,
        password,
        phone
    }
    ).then((response) => {
        return response.status;
    }).catch(error => {

        return error.response.data;
    });
}

