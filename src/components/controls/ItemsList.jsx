import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { Fragment } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "90%",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
}));

export default function ItemsList(props) {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      {props.items &&
        props.items
          .filter((x) => x !== "Claim from ESP-Claim")
          .map((i) => (
            <Fragment>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar
                    aria-label="recipe"
                    style={{ backgroundColor: "blue" }}
                  >
                    {" "}
                    C{" "}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={`Author:${i.Author} ${
                    i.Resource != null && i.Resource.length > 0
                      ? `Resource:${i.Resource}`
                      : ``
                  } `}
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                      >
                        {i.Date}
                      </Typography>
                      <br />
                      {i.IsBold ? (
                        <b>
                          <span style={{ fontSize: "15px" }}>{i.Comment}</span>
                        </b>
                      ) : (
                        <span style={{ fontSize: "15px" }}>{i.Comment}</span>
                      )}
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </Fragment>
          ))}
    </List>
  );
}
