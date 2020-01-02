import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

export default function NestedList({ name, onClick, open }) {
  return (
    <ListItem button onClick={onClick} name={name}>
      <ListItemText primary={name} name={name} />
      {open ? <ExpandLess name={name} /> : <ExpandMore name={name} />}
    </ListItem>
  );
}
