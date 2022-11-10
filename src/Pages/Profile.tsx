import { useEffect, useState, useContext } from 'react';
import { getProfile } from '../Api/Client';
import { updateProfile } from '../Api/Client';
import { updatePassword } from '../Api/Client';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Password from '../Interface/Password';
import Client from '../Interface/Client';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ClientContext from '../Contexts/ClientContext';
import { Card, CardContent, CardActions, ListItem, ListItemButton, ListItemText, styled, Link, ButtonBase } from '@mui/material';
import { getFavoriteList } from '../Api/Favorites';
import Favorite from '../Interface/Favorite';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';

const Profile = () => {

    const [token, setToken] = useState<string | null>(null)
    const [dataProfile, setDataProfile] = useState<Client>()
    console.log(dataProfile) // old et new datas
    const [inputError, setInputError] = useState<Password | null>(null); // error update password
    const [inputClientError, setinputClientError] = useState<Client>() // error update client's data

    const [favoriteData, setFavoriteData] = useState<Array<Favorite> | null>(null)
    const user = useContext(ClientContext)

    // modal update client's data
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // modal update password
    const [openDialog, setOpenDialog] = useState(false);
    const handleClickOpen = () => setOpenDialog(true);
    const handleClickClose = () => setOpenDialog(false);

    // sucess alert
    const [openAlert, setAlert] = useState(false);
    const [alertContent, setAlertContent] = useState('');

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    useEffect(() => {

        if (token != null) {
            getProfile(token)
                .then(response => {
                    user.lastname = response.lastname
                    user.firstname = response.firstname
                    user.mail = response.mail
                    user.phone = response.phone
                    const lastname = user.lastname
                    const firstname = user.firstname
                    const mail = user.mail
                    const phone = user.phone
                    setDataProfile({ lastname, firstname, mail, phone })
                    user.login()
                })

            getFavoriteList(token)
                .then(response => {
                    setFavoriteData(response)
                })

        } else {
            setToken(localStorage.getItem('access_token'))
        }

    }, [token])

    // updateForm submit (data)
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const data = new FormData(e.currentTarget)

        if (data.get('lastname') && data.get('firstname') && data.get('mail') && data.get('phone')) {

            updateProfile(token as string, data.get('lastname') as string, data.get('firstname') as string, data.get('mail') as string, data.get('phone') as string)
                .then(response => {
                    if (response.status == 200) {
                        setDataProfile(response.data)
                        setAlertContent(response.data.message);
                        setAlert(true)
                        setOpen(false)
                    } else if (response.status == 422) {
                        const { lastname, firstname, mail, phone }: Client = response.data;
                        const updateInterface: Client = {
                            lastname: lastname,
                            firstname: firstname,
                            mail: mail,
                            phone: phone,
                        }
                        setOpen(true);
                        setinputClientError(updateInterface)
                    }
                })
        }
    }

    //updateForm submit (password)
    const handleSubmitPassword = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const data = new FormData(e.currentTarget)

        if (data.get('password')) {
            updatePassword(token as string, data.get('password') as string)
                .then(response => {
                    if (response.status == 200) {
                        setAlertContent(response.data.message);
                        setAlert(true)
                        window.location.reload()
                    } else if (response.status == 422) {

                        const { password }: Password = response.data
                        const updatePasswordInterface: Password = {
                            password: password
                        }
                        if (updatePasswordInterface) {
                            setOpenDialog(true);
                        } else {
                            setOpenDialog(false)
                        }
                        setInputError(updatePasswordInterface)
                    }
                })
                .catch(error => alert(error))
        }
    }

    const Img = styled('img')({
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    });

    return (
        <div className="profileWrapper">

            <Grid container columns={{ xs: 4, sm: 8, md: 12 }} sx={{ marginY: 5, alignItems: 'center' }}>

                <Grid item xs={4}>
                    <Card sx={{ minWidth: 275, maxWidth: 450, marginX: 5, padding: 3 }}>
                        <CardContent>
                            {dataProfile &&
                                <Typography gutterBottom variant="h5" component="div">
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
                        </CardContent>
                        <CardActions>
                            <Button size="small" onClick={handleOpen}>Modifier mon profil</Button>
                            <Button size="small" onClick={handleClickOpen}>
                                Modifier mon mot de passe
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>

                {/* Favorites */}
                {
                    favoriteData != null && favoriteData.map(item => (
                        <Paper
                            key={item.id}
                            sx={{
                                p: 2,
                                marginX: 2,
                                maxWidth: 500,
                                flexGrow: 1,
                            }}
                        >
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm container>
                                    <Grid item xs container direction="column" spacing={2}>
                                        <Grid item xs>
                                            <Typography gutterBottom variant="subtitle1" component="div">
                                                {item.favorite_list.name}
                                            </Typography>
                                            <Typography variant="body2" gutterBottom>
                                                {item.favorite_list.address}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {item.favorite_list.zipcode} - {item.favorite_list.city}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs container direction={'row'}>
                                            <Grid item>
                                                <Button href={`/property/${item.favorite_list.name}`}><VisibilityIcon /></Button>
                                            </Grid>
                                            <Grid item>
                                                <Button href={`/property/${item.favorite_list.name}`}><DeleteIcon color='error' /></Button>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="subtitle1" component="div">
                                            {item.favorite_list.price} €
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Paper>

                    ))
                }
            </Grid>

            {/* Success alert */}
            {openAlert &&
                <Alert
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setAlert(false);
                            }}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                    sx={{ mb: 2 }}
                    severity="info">
                    {alertContent}
                </Alert>
            }

            {/* begin modal update data */}
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
                            {dataProfile &&
                                <TextField
                                    id="outlined-helperText"
                                    label="Nom"
                                    name="lastname"
                                    defaultValue={dataProfile.lastname}
                                    helperText={inputClientError?.lastname}
                                    error={Boolean(inputClientError?.lastname)}
                                />}
                            {dataProfile &&
                                <TextField
                                    id="outlined-helperText"
                                    label="Prénom"
                                    name="firstname"
                                    defaultValue={dataProfile.firstname}
                                    helperText={inputClientError?.firstname}
                                    error={Boolean(inputClientError?.firstname)}
                                />}
                            {dataProfile &&
                                <TextField
                                    id="outlined-helperText"
                                    label="Mail"
                                    name="mail"
                                    defaultValue={dataProfile.mail}
                                    helperText={inputClientError?.mail}
                                    error={Boolean(inputClientError?.mail)}
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
                                    helperText={inputClientError?.phone}
                                    error={Boolean(inputClientError?.phone)}
                                />}

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Enregistrer
                            </Button>
                            <Button onClick={handleClose}
                            >Annuler</Button>
                        </Box>
                    </Typography>
                </Box>
            </Modal>
            {/* end modal update data */}

            {/* begin modal update password */}
            <Dialog
                open={openDialog}
                onClose={handleClickClose}
            >
                <DialogTitle>Modification du mot de passe</DialogTitle>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '45ch' },
                    }}
                    noValidate
                    onSubmit={handleSubmitPassword}
                >
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="password"
                            label="Mot de passe"
                            name="password"
                            type="password"
                            fullWidth
                            variant="standard"
                            autoComplete="current-password"
                            helperText={inputError?.password}
                            error={Boolean(inputError?.password)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button
                            size="small"
                            type="submit"
                            fullWidth
                            variant="contained"
                        >
                            Enregistrer
                        </Button>
                        <Button onClick={handleClickClose}>Annuler</Button>
                    </DialogActions>
                </Box>
            </Dialog>
            {/* end modal update password */}
        </div >
    )
}

export default Profile;