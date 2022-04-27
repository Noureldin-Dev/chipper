import { CircularProgress } from '@mui/material'
import React from 'react'
CircularProgress

function LoadingScreen() {
  return (
    <div className='centeredDiv' id='LoadingScreen'>
        <CircularProgress size={"50px"} />
    </div>
  )
}

export default LoadingScreen