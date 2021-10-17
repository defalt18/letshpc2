import React from 'react';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles(() => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    outline: 'none',
  },
}));

export default function SshModal({ textcolor, background, OS }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const [username, setUsername] = React.useState('');
  const [IP, setIP] = React.useState('127.0.0.1');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{ outline: 'none' }}>
      <Button
        style={{
          textTransform: 'capitalize',
          backgroundColor: `${background}`,
          color: `${textcolor}`,
          fontWeight: 'bold',
          padding: '7px',
          borderRadius: '7px',
        }}
        onClick={handleOpen}>
        Open SSH
      </Button>
      <Modal
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        aria-describedby="transition-modal-description"
        aria-labelledby="transition-modal-title"
        className={classes.modal}
        open={open}
        onClose={handleClose}>
        <Fade in={open}>
          <div className="form_details">
            <h3>Enter Your Username</h3>
            <TextField
              id="outlined-search"
              label="Username"
              value={username}
              variant="outlined"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <h3>Enter Local IP Address</h3>
            <TextField
              id="outlined-search"
              label="Local IP Address"
              value={IP}
              variant="outlined"
              onChange={(e) => {
                setIP(e.target.value);
              }}
            />
            <Link
              style={{ textDecoration: 'none' }}
              to={{ pathname: `/ssh/${OS}/${username}/${IP}` }}>
              <Button color="primary" variant="contained">
                Jump to SSH
              </Button>
            </Link>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
