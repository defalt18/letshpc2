import React, { useCallback, useState } from 'react';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import Chip from '@material-ui/core/Chip';
import BookmarkBorderRoundedIcon from '@material-ui/icons/BookmarkBorderRounded';
import BookmarkRoundedIcon from '@material-ui/icons/BookmarkRounded';
import { CircularProgress } from '@material-ui/core';
import { updateUserProfile, useUser } from '../../../services/services';
import _find from 'lodash/find';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../slices/userSlice';

function Concept(props) {
  const user = useUser();
  const history = useHistory();
  const { title, theory, level } = props.tutorial;
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [clicked, setClicked] = useState(() =>
    _find(user?.savedTutorials, { tutorial: props.tutorial }),
  );

  const chipColor = {
    beginner: 'green',
    medium: 'yellow',
    advance: '#eb4034',
  };

  const navigateToTutorial = useCallback(
    () => history.push('/tutorials', { details: JSON.stringify(props.tutorial) }),
    [history, props.tutorial],
  );

  const saveTutorial = useCallback(async () => {
    setClicked(true);
    setLoading(true);
    const updateUser = {
      ...user,
      savedTutorials: [...user.savedTutorials, { tutorial: props.tutorial }],
    };
    await updateUserProfile(updateUser);
    dispatch(setUser({ user: updateUser }));
    setLoading(false);
  }, [setLoading, dispatch, props.tutorial, user]);

  return (
    <div className="concept__box">
      <h2 style={{ color: 'rgba(0,150,255)', marginBottom: 10 }}>
        {title.slice(0, 30)} {title.length > 30 ? '...' : null}
      </h2>
      <Chip
        label={level[0].toUpperCase() + level.slice(1)}
        size="small"
        style={{
          color: chipColor[level],
          borderColor: chipColor[level],
          maxWidth: '90px',
          marginBottom: 5,
        }}
        variant="outlined"
      />
      <p dangerouslySetInnerHTML={{ __html: `${theory.slice(0, 100)}...` }} />
      <div className="info">
        {user &&
          user.role === 'Student' &&
          (loading ? (
            <CircularProgress size={30} />
          ) : clicked ? (
            <BookmarkRoundedIcon
              style={{
                cursor: 'pointer',
                color: 'rgba(255,255,255,0.3)',
              }}
            />
          ) : (
            <BookmarkBorderRoundedIcon
              style={{
                cursor: 'pointer',
                color: 'rgba(255,255,255,0.3)',
              }}
              onClick={saveTutorial}
            />
          ))}
        <Button
          style={{
            textTransform: 'capitalize',
            color: 'white',
            background: 'green',
            width: '100%',
          }}
          onClick={navigateToTutorial}>
          Go to tutorial
        </Button>
      </div>
    </div>
  );
}

export default React.memo(Concept);
