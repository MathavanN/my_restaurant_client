import React, { FC } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      "& > * + *": {
        marginLeft: theme.spacing(2),
      },
    },
  })
);

const Loading: FC<{ content?: string }> = ({ content }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <span>{content}</span>
      <CircularProgress />
    </div>
  );
};

export default Loading;
