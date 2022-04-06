import { useEffect, useState } from 'react';
import { getProfile } from '../Api/Auth';
import Client from '../Interface/Client';

const Profile = () => {
    const [token, setToken] = useState<string | null>(null)
    const [dataProfile, getDataProfile] = useState<Client>()

    useEffect(() => {

        if (token != null) {
            console.log("token : " + token)
            getProfile(token)
                .then(response => {
                    getDataProfile(response)
                })
        } else {
            setToken(localStorage.getItem('access_token'))
        }
    }, [token])

    return (
        <div className="profileWrapper">
            {dataProfile && <p>{dataProfile.lastname}</p>}
        </div>
    )
}

export default Profile;