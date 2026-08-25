import DOMPurify from "dompurify";

/**
 * Sanitiza contenido HTML para evitar ataques XSS antes de renderizarlo con dangerouslySetInnerHTML.
 * @param {string} html - Cadena de texto en formato HTML.
 * @returns {string} HTML sanitizado libre de scripts maliciosos o atributos peligrosos.
 */
export const sanitizeHtml = (html) => {
  if (!html) return "";
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      "b",
      "i",
      "em",
      "strong",
      "a",
      "p",
      "br",
      "ul",
      "ol",
      "li",
      "code",
      "span",
      "u",
      "h1",
      "h2",
      "h3",
      "h4",
      "blockquote",
    ],
    ALLOWED_ATTR: ["href", "target", "rel", "class"],
  });
};
