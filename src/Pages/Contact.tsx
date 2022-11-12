import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import { getAgencies } from '../Api/Agencies';
import { useEffect, useState } from 'react';
import Agency from '../Interface/Agency';

const Contact = () => {

    const [agencyData, setAgencyData] = useState<Array<Agency> | null>(null)

    useEffect(() => {
        getAgencies()
            .then(response => {
                console.log(response)
                setAgencyData(response)
            })
    }, [])

    return (
        <div>
            <Grid container spacing={3} justifyContent="center">

                {
                    agencyData != null && agencyData.map(item => (
                        <Grid item>
                            <Card sx={{ maxWidth: 300, minHeight: 180, marginTop: 5 }}>
                                <CardMedia
                                // component="img"
                                // height="140"
                                // image="/static/images/cards/contemplative-reptile.jpg"
                                // alt="green iguana"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div" color="#f13d3d" fontFamily={"HomemadeApple"}>
                                        {item.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" minHeight={50}>
                                        {item.address} - {item.zipcode} - PARIS
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {item.phone}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {item.mail}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))
                }

            </Grid>
        </div>
    )

};

export default Contact;