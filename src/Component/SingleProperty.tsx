import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useParams, useLocation } from 'react-router-dom';
import { useEffect, useState, createContext } from 'react';
import { Property } from '../Interface/Property';
import { getSingleProperty} from '../Api/Property';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Avatar from "@mui/material/Avatar";
import AddIcCallIcon from '@mui/icons-material/AddIcCall';
import CardMedia from '@mui/material/CardMedia';
import {Swiper, SwiperSlide} from 'swiper/react';
import Card from '@mui/material/Card';
import SwiperCore, {
	Navigation,
} from 'swiper/core';
import { makeStyles } from '@mui/styles';
import { CardContent } from '@mui/material';
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import TextareaAutosize from '@mui/material/TextareaAutosize';


const useStyles = makeStyles({
    media: {
        height: 0,
        paddingTop: '70%',
    },
    swiperContainer: {
        paddingBottom: '3rem',
        '& .swiper-pagination-bullet': {
            background: 'red',

        },
        '& .swiper-button-next:after': {
            fontSize: '2rem !important',
        },
        '& .swiper-button-prev:after': {
            fontSize: '2rem !important',
        },
        '& .swiper-button-prev': {
            color: 'red',
        },
        '& .swiper-button-next': {
            color: 'red',
        },

    },
    title: {
        color:'red',
        
    },
    cardinfo:{
        margin:'10px' 
    },
    cardcontact:{
        textAlign:'center',
        margin:'10px' 
    },
    textarea:{
        resize: "both"

    }

}) 


const SingleProperty = ()=> {

    const { name } = useParams();
    const location= useLocation();
    const id = location.state
    
    const [dataProperty, setDataProperty] = useState<Property>()

     
    useEffect(() => {
        getSingleProperty(id as number)
        .then(response => {
            setDataProperty(response)
            console.log(response);
                        
        })
        
    },[])
    const { media, swiperContainer,title, cardinfo,cardcontact,textarea } = useStyles()

  return (
    <Grid container spacing={3} sx={{p:10}}>

        <Grid item xs={8}>
            <Card>
                           
                <Swiper
                pagination={{ clickable: true }}
                grabCursor
                keyboard={{ enabled: true }}
                
                navigation={Navigation}
                >

                    {dataProperty &&dataProperty.property_pictures?.length?dataProperty.property_pictures.map((picture, index)=>(
                        <SwiperSlide key={index}>
                            <CardMedia
                            image={picture.path}
                            className={media}
                            />
                        </SwiperSlide>
                    )):<CardMedia
                    image={'https://us.123rf.com/450wm/romanbykhalets/romanbykhalets1909/romanbykhalets190900245/131068993-ic%C3%B4ne-isol%C3%A9-de-l-image-symbole-de-la-galerie-signe-d-image-pour-le-web-ou-l-application-.jpg?ver=6'}
                    className={media}
                    />}
                </Swiper>
                            
                            
            </Card>
        </Grid>
        <Grid item xs={4} >
          

                <Card className={cardinfo}>
                    <CardContent>

                    
                        <Typography gutterBottom variant="h4" component="div" className={title}>
                        {dataProperty?.name}
                        </Typography>
                        <Typography>{dataProperty?.description}</Typography>
                    
                        <Typography gutterBottom variant="h6" component="div" className={title}>
                        {dataProperty?.property_types.name +' / '+ dataProperty?.property_categories.name +' - '+ dataProperty?.surface+' m²'}
                        </Typography>

                        <Typography gutterBottom  component="div">
                            {dataProperty?.city+' - '+dataProperty?.zipcode}
                        </Typography>

                        <Typography gutterBottom variant="h6" component="div">
                            {dataProperty?.price+' €'}
                        </Typography>
                    </CardContent>
                        

                </Card>

                <Card className={cardcontact}>
                    <CardContent >
                        <Avatar sx={{  bgcolor: "primary.main" }}>
                            <AddIcCallIcon />
                        </Avatar>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                        fullWidth
          id="outlined-textarea"
          label="Message"
          placeholder="Placeholder"
          multiline
          variant="outlined"
          inputProps={{ className: textarea }}
        />
                        
              
              
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Envoyer
                        </Button>
                    
                        
                    </CardContent>
                </Card>
          
                
          
            
        </Grid>
        

    </Grid>
  );
}


export default SingleProperty;

