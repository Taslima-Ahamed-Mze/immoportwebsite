import customAxios from "./BaseUrl";

// Add favorites
export const addFavorite = async (
    token: string,
    id_property: number
) => {
    return customAxios
        .post("customer/new-favorite-list", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            id_property
        })
        .then((response) => {
            console.log(response)
            return response;
        })
        .catch((error) => {
            console.log(error.response)
            return error.response;
        })
};

// Delete favorites
export const deleteFavorite = async (token: string, id: number) => {
    return customAxios.delete(`customer/my-favorite-list/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then((response) => {
            console.log(response)
            return response
        })
        .catch((error) => {
            console.log(error.response)
            return error.response
        })
};

// Call favoriteList when Client is logged in.
export const getFavoriteList = async (token: string) => {

    return customAxios.get("customer/my-favorite-list", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then((response) => {
            console.log(response.data.favorite_list);
            return response.data.favorite_list;
        })
        .catch((error) => {
            console.log(error);
            return error.response.data;
        });
};





