import React, { useContext } from "react";
import AuthForm from "../Component/NavBar/Auth/AuthForm"
import RegisterForm from "../Component/NavBar/Register/RegisterForm";
import Profile from "../Pages/Profile";
import PageNotFound from "../Pages/PageNotFound";
import Property from "../Component/HomePage"
import ClientContext from "../Contexts/ClientContext";
import { Navigate, Outlet } from "react-router-dom";

const routes = [
    {
        path: '/auth',
        component: AuthForm
    },
    {
        path: '/register',
        component: RegisterForm
    },
    {
        path: '/espaceclient',
        component: Profile
    },
    {
        path: '/*',
        component: PageNotFound
    },
    {
        path: '/',
        component: Property
    }
]

export const PrivateRoute = () => {
    const user = useContext(ClientContext)

    if (user.isLoggedIn == true) {
        return user ? <Outlet /> : <Navigate to="/espaceclient" />
    } else {
        return (<></>)
    }
}

export default routes