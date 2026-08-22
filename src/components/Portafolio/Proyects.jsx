import React from "react";
import { Link } from "react-router-dom";

const Proyects = ({ projects }) => {
  if (!projects || projects.length === 0) {
    return (
      <p className="text-neutral-500 dark:text-neutral-400 py-4">
        Próximamente se agregarán nuevos proyectos.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {projects.map(({ id, title, description, link, github, image, tags }) => {
        const isInternalLink = link && link.startsWith("/");

        return (
          <article
            key={id || title}
            className="flex flex-col justify-between rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 p-6 shadow-sm hover:border-neutral-300 dark:hover:border-neutral-700 transition-all group"
          >
            <div>
              {image && (
                <div className="overflow-hidden rounded-lg mb-4 bg-neutral-100 dark:bg-neutral-800 aspect-video flex items-center justify-center">
                  <img
                    src={image}
                    alt={`Captura del proyecto ${title}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}

              <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {title}
              </h3>

              <p className="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed mb-4">
                {description || "Proyecto desarrollado con tecnologías modernas."}
              </p>
            </div>

            <div>
              {tags && tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 rounded-md text-xs font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex items-center gap-4 pt-2 border-t border-neutral-100 dark:border-neutral-800/80 text-sm font-medium">
                {link && (
                  isInternalLink ? (
                    <Link
                      to={link}
                      className="inline-flex items-center gap-1.5 text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      Ver aplicación ↗
                    </Link>
                  ) : (
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      Ver Demo ↗
                    </a>
                  )
                )}

                {github && (
                  <a
                    href={github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors ml-auto"
                  >
                    GitHub ↗
                  </a>
                )}
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default Proyects;