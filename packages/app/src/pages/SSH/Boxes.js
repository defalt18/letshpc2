import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '100%',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function RecipeReviewCard({ OS }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(true);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        action={
          <IconButton
            aria-expanded={expanded}
            aria-label="show more"
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}>
            <ExpandMoreIcon />
          </IconButton>
        }
        subheader={
          OS === 'windows'
            ? 'On Windows (One Time Setup)'
            : OS === 'mac'
            ? 'On a Mac (One Time Setup)'
            : 'On Linux (One Time Setup)'
        }
        title={
          OS === 'windows'
            ? 'Activation of OpenMP'
            : OS === 'mac'
            ? 'Installation of Brew and OpenMP'
            : 'Installation of OpenMP'
        }
      />
      <Collapse unmountOnExit in={expanded} timeout="auto">
        <CardContent>
          {OS === 'windows' ? (
            <>
              <p style={{ margin: '10px 0' }}>
                <b>Prerequisite</b> : MinGW Installer(If it's not installed then first install it
                and don't forget to add its path globally in System Environment variables)
              </p>
              <p style={{ margin: '10px 0' }}>Activate Open MP Library by typing</p>
              <div className="code">
                {/* <FileCopyIcon fontSize="small" style={{position:"absolute",top:"10px",left:"96%"}}/> */}
                mingw-get upgrade --recursive "gcc{'<'}4.7.*" "gcc-g++{'<'}
                4.7.*"
              </div>
            </>
          ) : OS === 'mac' ? (
            <>
              <p style={{ margin: '10px 0' }}>
                Install brew on your system by typing the following command on ssh* (Ignore if
                already installed)
              </p>
              <div className="code">
                {/* <FileCopyIcon fontSize="small" style={{ position: "absolute", top: "10px", left: "96%" }} /> */}
                $ /bin/bash -c "$(curl -fsSL
                https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
              </div>
              <p style={{ margin: '10px 0' }}>
                Install Open MP Library by typing* (Ignore if already installed)
              </p>
              <div className="code">
                {/* <FileCopyIcon fontSize="small" style={{ position: "absolute", top: "10px", left: "96%" }} /> */}
                $ brew install libomp
              </div>
            </>
          ) : (
            <>
              <p style={{ margin: '10px 0' }}>
                Install Open MP Library by typing (Ignore if already installed)
              </p>
              <div className="code">
                {/* <FileCopyIcon fontSize="small" style={{position:"absolute",top:"10px",left:"96%"}}/> */}
                $ sudo apt-get install libomp-dev
              </div>
            </>
          )}
        </CardContent>
      </Collapse>
    </Card>
  );
}
