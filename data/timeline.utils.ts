import { TimelineEntry } from "@/types";
import { projects } from "./projects";
import { research } from "./research";
import { experience } from "./experience";
import { achievements } from "./achievements";
import { activities } from "./activities";

import { manualTimeline } from "./timeline.manual";

export function getTimeline(): TimelineEntry[] {
    const timeline: TimelineEntry[] = [];

    // 1. Add Projects
    projects.forEach((project) => {
        if (project.showInTimeline) {
            timeline.push({
                id: `proj-${project.id}`,
                date: project.date,
                title: project.title,
                type: "project",
                description: project.shortDescription,
                relatedId: project.id,
                image: project.image,
            });
        }
    });

    // 2. Add Research
    research.forEach((item) => {
        timeline.push({
            id: `res-${item.id}`,
            date: item.date || `${item.year}-01-01`,
            title: item.title,
            type: "research",
            description: `${item.type === 'paper' ? 'Published' : 'Presented'} at ${item.venue}`,
            relatedId: item.id,
        });
    });

    // 3. Add Experience
    experience.forEach((exp) => {
        timeline.push({
            id: `exp-${exp.id}`,
            date: exp.startDate,
            title: exp.role + " @ " + exp.company,
            type: "experience",
            description: exp.description[0],
            relatedId: exp.id,
        });
    });

    // 4. Add Achievements
    achievements.forEach((ach) => {
        timeline.push({
            id: `ach-${ach.id}`,
            date: ach.date,
            title: ach.title + ": " + ach.event,
            type: "achievement",
            description: ach.description,
            relatedId: ach.id,
        });
    });

    // 5. Add Activities
    activities.forEach((act) => {
        timeline.push({
            id: `act-${act.id}`,
            date: act.date,
            title: act.title + " (" + act.role + ")",
            type: "activity",
            description: act.description,
            relatedId: act.id,
            image: act.images?.[0]
        });
    });


    // 6. Add Manual Entries
    timeline.push(...manualTimeline);


    // 6. Sort by Date DESC
    return timeline.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
