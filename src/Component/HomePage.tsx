import * as React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import Card from '@mui/material/Card';
import { makeStyles } from '@mui/styles';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useContext, useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { Link, useLocation } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SwiperCore, {
    Keyboard,
    Scrollbar,
    Pagination,
    Navigation,
} from 'swiper/core';
import { Property } from '../Interface/Property';
import { getProperties } from '../Api/Property';
import { addFavorite } from '../Api/Favorites';
import ClientContext from "../Contexts/ClientContext";
import { Tooltip } from '@mui/material';
// @ts-ignore
import { NotificationManager } from 'react-notifications';

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

    likeButton: {
        background: "white !important",
        borderRadius: '0 !important',
        minWidth: '4px !important'
    },

    likeIcon: {
        color: "#f13d3d !important",
        '&:hover': {
            color: '#ff5959 !important',
        }
    },

    seeMoreButton: {
        background: 'black !important',
        color: 'white !important',
        borderRadius: '0 !important',
        fontSize: 'small !important',
        paddingInline: '48px !important',
        '&:hover': {
            backgroundColor: '#bdbdbd !important',
            color: 'white !important',
        }
    },

    link: {
        '&:visited': {
            color: 'white !important'
        }
    }

})

const HomePage = () => {
    const [dataProperty, setDataProperty] = useState<Array<Property> | null>(null)
    const classes = useStyles();

    useEffect(() => {
        getProperties()
            .then(response => {
                setDataProperty(response)
            })
    }, [])

    SwiperCore.use([Keyboard, Scrollbar, Pagination, Navigation])

    const token = localStorage.getItem('access_token')
    const addFavoriteClick = async (event: any) => {
        const propertyId = event.currentTarget.value
        console.log(propertyId)
        addFavorite(
            propertyId as number,
            token as string
        ).then((response) => {
            if (response.status == 201) {
                NotificationManager.success("Ce bien a été ajouté à vos favoris.", ':)', 2000);
            }
            else if (response.status == 422) {
                NotificationManager.warning(response.data.id_property[0])
            }
            else if (response.status == 409) {
                NotificationManager.error(JSON.stringify(response.data.message), 'Error!');
            }
        })
    }
    const user = useContext(ClientContext)

    return (
        <Grid container spacing={3} sx={{ p: 5 }}>
            <Grid item xs={12}>
                <Typography textAlign={"center"} color="#f13d3d" fontFamily={"HomemadeApple"} variant="h4">nos dernières offres</Typography>
            </Grid>
            <Grid item xs={12}>
                <Grid container direction="row">
                    {
                        dataProperty != null && dataProperty.map(item => (

                            <Grid item xs={12} lg={4} sx={{ p: 2 }}>
                                <Card>
                                    {/*  <CardHeader
                                title={item.name}
                                subheader={item.address}
                            /> */}
                                    <Swiper
                                        pagination={{ clickable: true }}
                                        grabCursor
                                        keyboard={{ enabled: true }}
                                        className={classes.swiperContainer}
                                        navigation={Navigation}
                                    >

                                        {item.property_pictures?.length ? item.property_pictures.map((picture, index) => (
                                            <SwiperSlide key={index}>

                                                <CardMedia
                                                    image={picture.path}
                                                    className={classes.media}
                                                />
                                            </SwiperSlide>
                                        )) : <CardMedia
                                            image={'https://us.123rf.com/450wm/romanbykhalets/romanbykhalets1909/romanbykhalets190900245/131068993-ic%C3%B4ne-isol%C3%A9-de-l-image-symbole-de-la-galerie-signe-d-image-pour-le-web-ou-l-application-.jpg?ver=6'}
                                            className={classes.media}
                                        />}
                                    </Swiper>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {item.name}
                                            <Typography color="text.primary">
                                                {item.address}
                                            </Typography>
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" minHeight={60}>
                                            {item.description}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        {user.isLoggedIn &&
                                            <Tooltip title="Ajouter à mes favoris" placement="top">
                                                <Button
                                                    id="addFavorite"
                                                    key={item.id}
                                                    value={item.id}
                                                    onClick={addFavoriteClick}
                                                    type="submit"
                                                    className={classes.likeButton}
                                                    variant="contained"
                                                    size="small"
                                                >
                                                    <FavoriteIcon className={classes.likeIcon} />
                                                </Button>
                                            </Tooltip>
                                        }

                                        <Button className={classes.seeMoreButton}>
                                            <Link className={classes.link} to={`/property/${item.id}`} style={{ textDecoration: 'none', textTransform: 'uppercase', textEmphasisColor: 'color' }} state={item.id}>voir plus</Link>
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))
                    }
                </Grid>
            </Grid>
        </Grid >
    );
};
export default HomePage;
