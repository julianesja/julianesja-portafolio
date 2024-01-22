import React from 'react'

function Header() {
  return (
    <header className="flex justify-center items-center py-3 w-[1120px] mx-auto">       
        <nav className="flex flex-row gap-x-10 opacity-90">
            <a href='/'>Home</a>
            <a href='/'>About</a>
            <a href='/'>Projects</a>
            <a href='/'>Contact</a>
        </nav>
    </header>
  )
}

export default Header