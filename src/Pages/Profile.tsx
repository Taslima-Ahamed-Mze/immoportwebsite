import { useEffect, useState } from 'react';
import { getProfile } from '../Api/auth';

const Profile = () => {
    const [results, setResults] = useState([]);
    const [token, setToken] = useState<string|null>(null)
    
    useEffect(() => {
        
        if (token != null) {
            console.log("token : " + token)
            getProfile(token)
                .then(response => {
                   // setResults(response.data)
                    console.log("data: " + response)
                })
        }else{
            setToken(localStorage.getItem('access_token'))
        }
    }, [token])

    return (
        <div className="profileWrapper">
            <p>{results}</p>
        </div>
    )
}

export default Profile;