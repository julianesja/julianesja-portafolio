import React from "react";
import About from "../../components/Portafolio/About";
import BrifCase from "../../components/Incons/BrifCase";
import Experience from "../../components/Portafolio/Experience";
import ExperienceData from "../../Data/Experience.json";
import Header from "../../components/Portafolio/Header";
import "./style.css";
function Portafolio() {
  return (
    <>
      <Header />
      <About />
      <section id="experience" className="w-full mx-auto lg:w-[740px]">
        <h2 className="text-2xl font-semibold mb-5 flex gap-x-2 items-center">
          <BrifCase />
          Experiencia laboral
        </h2>
        <Experience experiences={ExperienceData} />
      </section>
    </>
  );
}

export default Portafolio;
