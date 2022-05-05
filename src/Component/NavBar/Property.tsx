import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useEffect, useState, createContext } from 'react';
import { getProperties} from '../../Api/Property';
import {Property}  from '../../Interface/Property';
import Grid from '@mui/material/Grid';



const Properties= () => {


    const [dataProperty, setDataProperty] = useState<Array<Property>| null>(null)


    useEffect(() => {
        getProperties()
        .then(response => {
            setDataProperty(response)
            console.log(response)    
        })
        
    },[])



    return (
        <Grid container spacing={3} sx={{p:4}}>
            {
                dataProperty != null && dataProperty.map(item => (
                    
                    <Grid item xs={4}>
                        <Card>
                            {item.property_pictures?.map(picture=>(
                                <CardMedia
                                component="img"
                                height="140"
                                image={picture.path}
                                alt={picture.alt}
                                //image="https://www.latelier-immo.fr/public/img/medium/f948bd5e2b38e4853948994e2c7c9eab.jpg"
                                />
                            ))}
                            

                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                {item.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                {item.description}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">Voir plus</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    
                    
                ))
            }
            
            
        </Grid>
    );
};
export default Properties;
