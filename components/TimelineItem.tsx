import { TimelineEntry } from "@/types";

export default function TimelineItem({ entry, index }: { entry: TimelineEntry; index: number }) {
    const isEven = index % 2 === 0;

    return (
        <div className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group w-full`}>
            {/* Center Line Dot */}
            <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-white dark:bg-neutral-900 border-2 border-accent rounded-full z-10 -translate-x-1/2 mt-1.5 shadow-[0_0_0_4px_rgba(var(--background),1)]" />

            {/* Content Card */}
            <div className={`w-full md:w-[45%] pl-12 md:pl-0 ${isEven ? 'md:pl-8' : 'md:pr-8'}`}>
                <div className="p-6 rounded-2xl border border-neutral-200 bg-white dark:bg-neutral-900 dark:border-neutral-800 hover:border-accent/50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                        <span className={`text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded
              ${entry.type === 'project' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' : ''}
              ${entry.type === 'research' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300' : ''}
              ${entry.type === 'experience' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300' : ''}
              ${entry.type === 'event' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300' : ''}
              ${entry.type === 'education' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300' : ''}
              ${entry.type === 'award' ? 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300' : ''}
            `}>
                            {entry.type}
                        </span>
                        <span className="text-xs text-muted-foreground font-mono">
                            {new Date(entry.date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </span>
                    </div>

                    <h3 className="font-bold text-lg mb-1">{entry.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        {entry.description}
                    </p>
                </div>
            </div>
        </div>
    );
}
