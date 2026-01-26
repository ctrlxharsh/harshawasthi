import Link from "next/link";

export default function AboutSection() {
    return (
        <section className="py-12 px-6 max-w-5xl mx-auto">
            <div className="grid md:grid-cols-3 gap-12 items-start">
                <div className="md:col-span-2 space-y-6">
                    <h2 className="font-outfit text-2xl font-bold tracking-tight text-foreground">
                        Beyond the Code
                    </h2>
                    <div className="prose prose-neutral dark:prose-invert max-w-none text-muted-foreground">
                        <p>
                            I am a passionate researcher and engineer driven by the potential of Artificial Intelligence to solve real-world problems.
                            My journey began with a curiosity about how machines learn, which has evolved into a dedicated pursuit of advancing
                            <strong> Computer Vision</strong> and <strong>Agentic Systems</strong>.
                        </p>
                        <p>
                            Currently, I'm focused on optimizing Large Language Models for edge devices, making powerful AI accessible and efficient.
                            When I'm not training models or reading papers, I'm likely building open-source tools, mentoring aspiring developers,
                            or exploring the latest in tech at a hackathon.
                        </p>
                    </div>
                </div>

                <div className="bg-neutral-50 dark:bg-neutral-900 rounded-2xl p-6 border border-neutral-200 dark:border-neutral-800">
                    <h3 className="font-bold text-foreground mb-4">Quick Stats</h3>
                    <ul className="space-y-4">
                        <li className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Focus</span>
                            <span className="text-sm font-medium text-accent">AI & Robotics</span>
                        </li>
                        <li className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Experience</span>
                            <span className="text-sm font-medium text-foreground">2+ Years</span>
                        </li>
                        <li className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Location</span>
                            <span className="text-sm font-medium text-foreground">India</span>
                        </li>
                        <li className="pt-4 border-t border-neutral-200 dark:border-neutral-700">
                            <Link href="/journey" className="text-sm font-medium text-accent hover:underline flex items-center gap-1">
                                View My Journey
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                    <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                                </svg>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
}
