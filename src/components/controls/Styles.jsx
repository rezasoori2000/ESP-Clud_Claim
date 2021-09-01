import { fade, makeStyles } from "@material-ui/core/styles";

const gridSearchStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },

  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.black, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon

    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },

  bolding: {
    fontSize: "0.9rem",
    "&:hover": {
      //textShadow: '3px 3px 0px #ffd324',
      cursor: "pointer",

      //    transformOrigin: "-100px -100px",
      //   transform: "scale(1.05) translate(-17px, -10px)",
      zIndex: "1000",
      // backgroundColor: "#ddd",
      // backgroundImage: 'url("/work1.png")',
      //  backgroundRepeat: "no-repeat",
      //  backgroundSize: "90%",

      //    backgroundPosition: "top",
    },
  },
  boxBolding: {
    "&:hover": {
      boxSizing: "border-box",
      boxShadow: "3px 3px #eee",
      borderBottom: "2px  solid #5584c0",
      borderRight: "2px  solid #5584c0",
      marginLeft: "-2px",
      marginTop: "-2px",
    },
  },
}));
export default gridSearchStyles;
