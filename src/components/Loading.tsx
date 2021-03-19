import React, { FC, useEffect } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Backdrop } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
  })
);

const Loading: FC<{ show: boolean; content?: string }> = ({
  show,
  content,
}) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setOpen(show);
  }, [setOpen, show]);

  return (
    <>
      <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
        <span>{content}</span>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default Loading;
