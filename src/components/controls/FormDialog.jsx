import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function FormDialog(props) {
  const [comment, setComment] = React.useState("");
  const [allow, setAllow] = React.useState(true);

  const handleommentChange = (e) => {
    setComment(e.target.value);
    setAllow(e.target.value.length < 5);

    setComment(e.target.value);
  };
  const handleSave = () => {
    props.onCommentSave(comment, !props.logout);
    setAllow(true);
  };
  const handleKeyDown = (event) => {
    if (event.target.value.length > 5 && event.key === "Enter") {
      handleSave();
    }
  };
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={handleSave}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">{props.header}</DialogTitle>
        <DialogContent>
          <DialogContentText>{props.text}</DialogContentText>
          {!props.alert && (
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label={props.placeholer}
              type="text"
              fullWidth
              onChange={handleommentChange}
              onKeyDown={handleKeyDown}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleSave}
            color="primary"
            disabled={props.alert ? false : allow}
          >
            {props.alert ? "Ok" : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
