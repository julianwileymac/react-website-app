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


function NavigationAuth(props) {
    
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