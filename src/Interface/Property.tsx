export interface Property {
    name: string | undefined;
    description: string | undefined;
    id:number | undefined;
    property_pictures:Array<any> | undefined;
    address:string | undefined;
    price:string | undefined;
    property_types : {
        name:string | undefined
    };
    property_categories :{
        name:string |undefined
    };
    surface : number |undefined;
    city : string |undefined;
    zipcode : number |undefined;
    
}

