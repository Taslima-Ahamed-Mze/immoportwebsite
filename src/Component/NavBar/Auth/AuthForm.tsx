import React, { useState } from 'react'

// import { FC } from 'react' // we ensure that we return valid JSX 
const AuthForm = () => {
    const [value, setValue] = useState('');
    const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
       alert("Le mail: " + value + " a été soumis")
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
                        <input name="email" value={value} onChange={handleInputValue} />
                    </label>
                    <label>
                        <p>Password</p>
                        <input name="password" type="password" />
                    </label>
                </fieldset>
                <button type="submit">Submit</button>
            </form>
            <div>Input value: {value}</div>
        </div>
    )
}
export default AuthForm
