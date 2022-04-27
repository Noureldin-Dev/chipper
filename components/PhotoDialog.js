import React, {useState} from 'react'
import Dialog from '@mui/material/Dialog';
import { Avatar } from '@mui/material';
function PhotoDialog({Image}) {
    const image = Image.replace("s96","s300")
    const [Open, setOpen] = useState(false)
  return (
      <>
      <div onClick={()=>{
          setOpen(true)
        // console.log(Image)
        // console.log(Image.replace("s96","s300"))
      }}>
      <Avatar sx={{height:"140px", width:"140px"}} src={image} />

      </div>
      <Dialog sx={{bgcolor:"hsl(0, 0%, 0%, 0.6)"}} onClose={()=>setOpen(false)} open={Open}>
          <div style={{backgroundColor:"hsl(0, 0%, 0%, 1)"}}>
      <Avatar sx={{height:"370px", width:"370px"}} src={image}/>
      </div>
      </Dialog>
      </>
  )
}

export default PhotoDialog