import { MapLike } from "typescript";
import base from "./BaseUrl";

//
export const login = async (mail:string,password:string) => {
    return base.get('auth',{params:{
        mail,
        password
    }    
    }).then((response) => {
        if(response.data.access_token)
        {
            console.log(response.data);
            localStorage.setItem("access_token", JSON.stringify(response.data.access_token));   
            return response.data;     
        }
        
    }).catch(error => {  
        console.log(error);   
    });
};

export const register = async(lastname:string,firstname:string,mail:string,password:string,phone:string) => {
    return base.post('auth',{
        lastname,
        firstname,
        mail,
        password,
        phone
    }    
    ).then((response) => {
        return response
    }).catch(error => {
        
        console.log(error);   
    });
}

base.interceptors.response.use((response) => {
    switch(response.status)
    {
        case 200 :
            console.log('connected');  
            break;
        case 201 :
            console.log('registered');  
            break;
            
    }
    return response
   }, (error) => {
    switch(error.response.status)
    {
        case 401 :
            console.log('not connected');  
            break;
        case 422 :
            console.log('not registered');
    }
    return Promise.reject(error.response.data)
})
  

