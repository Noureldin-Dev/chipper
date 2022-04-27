import React, {useEffect, useState} from 'react'
import { Button, Snackbar, Alert } from '@mui/material';
import Slide from '@mui/material/Slide';
function CustomAlert({severity="success",message="Add A message"}) {
    const [open, setOpen] = React.useState(false);
 var BackgroundColor;
    if (severity== "success"){
      BackgroundColor= "#4D9A56"
    }

  const handleClick = () => {
    setOpen(true);
  };

  useEffect(()=>{
    handleClick()
  },[])

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (<div style={{zIndex:"30"}}>
  <Snackbar open={open} autoHideDuration={3300} onClose={handleClose}>
  <Alert sx={{bgcolor:"#4D9A56"}} onClose={handleClose} severity={severity} >
{message}
    </Alert>
  </Snackbar>
  </div>
  )
}

export default CustomAlert
