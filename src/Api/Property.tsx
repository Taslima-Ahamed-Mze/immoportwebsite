import customAxios from "./BaseUrl";


export const getProperties= async () => {
    return customAxios.get('property', {
    })
        .then((response) => {
            return response.data.property;
        })
        .catch(error => {
            return error.response.data
        })
}

export const getSingleProperty= async (id:number) => {
    return customAxios.get('property/'+id)
        .then((response) => {
            return response.data.property;
            
        })
        .catch(error => {
            return error.response.data

        })
}

 export const sendMail = async(
        mail: string,
        message: string,
        id: number
    )=>{
    return customAxios
    .post("property/send-mail", {
      mail,
      message,
      id
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
        
      return error.response;

    });
 }