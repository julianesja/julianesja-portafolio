import React from 'react'

const Proyects = ({projects}) => {
  return (
    projects.map(({title, description, link, github, image, tags}) =>(
        <article>
            <h3>{title}</h3>
            <p>
                {description}
            </p>
            <ul>
                {tags.map(tag=>(
                    <li>{tag}</li>
                ))}
            </ul>
            <img src={image} alt={`Captura de pantaña del proyecto ${image}`}></img>
        </article>
    ))
  )
}

export default Proyects