import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  card: {
    height: '100%',
    alignSelf: 'center',
  },
});

export default function SimpleCard({ heading, subHeading }) {
  const classes = useStyles();

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
    </Card>
  );
}
