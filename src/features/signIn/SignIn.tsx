import {
  Avatar,
  Button,
  TextField,
  Typography,
  makeStyles,
  Grid,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import UseSignInForm from './UseSignInForm';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '30%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignIn = () => {
  const classes = useStyles();
  const { register, onSubmit, errors } = UseSignInForm();

  return (
    <>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        <form
          className={classes.form}
          onSubmit={onSubmit}
          noValidate
          autoComplete="off"
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                {...register('email')}
                name="email"
                type="email"
                variant="outlined"
                required
                id="email"
                fullWidth
                label="Email"
                autoComplete="email"
                margin="normal"
                error={!!errors.email}
                helperText={errors.email ? errors.email.message : ''}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...register('password')}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                error={!!errors.password}
                helperText={errors.password ? errors.password.message : ' '}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Submit
          </Button>
        </form>
      </div>
    </>
  );
};

export default SignIn;
