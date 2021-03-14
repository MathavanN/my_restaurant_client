import { Typography, makeStyles } from "@material-ui/core";
import { FC } from "react";

const useStyles = makeStyles({
  title: {
    textTransform: "uppercase",
  },
});

const PageTitle: FC<{ title: string }> = ({ title }) => {
  const classes = useStyles();
  return (
    <Typography variant="h4" className={classes.title} color="textSecondary">
      {title}
    </Typography>
  );
};

export default PageTitle;
