import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import clsx from 'clsx';
import SignOutButton from '../Sign Out';
import * as ROUTES from '../../Constants/routes';
import { AuthUserContext } from '../Session';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Drawer from '@material-ui/core/Drawer';
import { createMuiTheme, useTheme, withTheme, makeStyles, ThemeProvider, MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import InboxIcon from '@material-ui/icons/Inbox';
import { compose } from 'recompose';
import { blue } from '@material-ui/core/colors';
import { Container } from '@material-ui/core';
import PropTypes from 'prop-types';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import './navigationbar.css';

function ScrollTop(props) {
  const { children, window } = props;
  const classes = useStyles();
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });
}

const theme = createMuiTheme({
  palette:{
    primary: blue,
  },
  typography:{
    fontFamily: ['Times New Roman']
,  }
});

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1, 
    display: 'flex',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin','width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flex: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut, 
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },

}));

const withNavigation = Component => {
  class NavigationClass extends React.Component {
    constructor(props){
      super(props);

      this.state = {
        authUser: null, 
      };
      this.theme = props.theme;
      this.classes = props.classes;
    }

    
    
    NavigationAuth() {
      let [anchorEl, setAnchorEl] = React.useState(null);
      let [open, setOpen] = React.useState(false);
      let opened = Boolean(anchorEl);
    
      const handleChange = event => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleDrawerOpen = () => {
        setOpen(true);
      };
    
      const handleDrawerClose = () => {
        setOpen(false);
      };
    
      const handleClose = event => {
        setAnchorEl(null);
      };
    
      const handleAccountMenu = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
      return(
        <React.Fragment>
          <CssBaseline />
          <div>
          <AppBar 
            position="fixed"
            className={clsx(this.classes.appBar, {
              [this.classes.appBarShift]: open,
            })}
          >
            <ToolBar>
              <IconButton 
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                className={clsx(this.classes.menuButton, open && this.classes.hide)}>
                <MenuIcon />
              </IconButton>
              <Button type="button">
                <Link component={RouterLink} to={ROUTES.HOME}>Home</Link>
              </Button>
              <Typography variant="h6" noWrap className={this.classes.title}>
                Persistent Drawer
              </Typography>
              <IconButton
                color="inherit"
                aria-label="account menu"
                aria-controls="menu-appbar"
                aria-haspopup='true'
                onClick={handleAccountMenu}
                edge="end"
                className={this.classes.accountMenu}
              >
                <AccountCircleIcon />
              </IconButton>
              <Menu 
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  veritcal: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                >
                  <MenuItem><Link component={RouterLink} to={ROUTES.ACCOUNT}>Account</Link></MenuItem>
                  <MenuItem><SignOutButton/></MenuItem>
                </Menu>
            </ToolBar>
          </AppBar>
          </div>
          <div>
          <Drawer
            className={this.classes.drawer}
            variant="persistent"
            anchor="left"
            open={open}
            classes={{
              paper: this.classes.drawerPaper,
            }}
            >
              <div className={this.classes.drawerHeader}>
                <IconButton onClick={handleDrawerClose}>
                  {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
              </div>
              <Divider />
              <List>
                {['Inbox', 'Starred', 'Send Mail', 'Drafts'].map((text, index) => (
                  <ListItem button key={text}>
                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon /> }</ListItemIcon> 
                    <ListItemText primary={text} />
                  </ListItem>
                ))}
              </List>
              <Divider />
              <List>
                {['All Mail', 'Trash', 'Spam'].map((text, index) => (
                  <ListItem button key={text}>
                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItem>
                ))}
              </List>
            </Drawer>
            </div>
            <div>
            <main
            className={clsx(this.classes.content, {
              [this.classes.contentShift]: open,
            })} >
            <Container>
              <Box p={3}>
                <Component {...this.props}/>
              </Box>
            </Container>
              
          
          </main>
          </div>
        </React.Fragment>
      );
    }
    NavigationNonAuth() {
      let theme = this.theme;
      let [anchorEl, setAnchorEl] = React.useState(null);
      let [open, setOpen] = React.useState(false);
      let opened = Boolean(anchorEl);
    
      const handleChange = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleDrawerOpen = () => {
        setOpen(true);
      };
    
      const handleDrawerClose = () => {
        setOpen(false);
      };
    
      const handleClose = event => {
        setAnchorEl(null);
      };
    
      const handleAccountMenu = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
      return(
        <div className={this.classes.root}>
          <CssBaseline />
          <AppBar 
            position="fixed"
            className={clsx(this.classes.appBar, {
              [this.classes.appBarShift]: open,
            })}
          >
            <ToolBar id="back-to-top-anchor">
              <Button type="button">
                <Link component={RouterLink} to={ROUTES.HOME}>Home</Link>
              </Button>
              <Typography variant="h6" className={this.classes.title}>
                Persistent Drawer
              </Typography>
              <IconButton
                color="inherit"
                aria-label="account menu"
                aria-controls="menu-appbar"
                aria-haspopup='true'
                onClick={handleAccountMenu}
                edge="end"
                className={this.classes.accountMenu}
              >
                <AccountCircleIcon />
              </IconButton>
              <Menu 
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  veritcal: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                >
                  <MenuItem><Link component={RouterLink} to={ROUTES.SIGNUP}>Sign Up </Link></MenuItem>
                </Menu>
    
              <Container>
                <Box my={2}>
                  {[...new Array(12)]
                    .map(
                      () => `Cras mattis consectetur purus sit amet fermentum.
        Cras justo odio, dapibus ac facilisis in, egestas eget quam.
        Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
        Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
                    )
                    .join('\n')}
                </Box>
              </Container>
              <ScrollTop {...this.props}>
                <Fab color="secondary" size="small" aria-label="scroll back to top">
                  <KeyboardArrowUpIcon />
                </Fab>
              </ScrollTop>
            </ToolBar>
          </AppBar>
          <div>
            <main
            className={clsx(this.classes.content, {
              [this.classes.contentShift]: open,
            })} > 
            {
            <Box p={3}>
              <Component {...this.props}/>
            </Box>
            }
          
          </main>
          </div>
        </div>
      );
    };
    NavigationBase(){

      const NavigationAuth = this.NavigationAuth();
      const NavigationNonAuth = this.NavigationNonAuth();
      return(
      <div>
        <AuthUserContext.Consumer>
          {authUser =>
            authUser ? <NavigationAuth /> : <NavigationNonAuth />
            }
        </AuthUserContext.Consumer>
        </div>
      );
      };
    render() {
      const NavBase = this.NavigationBase();
      const styles = {
        root: {
        flexGrow: 1, 
        display: 'flex',
      },
      menuButton: {
        marginRight: theme.spacing(2),
      },
      title: {
        flexGrow: 1,
      },
      appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
      },
      appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin','width'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
      menuButton: {
        marginRight: theme.spacing(2),
      },
      hide: {
        display: 'none',
      },
      drawer: {
        width: drawerWidth,
        flex: 0,
      },
      drawerPaper: {
        width: drawerWidth,
      },
      drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: "flex-end",
      },
      content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
      },
      contentShift: {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut, 
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      }};

      this.classes = useStyles(styles);
      this.theme = useTheme(theme);

      return(
        <NavBase/> 
      );
    }
  };

  const Theme1 = Component => props => (
    <MuiThemeProvider theme={theme}>
        {<Component {...props}/>}
    </MuiThemeProvider>
  );
  /*
  const StyledNav = Component => props => (
    withStyles(styles)(() => {
      <Component {...props} />
    } 
    )
  )
  */
  return( Theme1(NavigationClass));
}




/*
const NavigationBase = Component => (props) => (
<div>
  <AuthUserContext.Consumer>
    {authUser =>
      authUser ? <NavigationAuth props={props} authUser={authUser}/> : <NavigationNonAuth props={props} authUser={authUser}/>
      }
  </AuthUserContext.Consumer>
  </div>
);


function NavigationAuth(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const opened = Boolean(anchorEl);

  const handleChange = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleClose = event => {
    setAnchorEl(null);
  };

  const handleAccountMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return(
    <React.Fragment>
      <CssBaseline />
      <div>
      <AppBar 
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <ToolBar>
          <IconButton 
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}>
            <MenuIcon />
          </IconButton>
          <Button type="button">
            <Link component={RouterLink} to={ROUTES.HOME}>Home</Link>
          </Button>
          <Typography variant="h6" noWrap className={classes.title}>
            Persistent Drawer
          </Typography>
          <IconButton
            color="inherit"
            aria-label="account menu"
            aria-controls="menu-appbar"
            aria-haspopup='true'
            onClick={handleAccountMenu}
            edge="end"
            className={classes.accountMenu}
          >
            <AccountCircleIcon />
          </IconButton>
          <Menu 
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              veritcal: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            >
              <MenuItem><Link component={RouterLink} to={ROUTES.ACCOUNT}>Account</Link></MenuItem>
              <MenuItem><SignOutButton/></MenuItem>
            </Menu>
        </ToolBar>
      </AppBar>
      </div>
      <div>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          <Divider />
          <List>
            {['Inbox', 'Starred', 'Send Mail', 'Drafts'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon /> }</ListItemIcon> 
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['All Mail', 'Trash', 'Spam'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Drawer>
        </div>
        <div>
        <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })} > 
        <childrenInheritance props={props}>
          {props.children}
        </childrenInheritance>
      
      </main>
      </div>
    </React.Fragment>
  );
}
/*
const NavigationAuth = () => (
  <ul>
    <li>
      <RouterLink to={ROUTES.LANDING}>Landing</RouterLink>
    </li>
    <li>
      <RouterLink to={ROUTES.HOME}>Home</RouterLink>
    </li>
    <li>
      <RouterLink to={ROUTES.ACCOUNT}>Account</RouterLink>
    </li>
  </ul>
);

const NavigationNonAuth = () => (
  <ul>
    <li>
      <RouterLink to={ROUTES.LANDING}>Landing</RouterLink>
    </li>
    <li>
      <RouterLink to={ROUTES.SIGNUP}>Sign Up</RouterLink>
    </li>
  </ul>
);
 */
/*
function NavigationNonAuth(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const opened = Boolean(anchorEl);

  const handleChange = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleClose = event => {
    setAnchorEl(null);
  };

  const handleAccountMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return(
    <div className={classes.root}>
      <CssBaseline />
      <AppBar 
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <ToolBar id="back-to-top-anchor">
          <Button type="button">
            <Link component={RouterLink} to={ROUTES.HOME}>Home</Link>
          </Button>
          <Typography variant="h6" className={classes.title}>
            Persistent Drawer
          </Typography>
          <IconButton
            color="inherit"
            aria-label="account menu"
            aria-controls="menu-appbar"
            aria-haspopup='true'
            onClick={handleAccountMenu}
            edge="end"
            className={classes.accountMenu}
          >
            <AccountCircleIcon />
          </IconButton>
          <Menu 
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              veritcal: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            >
              <MenuItem><Link component={RouterLink} to={ROUTES.SIGNUP}>Sign Up </Link></MenuItem>
            </Menu>

          <Container>
            <Box my={2}>
              {[...new Array(12)]
                .map(
                  () => `Cras mattis consectetur purus sit amet fermentum.
    Cras justo odio, dapibus ac facilisis in, egestas eget quam.
    Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
    Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
                )
                .join('\n')}
            </Box>
          </Container>
          <ScrollTop {...props}>
            <Fab color="secondary" size="small" aria-label="scroll back to top">
              <KeyboardArrowUpIcon />
            </Fab>
          </ScrollTop>
        </ToolBar>
      </AppBar>
      <div>
        <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })} > 
        {
        <Box p={3} component="main">
          <Container>{props.children}</Container>
        </Box>
        }
      
      </main>
      </div>
    </div>
  );
}
*/


export default withNavigation ;