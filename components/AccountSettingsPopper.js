import * as React from 'react';
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import Fade from '@mui/material/Fade';
import { auth } from '../firebase'
import { signOut } from 'firebase/auth'
import { Avatar, Button,IconButton } from '@mui/material'
import Backdrop from "@mui/material/Backdrop"
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';

function BasicList() {
    return (
      <Box sx={{ width: '100%', maxWidth: "100%", bgcolor: 'black' }}>
        <nav >
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={()=>signOut(auth)}>
                  Logout
              </ListItemButton>
            </ListItem>
          </List>
        </nav>
        <Divider />
       
      </Box>
    );
  }

  export function AccountSettingsPopper({ user, username,PhotoURL }) {
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);

  };
  function handleClose() {
    setOpen(false);
  }

  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? 'transition-popper' : undefined;

  return (
    <div id="AccountSettingsPopper">
      <button aria-describedby={id} type="button" onClick={handleClick}>
       <Avatar referrerPolicy="no-referrer" src={PhotoURL}/> 
       <div>
         <h3>{user?.displayName}</h3>
       <h6>@{username}</h6>
       </div>
      </button>
      <Backdrop
          sx={{ color: '#fff', zIndex:"20"}}
        open={open}
        onClick={handleClose}
      >
      </Backdrop>
      <Popper className='AccountSettingsBackdrop' sx={{zIndex:"21"}} id={id} open={open} placement={"top-end"} anchorEl={anchorEl} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Box className="AccountSettingsPopperContent">
              {/* <Button variant="contained" onClick={()=>signOut(auth)}>sign out</Button> */}
              <BasicList className="AccountSettingsPopperContent" />
            </Box>
          </Fade>
        )}
      </Popper>
    </div>
  );
}

export function AccountProfilePicturePopper({ user, username,PhotoURL }) {
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClickP = (event) => {
    console.log("eh")
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);


  };
  function handleClose() {
    setOpen(false);
    console.log("NYE")
  }

  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? 'transition-popper' : undefined;

  return (
    <>
    <div   id="AccountProfilePicturePopper" >
    <IconButton id="BottomLeftProfilePic" onClick={handleClickP} sx={{padding:"25px", zIndex:"2", }}>
<Avatar id="BottomLeftProfilePic"  sx={{height:"40px", width:"40px", zIndex:'1'}} referrerPolicy="no-referrer"  src={PhotoURL}></Avatar>

    </IconButton>
    
    </div>
    <div id="AccountProfilePicturePopper">

      <Backdrop
      className='ProfilePicBackdrop'
 sx={{ color: '#fff', zIndex:"20"}}
        open={open}
        onClick={handleClose}
      >
      </Backdrop>
      <Popper
            className='ProfilePicBackdrop'
            sx={{zIndex:"21"}} id={id} open={open} placement={"top-end"} anchorEl={anchorEl} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Box className="AccountSettingsPopperContent">
              {/* <Button variant="contained" onClick={()=>signOut(auth)}>sign out</Button> */}
              <BasicList />
            </Box>
          </Fade>
        )}
      </Popper>
    </div>
    </>
  );
}


