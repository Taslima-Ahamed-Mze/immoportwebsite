import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../../Api/Auth';

// import { FC } from 'react' // we ensure that we return valid JSX 
const AuthForm = () => {
    const navigate = useNavigate()
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const data = new FormData(e.currentTarget)
        if (data.get('email') && data.get('password')) {
            login(data.get('email') as string, data.get('password') as string)
                .then(response => {
                    
                    navigate('/profile')

                })
        }
    }

    return (
        <div className="wrapper">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <label>
                        <p>Email</p>
                        <input name="email" required />
                    </label>
                    <label>
                        <p>Password</p>
                        <input name="password" type="password" required />
                    </label>
                </fieldset>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}
export default AuthForm
