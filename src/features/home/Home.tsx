import {
  Card,
  CardActionArea,
  makeStyles,
  CardContent,
  Typography,
  Container,
  Button,
} from "@material-ui/core";
import { getUser, getToken, isLoggedIn } from "features/user/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { PAGE_COUNTER } from "utils/constants";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  media: {
    width: "100%",
    height: "auto",
  },
}));
const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const token = useSelector(getToken);
  const classes = useStyles();
  console.log(user);
  return (
    <>
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Card>
            <CardActionArea>
              <img src="/assets/WebSiteLog-min.png" className={classes.media} />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Golden Dining
                </Typography>
                <Typography color="textSecondary" variant="body2" component="p">
                  Taste the difference.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
          {user ? (
            <>
              <Typography color="textSecondary" variant="body2" component="p">
                {`Welcome back ${user.fullName}`}
              </Typography>
              <NavLink
                to={`${PAGE_COUNTER.path}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Button>Go to Dashboard</Button>
              </NavLink>
            </>
          ) : (
            <Typography color="textSecondary" variant="body2" component="p">
              Welcome to Golden Dining
            </Typography>
          )}
        </div>
      </Container>
    </>
  );
};

export default Home;
