import React, { useRef, useEffect, useState } from "react";

function RichTextEditor({ value, onChange, placeholder = "Escribe la descripción aquí..." }) {
  const editorRef = useRef(null);
  const [showCode, setShowCode] = useState(false);
  const [rawHtml, setRawHtml] = useState(value || "");

  useEffect(() => {
    setRawHtml(value || "");
    if (editorRef.current && editorRef.current.innerHTML !== (value || "")) {
      editorRef.current.innerHTML = value || "";
    }
  }, [value]);

  const handleInput = () => {
    if (editorRef.current) {
      const html = editorRef.current.innerHTML;
      setRawHtml(html);
      onChange(html === "<br>" ? "" : html);
    }
  };

  const executeCommand = (command, argument = null) => {
    document.execCommand(command, false, argument);
    if (editorRef.current) {
      editorRef.current.focus();
      handleInput();
    }
  };

  const handleAddLink = () => {
    const url = prompt("Ingresa la URL del enlace (ej: https://ejemplo.com):");
    if (url) {
      executeCommand("createLink", url);
    }
  };

  const handleRawHtmlChange = (e) => {
    const newHtml = e.target.value;
    setRawHtml(newHtml);
    onChange(newHtml);
    if (editorRef.current) {
      editorRef.current.innerHTML = newHtml;
    }
  };

  return (
    <div className="border border-neutral-300 dark:border-neutral-700 rounded-lg overflow-hidden bg-white dark:bg-neutral-900 focus-within:ring-2 focus-within:ring-blue-500 transition-all">
      {/* Barra de Herramientas */}
      <div className="flex flex-wrap items-center gap-1 p-2 bg-neutral-100 dark:bg-neutral-800/80 border-b border-neutral-200 dark:border-neutral-700/80">
        <button
          type="button"
          onClick={() => executeCommand("bold")}
          title="Negrita"
          className="p-1.5 px-2.5 text-xs font-bold rounded hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200"
        >
          B
        </button>

        <button
          type="button"
          onClick={() => executeCommand("italic")}
          title="Cursiva"
          className="p-1.5 px-2.5 text-xs font-serif italic rounded hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200"
        >
          I
        </button>

        <button
          type="button"
          onClick={() => executeCommand("underline")}
          title="Subrayado"
          className="p-1.5 px-2.5 text-xs underline rounded hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200"
        >
          U
        </button>

        <div className="h-4 w-px bg-neutral-300 dark:bg-neutral-700 mx-1" />

        <button
          type="button"
          onClick={() => executeCommand("insertUnorderedList")}
          title="Lista con viñetas"
          className="p-1.5 px-2 text-xs rounded hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200"
        >
          • Lista
        </button>

        <button
          type="button"
          onClick={() => executeCommand("insertOrderedList")}
          title="Lista numerada"
          className="p-1.5 px-2 text-xs rounded hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200"
        >
          1. Lista
        </button>

        <div className="h-4 w-px bg-neutral-300 dark:bg-neutral-700 mx-1" />

        <button
          type="button"
          onClick={handleAddLink}
          title="Insertar enlace"
          className="p-1.5 px-2 text-xs rounded hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200"
        >
          🔗 Enlace
        </button>

        <button
          type="button"
          onClick={() => executeCommand("removeFormat")}
          title="Limpiar formato"
          className="p-1.5 px-2 text-xs rounded hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200"
        >
          🧹 Limpiar
        </button>

        <div className="ml-auto flex items-center gap-1">
          <button
            type="button"
            onClick={() => setShowCode(!showCode)}
            className={`p-1.5 px-2.5 text-xs rounded font-mono transition-colors ${
              showCode
                ? "bg-blue-600 text-white"
                : "hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300"
            }`}
          >
            {showCode ? "Visual" : "<HTML/>"}
          </button>
        </div>
      </div>

      {/* Área de Edición */}
      {showCode ? (
        <textarea
          value={rawHtml}
          onChange={handleRawHtmlChange}
          rows={6}
          className="w-full p-3 font-mono text-xs bg-neutral-900 text-green-400 outline-none resize-y"
          placeholder="<h1>HTML personalizado...</h1>"
        />
      ) : (
        <div
          ref={editorRef}
          contentEditable
          onInput={handleInput}
          onBlur={handleInput}
          className="p-3 min-h-[120px] text-sm text-neutral-900 dark:text-white outline-none [&_ul]:list-disc [&_ul]:ms-5 [&_ul]:my-1.5 [&_ol]:list-decimal [&_ol]:ms-5 [&_ol]:my-1.5 [&_li]:mt-0.5 [&_a]:text-blue-600 dark:[&_a]:text-blue-400 [&_a]:underline [&_strong]:font-semibold [&_p]:mb-1"
          style={{ whiteSpace: "pre-wrap" }}
        />
      )}
    </div>
  );
}

export default RichTextEditor;
