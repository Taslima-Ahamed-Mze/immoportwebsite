import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {

    return (
        <div>
            <h1>Cette page n'existe pas!</h1>
            <h3><Link to="/">Revenir à l'accueil</Link></h3>
        </div>
    )
}

export default PageNotFound