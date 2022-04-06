import { useEffect, useState } from 'react';
import { getProfile } from '../Api/Auth';
import Client from '../Interface/Client';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';


const Profile = () => {
    const [token, setToken] = useState<string | null>(null)
    const [dataProfile, getDataProfile] = useState<Client>()

    useEffect(() => {

        if (token != null) {
            getProfile(token)
                .then(response => {
                    getDataProfile(response)
                })
        } else {
            setToken(localStorage.getItem('access_token'))
        }
    }, [token])

    return (
        <div className="profileWrapper">
            <Card sx={{ maxWidth: 275 }}>
                <CardContent>

                    {dataProfile &&
                        <Typography sx={{ fontSize: 25 }} color="text.secondary" gutterBottom>
                            {dataProfile.lastname}, {dataProfile.firstname}</Typography>}

                    {dataProfile &&
                        <Typography color="text.secondary">
                            {dataProfile.mail}
                        </Typography>}

                    {dataProfile &&
                        <Typography>
                            {dataProfile.phone}
                        </Typography>}

                </CardContent>
                <CardActions>
                    <Button size="small"  onClick={handleOpen}>Modifier mon profil</Button>
                </CardActions>
            </Card>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Text in a modal
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                    </Typography>
                </Box>
            </Modal>
        </div>
    )
}

export default Profile;