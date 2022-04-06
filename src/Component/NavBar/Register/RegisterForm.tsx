const RegisterForm = () => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        alert("Votre enregistrement a bien été pris en compte.")
    }

    return (
        <div className="registerForm">
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <label>
                        <p>Lastname</p>
                        <input name="lastname" required/>
                    </label>
                    <label>
                        <p>Firstname</p>
                        <input name="firstname" required/>
                    </label>
                    <label>
                        <p>Phone</p>
                        <input name="phone" type="number" min="0" required/>
                    </label>
                    <label>
                        <p>Email</p>
                        <input name="email" required/>
                    </label>
                    <label>
                        <p>Password</p>
                        <input name="password" type="password" required/>
                    </label>
                </fieldset>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}
export default RegisterForm
