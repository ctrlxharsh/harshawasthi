export interface Activity {
    id: string;
    title: string;
    role: string;
    description: string;
    date: string;
    type: "Community" | "Volunteering" | "Workshop" | "Open Source" | "Other";
    link?: string;
    images?: string[];
}

export const activities: Activity[] = [
    {
        id: "robotic-car-workshop-glocal",
        title: "Robotic Car Workshop",
        role: "Lead Instructor",
        description: "Conducted a hands-on robotic car workshop at Glocal University, Saharanpur, guiding 100+ students through building and programming hardware.",
        date: "2025-05-01",
        type: "Workshop",
    },
    {
        id: "robotic-car-workshop-amu",
        title: "Robotic Car Workshop",
        role: "Organizer",
        description: "Organized a large-scale robotic car workshop at Aligarh Muslim University as part of the AUV Club, providing hands-on training to 180+ students.",
        date: "2025-08-24",
        type: "Workshop",
    },
    {
        id: "robotic-hand-workshop",
        title: "Kinematics & Robotic Hand Workshop",
        role: "Lead Instructor",
        description: "Led a technical workshop on kinematics and hands-on assembly of robotic hands for a group of 75+ students.",
        date: "2025-10-03",
        type: "Workshop",
    },
    {
        id: "intro-ai-lecture-glocal",
        title: "Introduction to AI Lecture",
        role: "Speaker",
        description: "Delivered an introductory lecture on Artificial Intelligence at Glocal University, Saharanpur, discussing the fundamentals and future of AI technology.",
        date: "2025-05-01",
        type: "Workshop",
    },
    {
        id: "auv-club-mentor",
        title: "AUV Club, ZHCET, AMU",
        role: "Mentor",
        description: "Mentoring 100+ students in robotics, AI, and software engineering. Assisted students with projects like AUV pose estimation, underwater gate detection, and state estimation.",
        date: "2023-12-01",
        type: "Community",
    },
];
