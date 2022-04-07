import customAxios from "./BaseUrl";

export const login = async (mail: string, password: string) => {
    return customAxios.get('auth', {
        params: {
            mail,
            password
        }

    }).then((response) => {
        if (response.data.access_token) {
            console.log(response.data);
            localStorage.setItem("access_token", response.data.access_token);
            return response;
        }
    }).catch(error => {
        return error.response;
    });

};

export const register = async (lastname: string, firstname: string, mail: string, password: string, phone: string) => {
    return customAxios.post('auth', {
        lastname,
        firstname,
        mail,
        password,
        phone
    }
    ).then((response) => {
        //console.log('registered'+response.status);
        
        return response.status;
    }).catch(error => {
        
        return error.response.data;
    });
}
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
