import React from "react";

function ExperienceItem({ date, title, description, link }) {
  return (
    <>
      <div className="absolute w-3 h-3 bg-blue-600 dark:bg-blue-400 rounded-full mt-1.5 -start-1.5 border border-white dark:border-neutral-900"></div>
      <time className="mb-1 text-sm font-semibold text-blue-600 dark:text-blue-400">
        {date}
      </time>
      <h3 className="text-xl font-bold text-neutral-900 dark:text-white mt-1">
        {title}
      </h3>
      <p className="mt-2 text-base font-normal text-neutral-600 dark:text-neutral-300 leading-relaxed text-pretty">
        {description}
      </p>
      {link && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 mt-3 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline"
        >
          Saber más
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </a>
      )}
    </>
  );
}

export default ExperienceItem;
