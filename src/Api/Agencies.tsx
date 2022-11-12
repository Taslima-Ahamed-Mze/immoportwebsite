import customAxios from "./BaseUrl";


export const getAgencies = async () => {
    return customAxios
        .get("contact")
        .then((response) => {
            return response.data.agency
        })
        .catch((error) => {
            return error.response.data
        })
}