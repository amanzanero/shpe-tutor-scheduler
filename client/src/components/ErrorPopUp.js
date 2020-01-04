import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function ErrorDialogue(props) {
  const { errMessage, hasError, onErrResolve } = props;
  return (
    <div>
      <Dialog
        open={hasError}
        onClose={onErrResolve}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Error</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {`Server message: ${errMessage}`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onErrResolve} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

ErrorDialogue.propTypes = {
  errMessage: PropTypes.string.isRequired,
  hasError: PropTypes.bool.isRequired,
  onErrResolve: PropTypes.func.isRequired,
};
