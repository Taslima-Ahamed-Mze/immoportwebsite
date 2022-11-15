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
import ClientContext from '../Contexts/ClientContext';
import { makeStyles } from '@mui/styles';
import { Card, CardContent, CardActions, Tooltip } from '@mui/material';
import { deleteFavorite, getFavoriteList } from '../Api/Favorites';
import Favorite from '../Interface/Favorite';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link } from 'react-router-dom';
// @ts-ignore
import { NotificationManager } from 'react-notifications';

const useStyles = makeStyles({
    submitUpdateButton: {
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

    box: {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        backgroundColor: 'white',
        border: '2px solid #000',
        padding: 40,
    }
});

const Profile = () => {

    const classes = useStyles()
    const [token, setToken] = useState<string | null>(null)
    const [dataProfile, setDataProfile] = useState<Client>()
    const [inputError, setInputError] = useState<Password | null>(null) // error update password
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

    // modal confirmation delete favorite
    const [openDialogDeleteFavorite, setOpenDialogDeleteFavorite] = useState(false);
    const handleClickOpenDeleteFavorite = () => setOpenDialogDeleteFavorite(true);
    const handleClickCloseDeleteFavorite = () => setOpenDialogDeleteFavorite(false);

    const WAIT_TIME = 1000;

    useEffect(() => {
        // const id = setInterval(() => {
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
        // }, WAIT_TIME)

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
                        setOpen(false)
                        NotificationManager.success("Votre profil a bien été modifié !", ':)', 2000);
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
                        setOpenDialog(false)
                        NotificationManager.success("Votre mot de passe a bien été modifié !", ':)', 2000);
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

    const deleteFavoriteClick = async (event: any) => {
        const favoriteId = event.currentTarget.value
        console.log(favoriteId)
        deleteFavorite(
            token as string,
            favoriteId as number,
        ).then((response) => {
            console.log(response.data)
            setOpenDialogDeleteFavorite(false)
            if (response.status == 200) {
                NotificationManager.success(response.data)
            } else {
                NotificationManager.error(response.data.message)
            }
        })
    }

    return (
        <div className="profileWrapper">

            <Grid container sx={{ marginY: 5 }} display="grid">

                <Grid item xs={12} margin="auto">
                    <Card sx={{ minWidth: 275, maxWidth: 450, padding: 3, marginBottom: 5 }}>
                        <CardContent>
                            {dataProfile &&
                                <Typography gutterBottom variant="h5" component="div" fontFamily={"HomemadeApple"}>
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
                            <Button className={classes.submitUpdateButton} sx={{ padding: 0 }} size="small" onClick={handleOpen}>Modifier mon profil</Button>
                            <Button className={classes.submitUpdateButton} sx={{ padding: 0 }} size="small" onClick={handleClickOpen}>
                                Modifier mon mot de passe
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>

                {/* Favorites */}
                <Grid item xs={12}>
                    <Typography textAlign={'center'} variant="h5" fontFamily={"HomemadeApple"}>                     <FavoriteIcon sx={{ marginRight: 2, color: '#f13d3d' }} />
                        Mes Favoris
                    </Typography>
                    <Grid container direction="row">
                        {
                            favoriteData != null && favoriteData.map(item => (
                                <><Paper
                                    key={item.id}
                                    sx={{
                                        p: 2,
                                        marginX: 2,
                                        marginY: 2,
                                        maxWidth: 400,
                                        flexGrow: 1,
                                        marginBottom: 3,
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
                                                        <Tooltip title="Voir" placement="top">
                                                            <Button>
                                                                <Link to={`/property/${item.favorite_list.id}`}
                                                                    style={{ textDecoration: 'none', textTransform: 'uppercase', textEmphasisColor: 'color' }}
                                                                    state={item.favorite_list.id}>
                                                                    <VisibilityIcon color='info'/>
                                                                </Link>
                                                            </Button>
                                                        </Tooltip>
                                                    </Grid>
                                                    <Grid item>
                                                        <Tooltip title="Supprimer" placement="top">
                                                            <Button
                                                                key={item.favorite_list.id}
                                                                value={item.favorite_list.id}
                                                                onClick={deleteFavoriteClick}
                                                                type='submit'>
                                                                <DeleteIcon color='error' />
                                                            </Button>
                                                        </Tooltip>
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
                                    <Dialog
                                        open={openDialogDeleteFavorite}
                                        onClose={handleClickCloseDeleteFavorite}
                                    >
                                        <DialogTitle>Confirmation suppression</DialogTitle>
                                        <DialogContent>
                                            <Typography>Voulez-vous vraiment supprimer ce bien immobilier de votre liste de favoris? </Typography>
                                        </DialogContent>
                                        <DialogActions>
                                            <Typography>{item.favorite_list.id}</Typography>
                                            <Button
                                                id="deleteFavorite"
                                                onClick={deleteFavoriteClick}
                                                type='submit'
                                            >
                                                Supprimer
                                            </Button>
                                            <Button onClick={handleClickCloseDeleteFavorite}>Annuler</Button>
                                        </DialogActions>
                                    </Dialog></>
                            ))
                        }
                    </Grid>
                </Grid>
            </Grid>

            {/* begin modal update data */}
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box textAlign="center">
                    <DialogTitle id="modal-modal-title">
                        Modifier mon profil
                    </DialogTitle>
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
                            <DialogContent>
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
                            </DialogContent>
                            <DialogActions sx={{ justifyContent: 'center' }}>
                                <Button
                                    className={classes.submitUpdateButton}
                                    type="submit"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Enregistrer
                                </Button>
                                <Button onClick={handleClose} color='error'
                                >Annuler</Button>
                            </DialogActions>
                        </Box>
                    </Typography>
                </Box>
            </Dialog>
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
                    <DialogActions sx={{ justifyContent: 'center' }}>
                        <Button
                            className={classes.submitUpdateButton}
                            type="submit"
                        >
                            Enregistrer
                        </Button>
                        <Button onClick={handleClickClose} color='error'>Annuler</Button>
                    </DialogActions>
                </Box>
            </Dialog>


            {/* end modal update password */}
        </div >
    )
}

export default Profile;