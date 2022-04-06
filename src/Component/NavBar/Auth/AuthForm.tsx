import * as React from 'react';
import {login} from '../../../Api/Auth';

// import { FC } from 'react' // we ensure that we return valid JSX 
const AuthForm = () => {
    // const [mail, setMail] = useState('');
    // const handleMailValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setMail(e.target.mail);
    // };

    // const [password, setPassword] = useState('');
    // const handlePasswordValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setPassword(e.target.password);
    // };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const data = new FormData(e.currentTarget)
        /* console.log({
            mail: data.get('email'),
            password: data.get('password')
        }) */
        if(data.get('email') && data.get('password'))
        {
            login(data.get('email') as string,data.get('password') as string);
        }
        

    }

    // const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     console.log(e.target.value);
    // };

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
