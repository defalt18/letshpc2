import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
// import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
// import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
// import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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

export default function RecipeReviewCard() {
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
        title="Running instructions"
        subheader="On a Mac"
      />
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
            <p style={{margin:'10px 0'}}>Make a directory</p>
            <div className="code">
            $ mkdir parallel_programs<br></br>
            $ cd parallel_programs
            </div>
            <p style={{margin:'10px 0'}}>Copy the above code and write it in vi editor</p>
            <div className="code">
            $ vi topic1.c
            </div>
            <p style={{margin:'10px 0'}}>Save the program inside vi editor</p>
            <div className="code">
            $ :wq
            </div>
            <p style={{margin:'10px 0'}}>Run the program</p>
            <div className="code">
            $ clang -Xpreprocessor -fopenmp -lomp topic1.c<br></br>
            $ ./a.out
            </div>
        </CardContent>
      </Collapse>
    </Card>
  );
}
