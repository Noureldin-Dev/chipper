import React from 'react'
import Link from 'next/link'
function NavBarOption({isLogo,Icon, DisplayName, Destination,Bold}) {
  return (
      <Link href={Destination}>
        {Bold?
        <strong>
<a  className={!isLogo?"NavBarOption":"Logo"}>{Icon}<span className='NavBarOptionText'>{DisplayName}</span></a>

        </strong>
        :
<a  className={!isLogo?"NavBarOption":"Logo"}>{Icon}<span className='NavBarOptionText'>{DisplayName}</span></a>
}
      </Link>
  )
}

export default NavBarOption