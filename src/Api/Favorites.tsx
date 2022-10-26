import { useState, useEffect } from "react";
import customAxios from "./BaseUrl";


// Check if client is logged in

// Add favorites

const AddFavorite = async (token : string) => {};

// Delete favorites

const DeleteFavorite = async (token : string) => {};

// Call favoriteList when Client is logged in.

const GetFavoriteList = async (token : string) => {
    
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

         
 


