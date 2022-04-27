import React, {useState} from 'react'
// import AccountSettingsPopper from './AccountSettingsPopper'
import {AccountProfilePicturePopper, AccountSettingsPopper} from './AccountSettingsPopper'
import NavBarOption from "./NavBarOption"
import Link from 'next/link'
import Image from 'next/image'
import HomeIcon from '@mui/icons-material/Home';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import PersonIcon from '@mui/icons-material/Person';
import Dialog from '@mui/material/Dialog';
import PostSomething from './PostSomething'
import TagIcon from '@mui/icons-material/Tag';
// for the logo give credits to these people
// <a href="https://www.freepnglogos.com/pics/logo-twitter-png" title="Image from freepnglogos.com">

function SideBar({user, username, PhotoURL, currentScreen}) {
  const [open, setOpen] = useState(false)
  return (
    <>
    <Dialog
  open={open}
  onClose={()=>setOpen(false)}
  sx={{bgcolor:"hsla(208, 24%, 47%, 0.4)"}}
>
  <div className="TweetDialog">
<PostSomething user ={user} username={username} PhotoURL={PhotoURL} style={{height:"100%"}} />
  </div>
</Dialog>
    <div id="sideBar">

      <div>
        <div className='NavBarOnTheLeft'>

        <NavBarOption isLogo={true}  Icon={<img  src="https://www.freepnglogos.com/uploads/twitter-logo-png/twitter-logo-vector-png-clipart-1.png"  alt="twitter logo vector png clipart"  className='SideBarIcon'/>} Destination="/app"/>
        <NavBarOption Bold={currentScreen=="Home"}  isLogo={false}  Icon={<HomeIcon   className='SideBarIcon'/>} DisplayName="Home" Destination="/app"/>
      <NavBarOption Bold={currentScreen=="Explore"} isLogo={false}Icon={<TagIcon  className='SideBarIcon'/>} DisplayName="Explore" Destination={"/explore"}/>
      <NavBarOption Bold={currentScreen=="Bookmarks"} isLogo={false}Icon={<BookmarksIcon  className='SideBarIcon'/>} DisplayName="Bookmarks" Destination="/bookmarks"/>      
      <NavBarOption Bold={currentScreen=="Profile"} isLogo={false}Icon={<PersonIcon  className='SideBarIcon'/>} DisplayName="Profile" Destination={"/user/"+username}/>
      <div onClick={()=>setOpen(true)} className='NavBarOptionTweet'>Chirp</div>
      </div>
      <AccountSettingsPopper PhotoURL={PhotoURL} username= {username} user={user}/>
      <AccountProfilePicturePopper PhotoURL={PhotoURL} username= {username} user={user}/>

      </div>
      <div id="SiteCredits">Clone built by <br/> <a href='www.noureldin.tech'>Noureldin</a></div>
    </div>
    </>

  )
}

export default SideBar