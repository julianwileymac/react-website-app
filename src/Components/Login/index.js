import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { SignUpLink } from '../Sign Up';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../Constants/routes'; 
import { createMuiTheme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { PasswordForgetLink } from '../PasswordForget';
import { withNavigation }  from '../Navigation/';
import { NotificationAirlineSeatLegroomReduced } from 'material-ui/svg-icons';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
const LogInPage = () => (
    <React.Fragment>
      <LogInForm />
      </React.Fragment>
  );



const INITIAL_STATE = {
    email: '',
    password: '',
    error: null, 
};

const theme = createMuiTheme({})

const styles = {
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
};

class LogInFormBase extends Component {
    constructor(props){
        super(props);
        
        this.state = {...INITIAL_STATE};
        this.classes = {styles};
    }
    

    onSubmit = event => {
        const { email, password } = this.state;

        this.props.firebase
            .doSignInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState({...INITIAL_STATE});
                this.props.history.push(ROUTES.HOME);
            })
            .catch(error => {
                this.setState({ error });
            });
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        const { email, password, error } = this.state; 
        const isInvalid = password === '' || email === '';

        return (
          <React.Fragment>
            <Container component={Box}>
            <Grid container component="main" className={this.classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={this.classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={this.classes.paper}>
                <Avatar className={this.classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={this.classes.form} noValidate onSubmit={this.onSubmit}>
                    <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={email}
                    onChange={this.onChange}
                    />
                    <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={this.onChange}
                    />
                    <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                    />
                    <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={this.classes.submit}
                    disabled={isInvalid}
                    >
                    Sign In
                    </Button>
                    <Grid container>
                    <Grid item xs>
                        <PasswordForgetLink>
                        Forgot password?
                        </PasswordForgetLink>
                    </Grid>
                    <Grid item>
                        <SignUpLink>
                        {"Don't have an account? Sign Up"}
                        </SignUpLink>
                    </Grid>
                    </Grid>
                    <Box mt={5}>
                    <Copyright />
                    </Box>
                    {error && <p>{error.message}</p>}
                </form>
                </div>
            </Grid>
            </Grid>
          </Container>
          </React.Fragment>
        );
    }
}

const LogInLink = () => (
  <Typography>
      Already Have an Account? Sign In <RouterLink to={ROUTES.LOGIN}/>

  </Typography>
);

const LogInForm = compose(
    withRouter,
    withFirebase,
    withNavigation
)(LogInFormBase);

export default LogInPage;
export { LogInForm , LogInLink};