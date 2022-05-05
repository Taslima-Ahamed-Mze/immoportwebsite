import customAxios from "./BaseUrl";


export const getProperties= async () => {
    return customAxios.get('property', {
    })
        .then((response) => {
            return response.data.property;
        })
        .catch(error => {
            return error.response.data
        })
}