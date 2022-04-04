import React from "react"

// import { FC } from 'react' // we ensure that we return valid JSX 
const AuthForm = () => {
const handleSubmit = (e:React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault()
    console.log("J'ai cliqué")
}
    return (
        <div className="wrapper">
            <h1>Login</h1>
            <form onSubmit={ handleSubmit}>
                <fieldset>
                    <label>
                        <p>Email</p>
                        <input name="email" />
                    </label>
                    <label>
                        <p>Password</p>
                        <input name="password" />
                    </label>
                </fieldset>
                <button type="submit" >Submit</button>
            </form>
        </div>
    )
}
export default AuthForm
