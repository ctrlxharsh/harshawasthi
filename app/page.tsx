import Link from "next/link";
import Hero from "@/components/Hero";
import { projects } from "@/data/projects";
import { research } from "@/data/research";
import { experience } from "@/data/experience";
import { achievements } from "@/data/achievements";
import ProjectCard from "@/components/ProjectCard";
import Skills from "@/components/Skills";

export default function Home() {
  // Get top items for each section
  const featuredProjects = projects.filter(p => p.tier === "flagship").slice(0, 2);
  const latestResearch = research.slice(0, 2);
  const latestExperience = experience.sort((a, b) =>
    new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  ).slice(0, 2);
  const latestAchievements = achievements.slice(0, 2);

  return (
    <>
      <Hero />

      {/* Featured Projects */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-outfit text-2xl font-bold tracking-tight text-foreground">
            Featured Projects
          </h2>
          <Link href="/projects" className="text-sm font-medium text-accent hover:underline">
            View All →
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} variant="compact" />
          ))}
        </div>
      </section>

      {/* Research Preview */}
      <section className="py-16 px-6 max-w-5xl mx-auto border-t border-neutral-200 dark:border-neutral-800">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-outfit text-2xl font-bold tracking-tight text-foreground">
            Research & Publications
          </h2>
          <Link href="/research" className="text-sm font-medium text-accent hover:underline">
            View All →
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {latestResearch.map((item) => (
            <div key={item.id} className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:border-accent/50 transition-all flex flex-col">
              <div className="flex items-start justify-between gap-4 mb-2">
                <span className="text-xs font-medium text-accent uppercase shrink-0 bg-accent/10 px-2 py-1 rounded">{item.type}</span>
                <span className="text-xs text-muted-foreground">
                  {item.date
                    ? new Date(item.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
                    : item.year}
                </span>
              </div>
              <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2 flex-grow">{item.shortContribution}</p>
              <p className="text-xs text-accent mt-3">{item.venue}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Experience Preview */}
      <section className="py-16 px-6 max-w-5xl mx-auto border-t border-neutral-200 dark:border-neutral-800">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-outfit text-2xl font-bold tracking-tight text-foreground">
            Experience
          </h2>
          <Link href="/experience" className="text-sm font-medium text-accent hover:underline">
            View All →
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {latestExperience.map((item) => (
            <div key={item.id} className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:border-accent/50 transition-all flex flex-col">
              <div className="flex items-start justify-between gap-4 mb-2">
                <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded
                  ${item.type === 'remote' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300' : ''}
                  ${item.type === 'internship' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300' : ''}
                  ${item.type === 'leadership' ? 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300' : ''}
                `}>
                  {item.type.replace('-', ' ')}
                </span>
                <span className="text-xs text-muted-foreground">{item.period}</span>
              </div>
              <h3 className="font-bold text-foreground mb-1">{item.role}</h3>
              <p className="text-sm text-accent font-medium mb-2">{item.company}</p>
              <p className="text-sm text-muted-foreground line-clamp-2 flex-grow">{item.description[0]}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Achievements Preview */}
      <section className="py-16 px-6 max-w-5xl mx-auto border-t border-neutral-200 dark:border-neutral-800">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-outfit text-2xl font-bold tracking-tight text-foreground">
            Achievements
          </h2>
          <Link href="/achievements" className="text-sm font-medium text-accent hover:underline">
            View All →
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {latestAchievements.map((item) => (
            <div key={item.id} className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:border-accent/50 transition-all flex flex-col">
              <div className="flex items-start justify-between gap-4 mb-2">
                <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded
                  ${item.type === 'award' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300' : ''}
                  ${item.type === 'competition' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' : ''}
                `}>
                  {item.type}
                </span>
                <span className="text-xs text-muted-foreground">
                  {new Date(item.date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                </span>
              </div>
              <h3 className="font-bold text-foreground mb-1">{item.title}</h3>
              <p className="text-sm text-accent font-medium mb-2">{item.event}</p>
              <p className="text-sm text-muted-foreground line-clamp-2 flex-grow">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <Skills />
    </>
  );
}
