import * as React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
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
import { Link } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SwiperCore, {
    Keyboard,
    Scrollbar,
    Pagination,
    Navigation,
} from 'swiper/core';
import { Property } from '../Interface/Property';
import { getProperties } from '../Api/Property';



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

const Properties = () => {
    const [dataProperty, setDataProperty] = useState<Array<Property> | null>(null)

    useEffect(() => {
        getProperties()
            .then(response => {
                setDataProperty(response)
                console.log(response);
            })
    }, [])

    SwiperCore.use([Keyboard, Scrollbar, Pagination, Navigation])

    const { media, swiperContainer } = useStyles()

    return (
        <Grid container spacing={3} sx={{ p: 4 }}>
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

                                {item.property_pictures?.length ? item.property_pictures.map((picture, index) => (
                                    <SwiperSlide key={index}>

                                        <CardMedia
                                            image={picture.path}
                                            className={media}
                                        />
                                    </SwiperSlide>
                                )) : <CardMedia
                                    image={'https://us.123rf.com/450wm/romanbykhalets/romanbykhalets1909/romanbykhalets190900245/131068993-ic%C3%B4ne-isol%C3%A9-de-l-image-symbole-de-la-galerie-signe-d-image-pour-le-web-ou-l-application-.jpg?ver=6'}
                                    className={media}
                                />}
                            </Swiper>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {item.name}
                                    <Typography color="text.primary">
                                        {item.address}
                                    </Typography>
                                </Typography>
                                <Typography variant="body2" color="text.secondary" minHeight={50}>
                                    {item.description}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <FavoriteIcon color='error'/>
                                <Button size="small">
                                    <Link to={`/property/${item.name}`} style={{ textDecoration: 'none', textTransform: 'uppercase', textEmphasisColor:'color' }} state={item.id}>voir plus</Link>
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))
            }
        </Grid>
    );
};
export default Properties;