export type ProjectCategory = "research" | "system" | "fun" | "tool" | "product";
export type ProjectTier = "flagship" | "experiment";

export interface Project {
    id: string;
    title: string;
    tier: ProjectTier;
    category: ProjectCategory;
    date: string; // ISO string YYYY-MM-DD
    shortDescription: string;
    fullDescription?: string;
    tech: string[];
    image?: string; // Path to image in public
    links: {
        github?: string;
        demo?: string;
        paper?: string;
        slides?: string;
    };
    showInTimeline: boolean;
    researchOutput?: string; // ID of related research
}

export type ResearchType = "paper" | "workshop" | "conference-presentation" | "conference" | "ongoing";

export interface Research {
    id: string;
    title: string;
    type: ResearchType;
    venue: string;
    year: number;
    date?: string; // ISO string YYYY-MM-DD for sorting/display
    shortContribution: string;
    relatedProjectId?: string;
    links: {
        pdf?: string;
        openReview?: string;
        slides?: string;
    };
}

export interface TimelineEntry {
    id: string;
    date: string;
    title: string;
    type: "project" | "research" | "event" | "experience" | "manual" | "education" | "award";
    description: string;
    relatedId?: string; // Link to the original item
    image?: string;
}
