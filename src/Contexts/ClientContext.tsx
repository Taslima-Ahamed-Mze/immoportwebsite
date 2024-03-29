import { createContext, useState, useEffect } from "react";
import Children from "../Interface/Children";
import LoggedClient from "../Interface/LoggedClient";
import { logoutProfile } from "../Api/Auth";

const ClientContext = createContext<LoggedClient>({
  id: undefined,
  lastname: undefined,
  firstname: undefined,
  mail: undefined,
  phone: undefined,
  isLoggedIn: false,
  login: () => { },
  logout: () => { },
})

export const ClientProvider = ({ children }: Children) => {
  const [id, setId] = useState<undefined>(undefined)
  const [lastname, setLastname] = useState<undefined>(undefined)
  const [firstname, setFirstname] = useState<undefined>(undefined)
  const [mail, setMail] = useState<undefined>(undefined)
  const [phone, setPhone] = useState<undefined>(undefined)
  const [isLoggedIn, setLoggedIn] = useState(() => {
    const token = localStorage.getItem("access_token")
    return token != null
  })

  const login = () => {
    setLoggedIn(true);
  }

  const logout = () => {
    logoutProfile()
    setLoggedIn(false)
    setId(undefined)
    setLastname(undefined)
    setFirstname(undefined)
    setMail(undefined)
    setPhone(undefined)
  }

  return (
    <ClientContext.Provider value={{ id, lastname, firstname, mail, phone, isLoggedIn, login, logout }}>
      {children}
    </ClientContext.Provider>
  )
}

export default ClientContext;
