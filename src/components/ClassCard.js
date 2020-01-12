import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { CardActions, Button } from '@material-ui/core';

import { useButtonStyles } from '../theme';

const useStyles = makeStyles({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});

export default function SimpleCard({ heading, subHeading, onClick }) {
  const classes = useStyles();
  const button = useButtonStyles();
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {heading}
        </Typography>
        <Typography variant="body2" component="p">
          {subHeading}
        </Typography>
      </CardContent>
      <CardActions>
        <Button className={button.root} size="small" onClick={onClick}>
          Options
        </Button>
      </CardActions>
    </Card>
  );
}
