import React from "react";
import Badge from "./Badge";
import LinkedInIcon from "../Incons/LinkedInIcon";
import SocialPill from "./SocialPill";
import GitHub from "../Incons/GitHub";
import MailIcon from "../Incons/MailIcon";
import Experience from "./Experience";
import BrifCase from "../Incons/BrifCase";
import ExperienceData from "../../Data/Experience.json";
import ProjectData from "../../Data/Projects.json";
import Projects from "./Proyects";
import CodeIcon from "../Incons/CodeIcon";

const About = () => {
  return (
    <>
      <section id="about" className="w-full mx-auto lg:w-[740px] py-44 pb-20">
        <img
          className="rounded-full w-12 h-12 mb-4"
          src="https://avatars.githubusercontent.com/u/9330429?v=4"
          alt="julianesja photo"
        />
        <h1 className="text-5xl font-bold flex flex-row gap-x-4 pb-10">
          Hey, soy Julian Estrada
          <div className="flex justify-center items-center">
            <a
              target="_blank"
              rel="noopner"
              href="https://www.linkedin.com/in/julian-estrada-jaramillo-840a7698/"
            >
              <Badge>Disponible para trabajar</Badge>
            </a>
          </div>
        </h1>
        <h2 className="text-2xl text-wrap">
          Soy un apasionado por el desarrollo de software con mas de 10 años de
          experiencias, me encanta aprender cada día, y mejorar mis habilidades.
          Amo aprender de los demás y aportar para que los demás se desarrollen
          y crezcan cada día. Durante estos 10 años de experiencia he tenido la
          oportunidad de trabajar con diferentes tecnologías y lenguajes de
          programación como lo son C#, .net, Python, PHP, Laravel, SQL server,
          My SQL.
        </h2>
        <div className="flex gap-x-4 mt-4">
          <SocialPill
            text={"LinkedIn"}
            url={
              "https://www.linkedin.com/in/julian-estrada-jaramillo-840a7698/"
            }
          >
            <LinkedInIcon />
          </SocialPill>

          <SocialPill text={"github"} url={"https://github.com/julianesja/"}>
            <GitHub />
          </SocialPill>

          <SocialPill text={"julianesja@gmail.com"}>
            <MailIcon />
          </SocialPill>
        </div>
      </section>
      <section id="experience" className="w-full mx-auto lg:w-[740px]">
        <h2 className="text-2xl font-semibold mb-5 flex gap-x-2 items-center">
          <BrifCase />
          Experiencia laboral
        </h2>
        <Experience experiences={ExperienceData} />
      </section>
     
    </>
  );
};

export default About;
