import { useState, useEffect } from "react";
import customAxios from "./BaseUrl";


// Add favorites

export const addFavorite = async (
    id: number
) => {
    return customAxios
        .post("customer/new-favorite-list", {
            id
        })
        .then((response) => {
            return response;
        })
        .catch((error) => {
            return error.response;
        })
};

// Delete favorites

const DeleteFavorite = async (token: string) => { };

// Call favoriteList when Client is logged in.

const GetFavoriteList = async (token: string) => {

    return customAxios.get("customer/my-favorite-list", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then((response) => {
            console.log(response);
            return response.data.favorites;
        })
        .catch((error) => {
            console.log(error);
            return error.response.data;
        });
};





