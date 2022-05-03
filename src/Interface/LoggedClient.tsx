interface LoggedClient {
    lastname: string | undefined;
    firstname: string | undefined;
    mail: string | undefined;
    phone: number | undefined;
    access_token: string | undefined;
    isLogged: (isLogged: boolean) => void;
    setToken: (access_token: string) => void
}

export default LoggedClient