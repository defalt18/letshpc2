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
import FileCopyIcon from '@material-ui/icons/FileCopy';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
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
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        }
        title={OS==="mac"?"Installation of Brew and OpenMP":"Installation of OpenMP"}
        subheader={OS === "mac" ? "On a Mac (One Time Setup)" : "On Linux (One Time Setup)"}
      />
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {
            OS === "mac" ? (<>
              <p style={{ margin: '10px 0' }}>Install brew on your system by typing the following command on ssh* (Ignore if already installed)</p>
              <div className="code">
                {/* <FileCopyIcon fontSize="small" style={{ position: "absolute", top: "10px", left: "96%" }} /> */}
            $ /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
            </div>
              <p style={{ margin: '10px 0' }}>Install Open MP Library by typing* (Ignore if already installed)</p>
              <div className="code">
                {/* <FileCopyIcon fontSize="small" style={{ position: "absolute", top: "10px", left: "96%" }} /> */}
            $ brew install libomp
            </div>
            </>) : (<>
            <p style={{margin:'10px 0'}}>Install Open MP Library by typing (Ignore if already installed)</p>
            <div className="code">
            {/* <FileCopyIcon fontSize="small" style={{position:"absolute",top:"10px",left:"96%"}}/> */}
            $ sudo apt-get install libomp-dev
            </div>
            </>)
          }
        </CardContent>
      </Collapse>
    </Card>
  );
}
