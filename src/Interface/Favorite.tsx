interface Favorite {
    id: number | undefined
    favorite_list: {
        id: number | undefined
        name: string | undefined;
        address: string | undefined;
        price: number | undefined;
        zipcode: number | undefined;
        city: string | undefined;
        property_pictures:Array<any> | undefined;
    }

}
export default Favorite