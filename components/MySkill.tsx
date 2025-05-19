"use client";

import { useEffect, useState } from "react";

interface Skill {
  name: string;
  image: string;
}

const MySkill = () => {
  const [skills, setSkills] = useState<Skill[]>([]);

  useEffect(() => {
    const fetchSkills = async () => {
      const res = await fetch("http://localhost:8000/skills");
      const data: Skill[] = await res.json();
      setSkills(data);
    };

    fetchSkills();
  }, []);

  return (
    <section className="container py-16 text-center">
      <h2 className="text-3xl font-bold mb-10">My Skills</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 justify-center items-center">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="bg-white/5 hover:bg-white/10 transition rounded-xl p-4 flex flex-col items-center gap-2 backdrop-blur-sm border border-white/10 shadow"
          >
            <div className="w-12 h-12 flex items-center justify-center">
              <img
                src={skill.image}
                alt={skill.name}
                className="w-full h-full object-contain"
              />
            </div>
            <p className="text-sm text-center">{skill.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MySkill;
