import React from 'react'

const SocialPill = ({text, children, url}) => {
  return (  
    <a href={url} 
      target='_blank' 
      className='rounded-full border-white/10 flex justify-center items-center gap-x-2 py-2 px-4 bg-black/10 hover:scale-110 hover:bg-black/30 transition'>
        {children}
        {text}
    </a>
  )
}

export default SocialPill