import React from 'react'

function Header() {
  return (
    <header className="flex justify-center items-center py-5 w-full xl:w-[1120px] mx-auto">       
        <nav className="flex flex-row gap-x-10 opacity-90">           
            <a href='#about'>Sobre mí</a>
            <a href='#experience'>Experiencia</a>      
        </nav>
    </header>
  )
}

export default Header