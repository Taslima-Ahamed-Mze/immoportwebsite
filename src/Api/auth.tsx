import base from "./BaseUrl";

export const login = async (mail: string, password: string) => {
    return base.get('auth', {
        params: {
            mail,
            password
        }

    }).then((response) => {
        if (response.data.access_token) {
            console.log(response.data);
            localStorage.setItem("access_token", JSON.stringify(response.data.access_token));
            return response.data;
        }

    }).catch(error => {

        console.log(error.response.data.message);
    });

};
export const register = async () => {

}
export const getProfile = async (token: string) => {
    return base.get('client/profile', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then((response) => {
            console.log(response.data)
        })
        .catch(error => {
            console.error('Error', error)
        })
}
