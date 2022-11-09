import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useParams, useLocation } from 'react-router-dom';
import { useEffect, useState, createContext } from 'react';
import { Property } from '../Interface/Property';
import { getSingleProperty, sendMail } from '../Api/Property';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Avatar from "@mui/material/Avatar";
import AddIcCallIcon from '@mui/icons-material/AddIcCall';
import Home from '@mui/icons-material/Home';
import HeatPump from '@mui/icons-material/HeatPump';

import Kitchen from '@mui/icons-material/Kitchen';

import CardMedia from '@mui/material/CardMedia';
import { Swiper, SwiperSlide } from 'swiper/react';
import Card from '@mui/material/Card';
import SwiperCore, {
    Navigation,
} from 'swiper/core';
import { makeStyles } from '@mui/styles';
import { CardContent } from '@mui/material';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Hidden from '@mui/material/Hidden';
import { useNavigate } from "react-router-dom";
import { login } from "../Api/Auth";
import SendMail from '../Interface/SendMail';
import { red, green } from "@mui/material/colors";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';





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
        color: 'black',

    },
    titleRed: {
        color: 'red',
    },
    cardinfo: {
        margin: '10px'
    },
    cardcontact: {
        textAlign: 'center',
        margin: '10px'
    },
    textarea: {
        resize: "both"

    }

})


const SingleProperty = () => {

    const { name } = useParams();
    const location = useLocation();
    const id = location.state

    const [dataProperty, setDataProperty] = useState<Property>()

    useEffect(() => {
        getSingleProperty(id as number)
            .then(response => {
                setDataProperty(response)
            })

    }, [])
    // gestion formulaire de contact

    const [inputError, setInputError] = useState<SendMail | null>(null);
    const [formError, setFormError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    const navigate = useNavigate();
    const colorError = red[500];
    const colorSuccess = green[500];

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const data = new FormData(e.currentTarget)
        if (data.get("mail") || data.get("message")) {
            sendMail(
                data.get("mail") as string,
                data.get("message") as string,
                data.get("id") as unknown as number,
                dataProperty?.name as string
            ).then((response) => {
                console.log(response)
                if (response.status == 201) {
                    setMessage('Le mail est envoyé avec succés');
                } else if (response.status == 422) {
                    const { mail, message }: SendMail =
                        response.data;
                    const sendMailInterface: SendMail = {
                        mail: mail,
                        message: message,
                    };
                    setInputError(sendMailInterface);
                    setFormError(null);
                }
            });
        } else {
            setFormError('L\'adresse email et le message sont obligatoires.');
        }
    };

    //fin
    const { media, swiperContainer, title, cardinfo, cardcontact, textarea, titleRed } = useStyles()

    return (
        <Grid>

            <Grid container spacing={3} sx={{ p: 10 }}>

                <Grid item xs={6}  >
                    <Card >

                        <Swiper
                            pagination={{ clickable: true }}
                            grabCursor
                            keyboard={{ enabled: true }}

                            navigation={Navigation}
                        >

                            {dataProperty && dataProperty.property_pictures?.length ? dataProperty.property_pictures.map((picture, index) => (
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


                    </Card >
                    <Card sx={{ my: 6 }}>
                        <CardContent >
                            <Typography gutterBottom variant="h6" component="div" className={title}>
                                L'essentiel
                            </Typography>
                            <Grid container spacing={3} >
                                <Grid item xs={4}  >
                                    <Stack direction="row" alignItems="center" gap={1}  >
                                        <Home style={{ color: 'red' }} />
                                        <Typography variant="body1">{dataProperty?.property_types.name}</Typography>
                                    </Stack>
                                </Grid>
                                <Grid item xs={4}  >
                                    <Stack direction="row" alignItems="center" gap={1}  >
                                        <Kitchen style={{ color: 'red' }} />
                                        <Typography variant="body1">{dataProperty?.kitchen.name}</Typography>
                                    </Stack>
                                </Grid>
                                <Grid item xs={4}  >
                                    <Stack direction="row" alignItems="center" gap={1}  >
                                        <HeatPump style={{ color: 'red' }} />
                                        <Typography variant="body1">{dataProperty?.heater.name}</Typography>
                                    </Stack>
                                </Grid>
                                {dataProperty && dataProperty.features_lists ? dataProperty.features_lists.map((feature, index) => (
                                    <Grid item xs={4}  >

                                        <Stack direction="row" alignItems="center" gap={1}  >

                                            <HeatPump style={{ color: 'red' }} />
                                            <Typography variant="body1">{feature.name}</Typography>

                                        </Stack>

                                    </Grid>
                                )) : <Typography></Typography>}


                            </Grid>
                        </CardContent>
                    </Card>

                </Grid>
                <Grid item xs={6} >


                    <Card className={cardinfo}>
                        <CardContent>


                            <Typography gutterBottom variant="h4" component="div" className={title}>
                                {dataProperty?.name}
                            </Typography>
                            <Typography gutterBottom component="div">
                                {dataProperty?.address + ' ' + dataProperty?.zipcode}
                            </Typography>

                            <Typography>{dataProperty?.description}</Typography>


                            <Typography gutterBottom variant="h6" component="div" className={titleRed}>
                                {dataProperty?.price + ' €'}
                            </Typography>
                        </CardContent>


                    </Card>

                    <Card className={cardcontact}>
                        <CardContent >
                            <Avatar sx={{ bgcolor: "#f13d3d" }}>
                                <AddIcCallIcon />
                            </Avatar>
                            <Typography component="h3" my={2} color={colorSuccess}>
                                {message}
                            </Typography>

                            <Typography component="h3" my={2} color={colorError}>
                                {formError}
                            </Typography>
                            <Box
                                component="form"
                                noValidate
                                onSubmit={handleSubmit}
                                sx={{ mt: 1 }}
                            >
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Adresse email"
                                    name="mail"
                                    autoComplete="email"
                                    autoFocus
                                    helperText={inputError?.mail}
                                    error={Boolean(inputError?.mail)}
                                />
                                <TextField
                                    fullWidth
                                    id="outlined-textarea"
                                    label="Message"
                                    placeholder="Message"
                                    name="message"
                                    multiline
                                    variant="outlined"
                                    inputProps={{ className: textarea }}
                                    helperText={inputError?.message}
                                    error={Boolean(inputError?.message)}
                                />
                                <input type="hidden" name="id" value={dataProperty?.id}
                                />

                                <Button
                                    type="submit"
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2, bgcolor: "#f13d3d" }}
                                >
                                    Envoyer
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>

                </Grid>



                <Grid item xs={6}>

                </Grid>
            </Grid>
        </Grid>
    );
}


export default SingleProperty;

