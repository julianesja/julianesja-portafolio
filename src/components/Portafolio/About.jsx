import React from "react";
import Badge from "./Badge";
import LinkedInIcon from "../Incons/LinkedInIcon";
import SocialPill from "./SocialPill";
import GitHub from "../Incons/GitHub";
import MailIcon from "../Incons/MailIcon";

const About = () => {
  return (
    <section id="about" className="w-full mx-auto max-w-3xl pt-24 pb-16 px-6">
      <div className="flex items-center gap-4 mb-6">
        <img
          className="rounded-full w-16 h-16 border-2 border-neutral-200 dark:border-neutral-700 shadow-sm"
          src="https://avatars.githubusercontent.com/u/9330429?v=4"
          alt="julianesja photo"
        />
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.linkedin.com/in/julian-estrada-jaramillo-840a7698/"
          className="hover:scale-105 transition-transform"
        >

        </a>
      </div>

      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-white pb-6">
        Hey, soy Julian Estrada
      </h1>

      <p className="text-lg md:text-xl text-neutral-700 dark:text-neutral-300 leading-relaxed font-normal">
        Soy un apasionado por el desarrollo de software con más de 10 años de
        experiencia. Me encanta aprender cada día y mejorar mis habilidades.
        Amo aprender de los demás y aportar para que los demás se desarrollen
        y crezcan cada día. Durante estos 10 años de experiencia he tenido la
        oportunidad de trabajar con diferentes tecnologías y lenguajes de
        programación como lo son <span className="font-semibold text-neutral-900 dark:text-white">C#, .NET, Python, PHP, Laravel, SQL Server y MySQL</span>.
      </p>

      <div className="flex flex-wrap gap-3 mt-8">
        <SocialPill
          text={"LinkedIn"}
          url={"https://www.linkedin.com/in/julian-estrada-jaramillo-840a7698/"}
        >
          <LinkedInIcon />
        </SocialPill>

        <SocialPill text={"GitHub"} url={"https://github.com/julianesja/"}>
          <GitHub />
        </SocialPill>

        <SocialPill text={"julianesja@gmail.com"} url="mailto:julianesja@gmail.com">
          <MailIcon />
        </SocialPill>
      </div>
    </section>
  );
};

export default About;
