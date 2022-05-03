import { createContext, useState } from "react";
import Client from "../Interface/Client";
import Children from "../Interface/Children";

const ClientContext = createContext<Client>({
  isLogged: () => {},
  setToken: () => {},
  lastname: undefined,
  firstname: undefined,
  mail: undefined,
  phone: undefined,
  access_token: undefined,
});

// provider is used to encapsulate only the components that need the state in this context

export const ClientProvider = ({ children }: Children) => {
  const [lastname, setLastname] = useState<undefined>(undefined);
  const [firstname, setFirstname] = useState<undefined>(undefined);
  const [mail, setMail] = useState<undefined>(undefined);
  const [phone, setPhone] = useState<undefined>(undefined);
  const [access_token, setToken] = useState<undefined>(undefined);

  // return (
  //     <ClientContext.Provider value={{ lastname, firstname, mail, phone, access_token }}>
  //         {children}
  //     </ClientContext.Provider>
  // )
};

export default ClientContext;
