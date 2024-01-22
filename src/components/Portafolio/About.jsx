import React from 'react'
import Badge from './Badge'
import LinkedInIcon from '../Incons/LinkedInIcon'
import SocialPill from './SocialPill'
import GitHub from '../Incons/GitHub'

const About = () => {
  return (
    <section className="w-full mx-auto lg:w-[740px] py-44">
         <img
            className="rounded-full w-12 h-12 mb-4" 
            src="https://avatars.githubusercontent.com/u/9330429?v=4"
            alt="julianesja photo"/>
        <h1 className="text-5xl font-bold flex flex-row gap-x-4 pb-10">
            Hey, soy Julian Estrada 
            <div className='flex justify-center items-center'>
                <a target='_blank' rel='noopner' href='https://www.linkedin.com/in/julian-estrada-jaramillo-840a7698/'><Badge>Disponible para trabajar</Badge></a>
            </div>
        </h1>
        <h2 className='text-2xl text-wrap'>
            <span>+10 años de experiencia.</span><span className='opacity-80'> en Desarrollo web utilizando el lenguage de desarrollo c#.</span> 
            de Medellin colombia 
        </h2>
        <nav className='flex gap-x-4 mt-4'>
            <SocialPill
            text={"LinkedIn"}                
            url={'https://www.linkedin.com/in/julian-estrada-jaramillo-840a7698/'}>
                <LinkedInIcon/>
            </SocialPill> 

            <SocialPill
            text={"github"}                
            url={'https://github.com/julianesja/'}>
                <GitHub/>
            </SocialPill>                     
        </nav>
    </section>
  )
}

export default About