import { motion } from "framer-motion";
import { skills } from "../data/portfolioData";
import Reveal from "./Reveal";

function SkillsSection() {
  return (
    <section id="skills" className="px-6 py-32 sm:px-10 lg:px-20 max-w-7xl mx-auto">
      <div className="space-y-12">
        <Reveal>
          <p className="text-xs tracking-[0.3em] text-[#a0a0a0] uppercase font-medium">
            Skills & Tools
          </p>
          <h2 className="mt-4 text-4xl md:text-5xl font-semibold text-white leading-tight max-w-3xl">
            Technologies I work with
          </h2>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="flex flex-wrap gap-3">
            {skills.map((skill, index) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.02, duration: 0.3 }}
                className="px-5 py-3 text-sm text-[#d0d0d0] bg-[#151515] border border-[#252525] rounded-full font-medium"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default SkillsSection;
