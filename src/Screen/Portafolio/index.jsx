import React, { useEffect, useState } from "react";
import MainLayout from "../../components/Portafolio/MainLayout";
import About from "../../components/Portafolio/About";
import BrifCase from "../../components/Incons/BrifCase";
import CodeIcon from "../../components/Incons/CodeIcon";
import Experience from "../../components/Portafolio/Experience";
import Proyects from "../../components/Portafolio/Proyects";
import ExperienceDataFallback from "../../Data/Experience.json";
import ProjectsDataFallback from "../../Data/Projects.json";
import { getExperiences } from "../../services/experienceService";
import { getProjects } from "../../services/projectService";
import "./style.css";

function Portafolio() {
  const [experiences, setExperiences] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loadingExp, setLoadingExp] = useState(true);
  const [loadingProj, setLoadingProj] = useState(true);

  useEffect(() => {
    const fetchExperiencesData = async () => {
      try {
        const data = await getExperiences();
        if (data && data.length > 0) {
          setExperiences(data);
        } else {
          setExperiences(ExperienceDataFallback);
        }
      } catch (error) {
        console.warn("No se pudo cargar experiencias desde Firestore, usando respaldo:", error);
        setExperiences(ExperienceDataFallback);
      } finally {
        setLoadingExp(false);
      }
    };

    const fetchProjectsData = async () => {
      try {
        const data = await getProjects();
        if (data && data.length > 0) {
          setProjects(data);
        } else {
          setProjects(ProjectsDataFallback);
        }
      } catch (error) {
        console.warn("No se pudo cargar proyectos desde Firestore, usando respaldo:", error);
        setProjects(ProjectsDataFallback);
      } finally {
        setLoadingProj(false);
      }
    };

    fetchExperiencesData();
    fetchProjectsData();
  }, []);

  return (
    <MainLayout>
      <About />

      {/* Sección Experiencia Laboral */}
      <section id="experience" className="w-full max-w-3xl mx-auto py-12 px-6">
        <h2 className="text-2xl font-bold mb-8 flex gap-x-3 items-center text-neutral-900 dark:text-white">
          <BrifCase />
          Experiencia laboral
        </h2>
        {loadingExp ? (
          <p className="text-neutral-500 dark:text-neutral-400 py-4">Cargando experiencia...</p>
        ) : (
          <Experience experiences={experiences} />
        )}
      </section>

      {/* Sección Proyectos */}
      <section id="projects" className="w-full max-w-3xl mx-auto py-12 px-6">
        <h2 className="text-2xl font-bold mb-8 flex gap-x-3 items-center text-neutral-900 dark:text-white">
          <CodeIcon />
          Proyectos destacados
        </h2>
        {loadingProj ? (
          <p className="text-neutral-500 dark:text-neutral-400 py-4">Cargando proyectos...</p>
        ) : (
          <Proyects projects={projects} />
        )}
      </section>
    </MainLayout>
  );
}

export default Portafolio;
