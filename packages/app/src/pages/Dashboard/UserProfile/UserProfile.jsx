import React, { useCallback, useState } from 'react';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import avatar_dummy from '../avatar_yello.png';
import { Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { updateUserProfile } from '../../../services/services';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../slices/userSlice';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const useStyles = makeStyles(() => ({
  textfields: {
    border: '#e2e2e1',
    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      borderColor: 'white',
    },
    '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      borderColor: 'white',
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: 'white',
    },
    '& .MuiOutlinedInput-input': {
      color: 'white',
    },
    '&:hover .MuiOutlinedInput-input': {
      color: 'white',
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input': {
      color: 'white',
    },
    '& .MuiInputLabel-outlined': {
      color: 'white',
    },
    '&:hover .MuiInputLabel-outlined': {
      color: 'white',
    },
    '& .MuiInputLabel-outlined.Mui-focused': {
      color: 'white',
    },
  },
}));

function UserProfile({ user }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [details, updateDetails] = useState(user);

  const notify = () => {
    toast.success('Profile Updated', {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const issueUpdate = async () => {
    const result = await updateUserProfile(details);
    dispatch(setUser({ user: result.data.user }));
    notify();
  };

  const handleUpdates = useCallback(
    (e) => {
      const { name, value } = e.target;
      updateDetails({ ...details, [name]: value });
    },
    [details, updateDetails],
  );

  return (
    <div className="page">
      <h1>User Profile</h1>
      <div className="tutorial__list">
        <div className="profile__item">
          <div className="desc__profile">
            <div className="info">
              <h2>@{user?.userName === '' ? 'a_student' : user?.userName}</h2>
              <Chip
                label={user?.role}
                size="small"
                style={{
                  color: 'rgb(0,150,255)',
                  borderColor: 'rgb(0,150,255)',
                }}
                variant="outlined"
              />
            </div>
            <div className="info">
              <h3>Name :</h3>
              <p>
                {user?.firstName === '' ? 'John Doe' : user?.firstName}{' '}
                {user?.lastName === '' ? 'John Doe' : user?.lastName}
              </p>
            </div>
            <div className="info">
              <h3>Email :</h3>
              <a
                href={`mailto:${user?.email}`}
                style={{
                  textDecoration: 'none',
                  color: 'rgb(0,150,255)',
                }}>
                <p>{user?.email === '' ? 'JohnDoe@gmail.com' : user?.email}</p>
              </a>
            </div>
            <div className="info">
              <h3>Student ID :</h3>
              <p>{user?.email.slice(0, 9)}</p>
            </div>
            <div className="bio">
              <h3>Bio</h3>
              <p>{user ? user.bio : 'I am a ICT with Minors in CS student'}</p>
            </div>
          </div>
          <div className="profile__right">
            <Avatar alt="K" src={avatar_dummy} style={{ height: 200, width: 200 }} />
          </div>
        </div>
      </div>
      <div className="tutorial__list">
        <div
          className="info"
          style={{
            alignItems: 'center',
            width: '100%',
            justifyContent: 'space-between',
          }}>
          <h1 style={{ marginBottom: 20 }}>Update Profile</h1>
          <Button style={{ background: 'white' }} onClick={issueUpdate}>
            Update Profile
          </Button>
        </div>
        <div className="profile__item">
          <div className="desc__profile" style={{ width: '100%' }}>
            <div className="info" style={{ justifyContent: 'space-between' }}>
              <div className="info">
                <h3>Student ID : </h3>
                <p>{user?.email.slice(0, 9)}</p>
              </div>
              <div className="info">
                <h3>Email ID : </h3>
                <p>{user?.email}</p>
              </div>
            </div>
            <div className="info">
              <div className="info" style={{ flex: 1 }}>
                <TextField
                  className={classes.textfields}
                  defaultValue={user?.firstName}
                  label="First Name"
                  name="firstName"
                  style={{ width: '100%' }}
                  variant="outlined"
                  onChange={handleUpdates}
                />
              </div>
              <div className="info" style={{ flex: 1 }}>
                <TextField
                  className={classes.textfields}
                  defaultValue={user?.lastName}
                  label="Last Name"
                  name="lastName"
                  style={{ width: '100%' }}
                  variant="outlined"
                  onChange={handleUpdates}
                />
              </div>
            </div>
            <h3>Bio</h3>
            <TextField
              multiline
              className={classes.textfields}
              defaultValue={user ? user.bio : 'I am a ICT with Minors in CS student'}
              label="Bio"
              name="bio"
              rows={5}
              variant="outlined"
              onChange={handleUpdates}
            />
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default React.memo(UserProfile);
