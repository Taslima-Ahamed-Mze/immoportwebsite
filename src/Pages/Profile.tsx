import { useEffect, useState, createContext } from 'react';
import { getProfile } from '../Api/Client';
import { updateProfile } from '../Api/Client';
import Client from '../Interface/Client';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

const Profile = () => {

    const [token, setToken] = useState<string | null>(null)
    const [dataProfile, setDataProfile] = useState<Client>()
    const [newData, setNewData] = useState<Client>()

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
                    setDataProfile(response)
                })
        } else {
            setToken(localStorage.getItem('access_token'))
        }
    }, [token])

    // updateForm submit
        const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault()

            const data = new FormData(e.currentTarget)
            if (token != null) {
                if (data.get('lastname') && data.get('firstname') && data.get('mail') && data.get('phone') && data.get('password')) {

                    updateProfile(token as string, data.get('lastname') as string, data.get('firstname') as string, data.get('mail') as string, data.get('phone') as string, data.get('password') as string)
                        .then(response => {
                            console.log(response)
                            if (response.status == 200) {
                                setDataProfile(response.data)
                                alert(response.data.message)
                            } else {
                                console.log('error')
                            }
                        })
                }
            } else {
                setToken(localStorage.getItem('access_token'))
            }
        }

    return (
        <div className="profileWrapper">

            <Paper
                sx={{
                    p: 5,
                    margin: 'auto',
                    maxWidth: 500,
                    flexGrow: 1,
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                }}
            >
                <Grid container spacing={5}>

                    <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={3}>
                            <Grid item xs>

                                {dataProfile &&
                                    <Typography gutterBottom variant="subtitle1" component="div">
                                        {dataProfile.lastname}, {dataProfile.firstname}
                                    </Typography>}

                                {dataProfile &&
                                    <Typography variant="body2" gutterBottom>
                                        {dataProfile.mail}
                                    </Typography>}

                                {dataProfile &&
                                    <Typography variant="body2" color="text.secondary">
                                        {dataProfile.phone}
                                    </Typography>}

                            </Grid>
                            <Grid item>
                                <Button size="small" onClick={handleOpen}>Modifier mon profil</Button>
                            </Grid>

                        </Grid>
                    </Grid>

                </Grid>
            </Paper>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} textAlign="center">
                    <Typography id="modal-modal-title" variant="h6" component="h2" >
                        Modifier mon profil
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <Box
                            component="form"
                            sx={{
                                '& .MuiTextField-root': { m: 1, width: '45ch' },
                            }}
                            noValidate
                            autoComplete="off"
                            onSubmit={handleSubmit}
                        >
                            {dataProfile && <TextField
                                id="outlined-helperText"
                                label="Nom"
                                name="lastname"
                                defaultValue={dataProfile.lastname}
                            />}
                            {dataProfile &&
                                <TextField
                                    id="outlined-helperText"
                                    label="Prénom"
                                    name="firstname"
                                    defaultValue={dataProfile.firstname}
                                />}
                            {dataProfile &&
                                <TextField
                                    id="outlined-helperText"
                                    label="Mail"
                                    name="mail"
                                    defaultValue={dataProfile.mail}
                                />}
                            {dataProfile &&
                                <TextField
                                    id="outlined-number"
                                    label="Téléphone"
                                    type="number"
                                    name="phone"
                                    defaultValue={dataProfile.phone}
                                    InputProps={{ inputProps: { min: 0, max: 9 } }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />}
                            <TextField
                                id="outlined-password-text"
                                label="Password"
                                type="password"
                                name="password"
                            />

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Enregistrer
                            </Button>
                        </Box>
                    </Typography>
                </Box>
            </Modal>
        </div >
    )
}

export default Profile;