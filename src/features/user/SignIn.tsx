import {
  Avatar,
  Button,
  TextField,
  Typography,
  makeStyles,
  Container,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import UseSignInForm from "./UseSignInForm";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignIn = () => {
  const classes = useStyles();

  const { register, onSubmit, errors } = UseSignInForm();

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form
          className={classes.form}
          noValidate
          autoComplete="off"
          onSubmit={onSubmit}
        >
          <TextField
            inputRef={register}
            name="email"
            type="email"
            variant="outlined"
            required
            id="email"
            fullWidth
            label="Email Address"
            margin="normal"
            error={!!errors.email}
            helperText={errors.email ? errors.email.message : ""}
          />
          <TextField
            inputRef={register}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            error={!!errors.password}
            helperText={errors.password ? errors.password.message : ""}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default SignIn;
