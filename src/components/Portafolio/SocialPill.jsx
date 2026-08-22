import React from "react";

const SocialPill = ({ text, children, url }) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="rounded-full border border-neutral-300 dark:border-neutral-700 flex justify-center items-center gap-x-2 py-1.5 px-4 bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-200 dark:hover:bg-neutral-700 hover:scale-105 transition-all text-xs font-medium"
    >
      {children}
      {text}
    </a>
  );
};

export default SocialPill;