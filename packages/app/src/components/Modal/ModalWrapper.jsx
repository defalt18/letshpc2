import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    boxShadow: theme.shadows[5],
  },
}));

export default function ModalWrapper(props) {
  const classes = useStyles();
  const { openModal = true } = props;

  return (
    <Modal
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      className={classes.modal}
      open={openModal}>
      <Fade in={openModal} style={{ outline: 'none', borderRadius: 12 }}>
        {props?.children}
      </Fade>
    </Modal>
  );
}
