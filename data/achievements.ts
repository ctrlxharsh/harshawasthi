export interface Achievement {
    id: string;
    title: string;
    event: string;
    date: string;
    description: string;
    type: "award" | "competition" | "certification" | "recognition";
}

export const achievements: Achievement[] = [
    {
        id: "isro-pm-estimation",
        title: "National Finalist",
        event: "ISRO Bharatiya Antariksh Hackathon 2025",
        date: "2025-08-01",
        description: "Selected among top 2 National Finalist teams for ISRO Bharatiya Antariksh Hackathon 2025 for AI-based Air Quality Estimation project among 10,000+ teams.",
        type: "competition",
    },
    {
        id: "sauvc-top-100",
        title: "Global Participant",
        event: "Singapore Autonomous Underwater Vehicle Competition (SAUVC)",
        date: "2025-03-10",
        description: "Selected among the top teams globally for SAUVC 2025 & 2026, qualifying to present and maneuver our AUV through mission-specific underwater tasks.",
        type: "competition",
    },
    {
        id: "amulate-hackathon-2nd",
        title: "2nd Position",
        event: "Amulate Hackathon, BMW Group @ AMU",
        date: "2025-12-29",
        description: "Secured 2nd position for 'Agenda AI', a personalized agentic AI system that manages daily activities including email automation, GitHub workflows, and Google Workspace integration.",
        type: "award",
    },
    {
        id: "ignite-hackathon-winner",
        title: "Winner",
        event: "Ignite Hackathon, Codechef X Starlab",
        date: "2025-10-10",
        description: "Developed 'NewsSure', an AI agent that searches for and verifies the credibility of news articles to combat misinformation.",
        type: "competition",
    },
    {
        id: "iitm-techsym-awards",
        title: "Best Innovation & Best Teamwork",
        event: "IITM Techsym 2025",
        date: "2025-03-15",
        description: "Won the Best Innovation Award for our Autonomous Underwater Vehicle (AUV) and the Best Teamwork Award at IITM Techsym.",
        type: "award",
    },
    {
        id: "amu-rovc-3-2nd",
        title: "2nd Position",
        event: "AMU ROVC 3.0",
        date: "2024-11-20",
        description: "Secured 2nd position for developing a custom-made 4DOF underwater Remotely Operated Vehicle (ROV) constructed using cost effective recyclable materials.",
        type: "award",
    },
];
