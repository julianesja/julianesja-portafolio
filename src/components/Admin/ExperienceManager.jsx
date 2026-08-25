import React, { useState, useEffect } from "react";
import {
  getExperiences,
  addExperience,
  updateExperience,
  deleteExperience,
} from "../../services/experienceService";
import RichTextEditor from "./RichTextEditor";
import { sanitizeHtml } from "../../utils/sanitizeHtml";

const initialFormState = {
  title: "",
  date: "",
  description: "",
  order: "",
};

function ExperienceManager() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState(initialFormState);
  const [editingId, setEditingId] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [message, setMessage] = useState({ text: "", type: "" });

  const fetchExperiences = async () => {
    try {
      setLoading(true);
      const data = await getExperiences();
      setExperiences(data || []);
    } catch (error) {
      console.error("Error al cargar experiencias:", error);
      showMessage("Error al cargar las experiencias desde Firestore", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  const showMessage = (text, type = "success") => {
    setMessage({ text, type });
    setTimeout(() => {
      setMessage({ text: "", type: "" });
    }, 4000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDescriptionChange = (htmlContent) => {
    setFormData((prev) => ({ ...prev, description: htmlContent }));
  };

  const handleEditClick = (exp) => {
    setEditingId(exp.id);
    setFormData({
      title: exp.title || "",
      date: exp.date || "",
      description: exp.description || "",
      order: exp.order !== undefined ? exp.order : "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData(initialFormState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.date.trim() || !formData.description.trim()) {
      showMessage("Por favor completa los campos obligatorios.", "error");
      return;
    }

    try {
      setSubmitting(true);
      if (editingId) {
        await updateExperience(editingId, formData);
        showMessage("Experiencia actualizada correctamente.");
      } else {
        await addExperience(formData);
        showMessage("Experiencia agregada correctamente.");
      }
      setFormData(initialFormState);
      setEditingId(null);
      await fetchExperiences();
    } catch (error) {
      console.error("Error al guardar la experiencia:", error);
      showMessage("Ocurrió un error al guardar la experiencia.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setSubmitting(true);
      await deleteExperience(id);
      showMessage("Experiencia eliminada correctamente.");
      setDeleteConfirmId(null);
      await fetchExperiences();
    } catch (error) {
      console.error("Error al eliminar la experiencia:", error);
      showMessage("Error al eliminar la experiencia.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Alerta de notificación */}
      {message.text && (
        <div
          className={`p-4 rounded-lg text-sm border font-medium ${
            message.type === "error"
              ? "bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800"
              : "bg-green-50 dark:bg-green-950/50 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Formulario Crear / Editar */}
      <div className="bg-neutral-50 dark:bg-neutral-800/40 p-6 rounded-xl border border-neutral-200 dark:border-neutral-800">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
            {editingId ? "✏️ Editar Experiencia" : "➕ Agregar Nueva Experiencia"}
          </h3>
          {editingId && (
            <button
              onClick={handleCancelEdit}
              className="text-xs text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 underline"
            >
              Cancelar edición
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                Cargo y Empresa <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Ej: Globant - SSR advanced Developer"
                className="w-full px-3 py-2 text-sm rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                Período / Fecha <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="date"
                required
                value={formData.date}
                onChange={handleInputChange}
                placeholder="Ej: Octubre 2020 - Mayo 2022"
                className="w-full px-3 py-2 text-sm rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-3">
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                Descripción de responsabilidades (Texto Enriquecido){" "}
                <span className="text-red-500">*</span>
              </label>
              <RichTextEditor
                value={formData.description}
                onChange={handleDescriptionChange}
                placeholder="Descripción detallada de actividades, logros y tecnologías..."
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                Orden (Opcional)
              </label>
              <input
                type="number"
                name="order"
                value={formData.order}
                onChange={handleInputChange}
                placeholder="Ej: 1"
                className="w-full px-3 py-2 text-sm rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-1">
                Autocalculado si se deja vacío.
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            {editingId && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="px-4 py-2 text-sm rounded-lg border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              >
                Cancelar
              </button>
            )}
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2 text-sm font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {submitting ? "Guardando..." : editingId ? "Actualizar Experiencia" : "Guardar Experiencia"}
            </button>
          </div>
        </form>
      </div>

      {/* Lista de Experiencias Existentes */}
      <div>
        <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-4">
          Experiencias Registradas ({experiences.length})
        </h3>

        {loading ? (
          <p className="text-neutral-500 dark:text-neutral-400 py-6 text-center">
            Cargando experiencias desde Firestore...
          </p>
        ) : experiences.length === 0 ? (
          <p className="text-neutral-500 dark:text-neutral-400 py-6 text-center border border-dashed border-neutral-300 dark:border-neutral-800 rounded-xl">
            No hay experiencias registradas en la base de datos.
          </p>
        ) : (
          <div className="space-y-4">
            {experiences.map((exp) => (
              <div
                key={exp.id}
                className="p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 flex flex-col md:flex-row md:items-start justify-between gap-4 shadow-sm"
              >
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2 py-0.5 text-xs font-bold rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                      #{exp.order ?? "N/A"}
                    </span>
                    <h4 className="text-base font-bold text-neutral-900 dark:text-white">
                      {exp.title}
                    </h4>
                  </div>
                  <p className="text-xs font-medium text-blue-600 dark:text-blue-400">
                    {exp.date}
                  </p>
                  <div
                    className="text-sm text-neutral-600 dark:text-neutral-300 mt-2 [&_ul]:list-disc [&_ul]:ms-5 [&_ul]:my-1.5 [&_ol]:list-decimal [&_ol]:ms-5 [&_ol]:my-1.5 [&_li]:mt-0.5 [&_a]:text-blue-600 dark:[&_a]:text-blue-400 [&_a]:underline [&_strong]:font-semibold [&_p]:mb-1"
                    dangerouslySetInnerHTML={{ __html: sanitizeHtml(exp.description) }}
                  />
                </div>


                <div className="flex items-center gap-2 self-end md:self-center">
                  <button
                    onClick={() => handleEditClick(exp)}
                    className="px-3 py-1.5 text-xs font-semibold rounded-md border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 transition-colors"
                  >
                    Editar
                  </button>

                  {deleteConfirmId === exp.id ? (
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleDelete(exp.id)}
                        disabled={submitting}
                        className="px-3 py-1.5 text-xs font-semibold rounded-md bg-red-600 hover:bg-red-700 text-white transition-colors"
                      >
                        Confirmar
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(null)}
                        className="px-2 py-1.5 text-xs rounded-md text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"
                      >
                        Cancelar
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setDeleteConfirmId(exp.id)}
                      className="px-3 py-1.5 text-xs font-semibold rounded-md border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                    >
                      Eliminar
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ExperienceManager;
