import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../../components/Portafolio/MainLayout";
import { useAuth } from "../../context/AuthContext";
import ExperienceManager from "../../components/Admin/ExperienceManager";

function AdminScreen() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("experiences");

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Error cerrando sesión:", error);
    }
  };

  return (
    <MainLayout>
      <div className="w-full max-w-4xl mx-auto py-12 px-6">
        {/* Encabezado del Panel */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-200 dark:border-neutral-800 pb-6 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
              Panel de Administración
            </h1>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
              Sesión iniciada como:{" "}
              <span className="font-semibold text-blue-600 dark:text-blue-400">
                {currentUser?.email}
              </span>
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm font-semibold rounded-lg bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 transition-colors self-start md:self-auto"
          >
            Cerrar Sesión
          </button>
        </div>

        {/* Selector de Pestañas CRUD */}
        <div className="flex border-b border-neutral-200 dark:border-neutral-800 mb-8 space-x-4">
          <button
            onClick={() => setActiveTab("experiences")}
            className={`pb-3 text-sm font-medium transition-colors border-b-2 ${
              activeTab === "experiences"
                ? "border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400"
                : "border-transparent text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"
            }`}
          >
            Experiencias
          </button>
          <button
            onClick={() => setActiveTab("projects")}
            className={`pb-3 text-sm font-medium transition-colors border-b-2 ${
              activeTab === "projects"
                ? "border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400"
                : "border-transparent text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"
            }`}
          >
            Proyectos
          </button>
          <button
            onClick={() => setActiveTab("posts")}
            className={`pb-3 text-sm font-medium transition-colors border-b-2 ${
              activeTab === "posts"
                ? "border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400"
                : "border-transparent text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"
            }`}
          >
            Publicaciones (Posts)
          </button>
        </div>

        {/* Contenido según la pestaña activa */}
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 shadow-sm">
          {activeTab === "experiences" && <ExperienceManager />}


          {activeTab === "projects" && (
            <div>
              <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-4">
                Gestión de Proyectos
              </h2>
              <p className="text-neutral-500 dark:text-neutral-400 text-sm">
                Aquí podrás administrar los proyectos destacados exhibidos en el portafolio.
              </p>
            </div>
          )}

          {activeTab === "posts" && (
            <div>
              <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-4">
                Gestión de Publicaciones
              </h2>
              <p className="text-neutral-500 dark:text-neutral-400 text-sm">
                Aquí podrás redactar y editar artículos para la sección de Posts & Bitácora.
              </p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}

export default AdminScreen;
