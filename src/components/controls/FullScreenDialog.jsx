import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import ItemsList from "./../../components/controls/ItemsList";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog(props) {
  const classes = useStyles();
  // const [open, setOpen] = React.useState(false);

  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  const StyledTableRow = withStyles((theme) => ({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);
  const handleClose = () => {
    props.handleClose(false);
    //setOpen(false);
  };

  return (
    <div>
      <Dialog
        fullScreen
        open={props.open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {props.header}
            </Typography>
          </Toolbar>
        </AppBar>
        <p>{props.text}</p>
        {props.uls && <ItemsList items={props.uls} />}
        {props.textList && props.textList.length > 0 && (
          <TableContainer component={Paper} lg={6} sm={12} xs={12}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow></TableRow>
              </TableHead>
              <TableBody>
                {props.textList.map((row) => (
                  <StyledTableRow hover key={row.Date}>
                    <StyledTableCell component="th" scope="row">
                      {row.Date}
                    </StyledTableCell>
                    <StyledTableCell align="left">{row.Name}</StyledTableCell>
                    <StyledTableCell align="left">{row.Std}</StyledTableCell>
                    <StyledTableCell align="left">{row.Phy}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Dialog>
    </div>
  );
}
