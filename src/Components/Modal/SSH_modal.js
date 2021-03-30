import React from 'react'
import { Link } from "react-router-dom"
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        outline: 'none'
    },
}));

export default function SSH_modal({ textcolor, background , OS}) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const [username, setUsername] = React.useState("");
    // const [IP, setIP] = React.useState("");

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div style={{ outline: "none" }}>
            <Button onClick={handleOpen} style={{ textTransform: 'capitalize', backgroundColor: `${background}`, color: `${textcolor}`, fontWeight: 'bold', padding: '7px', borderRadius: '7px' }}>Open SSH</Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className="form_details">
                        <h3>Enter Your Username</h3>
                        <TextField value={username} onChange={(e) => { setUsername(e.target.value) }} id="outlined-search" label="Username" variant="outlined" />
                        {/* <h3>Enter Local IP Address</h3> */}
                        {/* <TextField value={IP} onChange={(e) => { setIP(e.target.value) }} id="outlined-search" label="Local IP Address" variant="outlined" /> */}
                        <Link to={{pathname: `/ssh/${OS}/${username}`}} style={{textDecoration:'none'}}>
                            <Button variant="contained" color="primary">
                                Jump to SSH
                            </Button>
                        </Link>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}

