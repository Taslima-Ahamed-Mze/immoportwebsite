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
import TextField from '@mui/material/TextField';

const Profile = () => {
    const [token, setToken] = useState<string | null>(null)
    const [dataProfile, getDataProfile] = useState<Client>()
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    };

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
                    <Button size="small" onClick={handleOpen}>Modifier mon profil</Button>
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
                        Modifier mon profil
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <Box
                            component="form"
                            sx={{
                                '& .MuiTextField-root': { m: 1, width: '55ch' },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            {dataProfile && <TextField
                                id="outlined-helperText"
                                label="Helper text"
                                defaultValue={dataProfile.lastname}
                            />}
                            <TextField
                                id="outlined-helperText"
                                label="Helper text"
                                defaultValue="Default Value"
                            />
                            <TextField
                                id="outlined-helperText"
                                label="Helper text"
                                defaultValue="Default Value"
                            />
                            <TextField
                                id="outlined-number"
                                label="Number"
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <TextField
                                id="outlined-password-input"
                                label="Password"
                                type="password"
                                autoComplete="current-password"
                            />
                        </Box>
                    </Typography>
                </Box>
            </Modal>
        </div>
    )
}

export default Profile;