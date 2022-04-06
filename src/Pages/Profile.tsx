import { useEffect } from 'react';
import { profile } from '../Api/Auth';

const Profile = () => {
    useEffect(() => {
        const token = localStorage.getItem('access_token')
        profile(token as string)
            .then(response => {
                if (response.access_token) {
                    profile(response.access_token as string)
                        .then(response => {
                            console.log(response)
                        })
                }
            })
    }, [])

    return (
        <div className="profileWrapper">

        </div>
    )
}

export default Profile;