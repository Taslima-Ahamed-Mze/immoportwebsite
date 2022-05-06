import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useParams, useLocation } from 'react-router-dom';
import { useEffect, useState, createContext } from 'react';
import { Property } from '../Interface/Property';
import { getSingleProperty} from '../Api/Property';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import LocationOnIcon from '@mui/icons-material/LocationOn';




const SingleProperty = ()=> {

    const { name } = useParams();
    const location= useLocation();
    const id = location.state
    
    const [dataProperty, setDataProperty] = useState<Array<Property>| null>(null)

    const ItemImage = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        backgroundImage:`url(https://www.latelier-immo.fr/public/img/medium/f948bd5e2b38e4853948994e2c7c9eab.jpg)`,
        height:'500px'
    }));

    
     
    useEffect(() => {
        getSingleProperty(id as number)
        .then(response => {
            setDataProperty(response)
            console.log(response);
                        
        })
        
    },[])

  return (
    <Grid container spacing={3} sx={{p:10}}>

        <Grid item xs={8}>
            <ItemImage >
                <Box>

                </Box>
            </ItemImage>
        </Grid>
        <Grid item xs={4} direction={"column"} spacing={5}>
            
            <Typography gutterBottom variant="h5" component="div">
            Résidence Launey
            </Typography>
           <LocationOnIcon /> Impasse Bonaparte
                
          
            
        </Grid>
        

    </Grid>
  );
}


export default SingleProperty;

