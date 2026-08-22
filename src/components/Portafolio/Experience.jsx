import React from "react";
import ExperienceItem from "./ExperienceItem";

const Experience = ({ experiences }) => {
  return (
    <ol className="relative border-s border-neutral-200 dark:border-neutral-800 ml-3 space-y-8">
      {experiences.map((experience, index) => (
        <li className="ms-6" key={experience.id || experience.date || index}>
          <ExperienceItem {...experience} />
        </li>
      ))}
    </ol>
  );
};

export default Experience;
