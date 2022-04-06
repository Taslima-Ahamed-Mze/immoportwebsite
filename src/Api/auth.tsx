import base from "./BaseUrl";
import {
    Navigate,
} from "react-router-dom";

export const login = async (mail: string, password: string) => {
    return base.get('auth', {
        params: {
            mail,
            password
        }

    }).then((response) => {
        if (response.data.access_token) {
            localStorage.setItem("access_token", JSON.stringify(response.data.access_token));
            return <Navigate to="/profile" />;
        }

    }).catch(error => {

        console.log(error.response.data.message);
    });

};
export const register = async () => {

}
export const profile = async (token: string) => {
    return base.get('client/profile', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then((response) => response.data)
        .catch(error => {
            console.error('Error', error)
        })
}
