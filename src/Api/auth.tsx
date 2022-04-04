import base from "./base";


export const login = (mail:string,password:string) => {
    base.post('login-client',{
        mail,
        password
    }).then((response) => {
       if(response.data.access_token)
       {
        localStorage.setItem("access_token", JSON.stringify(response.data));
       }
    });

};
  

