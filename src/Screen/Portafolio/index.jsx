import React, { useEffect, useState } from "react";
import About from "../../components/Portafolio/About";
import BrifCase from "../../components/Incons/BrifCase";
import Experience from "../../components/Portafolio/Experience";
import ExperienceDataFallback from "../../Data/Experience.json";
import Header from "../../components/Portafolio/Header";
import { getExperiences } from "../../services/experienceService";
import "./style.css";

function Portafolio() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const data = await getExperiences();
        if (data && data.length > 0) {
          setExperiences(data);
        } else {
          setExperiences(ExperienceDataFallback);
        }
      } catch (error) {
        console.warn("No se pudo cargar desde Firestore, usando datos estáticos de respaldo:", error);
        setExperiences(ExperienceDataFallback);
      } finally {
        setLoading(false);
      }
    };

    fetchExperiences();
  }, []);

  return (
    <>
      <Header />
      <About />
      <section id="experience" className="w-full mx-auto lg:w-[740px]">
        <h2 className="text-2xl font-semibold mb-5 flex gap-x-2 items-center">
          <BrifCase />
          Experiencia laboral
        </h2>
        {loading ? (
          <p className="text-gray-400 py-4">Cargando experiencia...</p>
        ) : (
          <Experience experiences={experiences} />
        )}
      </section>
    </>
  );
}

export default Portafolio;
