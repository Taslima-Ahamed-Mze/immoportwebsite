interface LoggedClient {
    id: number | undefined,
    lastname: string | undefined,
    firstname: string | undefined,
    mail: string | undefined,
    phone: number | undefined,
    isLoggedIn: boolean | null,
    login: () => void;
    logout: () => void;
}

export default LoggedClient
