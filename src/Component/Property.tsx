import * as React from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import Card from '@mui/material/Card';
import { makeStyles } from '@mui/styles';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useEffect, useState, createContext } from 'react';
import Grid from '@mui/material/Grid';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SwiperCore, {
    Keyboard,
	Scrollbar,
	Pagination,
	Navigation,
} from 'swiper/core';



import {Property}  from '../Interface/Property';
import { getProperties} from '../Api/Property';



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
}) 

const Properties= () => {


    const [dataProperty, setDataProperty] = useState<Array<Property>| null>(null)

    const images = ['https://images.assetsdelivery.com/compings_v2/elxeneize/elxeneize1908/elxeneize190800045.jpg','https://www.latelier-immo.fr/public/img/medium/f948bd5e2b38e4853948994e2c7c9eab.jpg']


    useEffect(() => {
        getProperties()
        .then(response => {
            setDataProperty(response)
            console.log(response)    
        })
        
    },[])

    SwiperCore.use([Keyboard, Scrollbar, Pagination, Navigation])

    const { media, swiperContainer } = useStyles()
    
    return (
        <Grid container spacing={3} sx={{p:4}}>
            {
                dataProperty != null && dataProperty.map(item => (
                    
                    <Grid item xs={4}>
                        <Card>
                           {/*  <CardHeader
                                title={item.name}
                                subheader={item.address}
                            /> */}
                            <Swiper
                            pagination={{ clickable: true }}
                            grabCursor
                            keyboard={{ enabled: true }}
                            className={swiperContainer}
                            navigation={Navigation}
                            >

                                {item.property_pictures?.map((picture, index)=>(
                                    <SwiperSlide key={index}>

                                        <CardMedia
                                       
                                        image={picture.path}
                                        className={media}
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                {item.name}
                                <Typography color="text.primary">
                                {item.address}
                                </Typography>
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                {item.description}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <FavoriteIcon />
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
