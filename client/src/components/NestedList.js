import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

export default function NestedList({ name, onClick, open }) {
  return (
    <ListItem button onClick={() => onClick(name)} name={name}>
      <ListItemText name={name}>
        <Typography variant={'h6'}>{name}</Typography>
      </ListItemText>
      {open ? <ExpandLess name={name} /> : <ExpandMore name={name} />}
    </ListItem>
  );
}
