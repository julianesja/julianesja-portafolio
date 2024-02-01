import React from "react";
import ExperienceItem from "./ExperienceItem";

const Experience = ({experiences}) => {
  return (
    <ol className="relative border-s border-gray-200 dark:border-gray-700">
        {experiences.map(experience=>(
           <li className="mb-10 ms-4" key={experience.date}>
               <ExperienceItem  {...experience}/>
            </li>
        ))}
    </ol>
  );
};

export default Experience;
