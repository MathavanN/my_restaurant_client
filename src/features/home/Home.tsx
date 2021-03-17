import {
  Card,
  CardActionArea,
  makeStyles,
  CardContent,
  Typography,
  Container,
} from "@material-ui/core";
import { getUser } from "features/user/userSlice";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { PAGE_COUNTER } from "utils/constants";
import logo from "assets/WebSiteLog-min.png";

const useStyles = makeStyles((theme) => ({
  paper: {
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
  //const dispatch = useDispatch();
  const user = useSelector(getUser);
  //const token = useSelector(getToken);
  const classes = useStyles();
  console.log(user);
  return (
    <>
      <Container component="main" maxWidth="sm">
        <div className={classes.paper}>
          <Card>
            <CardActionArea>
              <img src={logo} alt="Golden Dining" className={classes.media} />

              <CardContent>
                {user ? (
                  <>
                    <Typography
                      color="textSecondary"
                      variant="body2"
                      component="p"
                    >
                      {`Welcome back ${user.fullName}`}
                    </Typography>
                    <NavLink
                      to={`${PAGE_COUNTER.path}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    ></NavLink>
                  </>
                ) : (
                  <Typography
                    color="textSecondary"
                    variant="body2"
                    component="p"
                    align="center"
                  >
                    Welcome to Golden Dining
                  </Typography>
                )}
              </CardContent>
            </CardActionArea>
          </Card>
        </div>
      </Container>
    </>
  );
};

export default Home;
