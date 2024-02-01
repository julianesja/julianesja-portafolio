import React from 'react'

function Header() {
  return (
    <header className="flex justify-center items-center py-3 w-[1120px] mx-auto">       
        <nav className="flex flex-row gap-x-10 opacity-90">
            <a href='#top'>Inicio</a>
            <a href='#about'>Sobre mí</a>
            <a href='#experience'>Experiencia</a>
            <a href='#proyects'>Proyectos</a>
            <a href='#contact'>Contacto</a>
        </nav>
    </header>
  )
}

export default Header