"use client";

import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNodeJs,
  FaBootstrap,
  FaPhp,
  FaGitAlt,
  FaLinux,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiMongodb,
  SiPostgresql,
  SiMysql,
  SiPostman,
  SiExpress,
  SiMongoose,
  SiJsonwebtokens,
  SiSass,
  SiRedux,
  SiTypescript,
  SiTailwindcss,
  SiFirebase,
  SiDocker,
} from "react-icons/si";

const skills = [
  { name: "HTML", icon: FaHtml5 },
  { name: "CSS", icon: FaCss3Alt },
  { name: "JavaScript", icon: FaJs },
  { name: "TypeScript", icon: SiTypescript },
  { name: "React", icon: FaReact },
  { name: "Next.js", icon: SiNextdotjs },
  { name: "Redux", icon: SiRedux },
  { name: "Tailwind CSS", icon: SiTailwindcss },
  { name: "Node.js", icon: FaNodeJs },
  { name: "Express", icon: SiExpress },
  { name: "MongoDB", icon: SiMongodb },
  { name: "PostgreSQL", icon: SiPostgresql },
  { name: "MySQL", icon: SiMysql },
  { name: "Mongoose", icon: SiMongoose },
  { name: "JWT", icon: SiJsonwebtokens },
  { name: "PHP", icon: FaPhp },
  { name: "Bootstrap", icon: FaBootstrap },
  { name: "SCSS", icon: SiSass },
  { name: "Postman", icon: SiPostman },
  { name: "Firebase", icon: SiFirebase },
  { name: "Docker", icon: SiDocker },
  { name: "Git", icon: FaGitAlt },
  { name: "Linux", icon: FaLinux },
];

const MySkill = () => {
  return (
    <section className="container py-16 text-center">
      <h2 className="text-3xl font-bold mb-10">My Skills</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 justify-center items-center">
        {skills.map((skill, index) => {
          const Icon = skill.icon;
          return (
            <div
              key={index}
              className="bg-white/5 hover:bg-white/10 transition rounded-xl p-4 flex flex-col items-center gap-2 backdrop-blur-sm border border-white/10 shadow"
            >
              <Icon className="text-4xl text-primary" />
              <p className="text-sm">{skill.name}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default MySkill;
