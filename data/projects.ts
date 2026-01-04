
import { Project } from "@/types";

export const projects: Project[] = [
    {
        id: "air-quality-estimation",
        title: "PM2.5/PM10 Estimation using Satellite Data",
        tier: "flagship",
        category: "research",
        date: "2025-08-08", // Finalist date roughly
        shortDescription: "Ensemble machine learning framework for pan-India surface-level PM estimation, achieving R² scores of 0.80 for PM2.5 and 0.75 for PM10 using multi-year satellite data (2019-2024).",
        tech: ["Random Forest", "XGBoost", "LightGBM", "GAM"],
        image: "/projects/pm.webp",
        links: { slides: "https://www.canva.com/design/DAGu8hzLS7M/oL72B1kiJ8VX4_jioPG8-A/view?utm_content=DAGu8hzLS7M&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h5264dfd6f7" }, // No specific link provided
        showInTimeline: true,
    },
    {
        id: "news-sure",
        title: "NewsSure",
        tier: "flagship",
        category: "product",
        date: "2024-12-01", // Approx
        shortDescription: "AI-driven, multi-modal misinformation verification platform that combines real-time web scraping, domain credibility analysis, semantic similarity scoring, GenAI detection, and optional expert review to deliver a trust score and final truth verdict for text, images, and links.",
        tech: ["React", "Vite", "Django REST API", "OCR", "Web Scraping", "Stance Detection"],
        image: "/projects/newssure.webp",
        links: { github: "https://github.com/ctrlxharsh/NewsSure", slides: "https://www.canva.com/design/DAG1hBQCUdQ/jLhRkG2ors_WmiblLnepXg/view?utm_content=DAG1hBQCUdQ&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=hf1a14976c0" },
        showInTimeline: true,
    },
    {
        id: "auv-system",
        title: "Autonomous Underwater Vehicle (AUV)",
        tier: "flagship",
        category: "system",
        date: "2024-05-01",
        shortDescription: "Vision-control framework combining real-time object tracking and pose estimation with PID-based control on Jetson Xavier.",
        tech: ["OpenCV", "ROS", "Jetson Xavier", "PID", "SLAM"],
        image: "/projects/sea5.webp",
        links: {},
        showInTimeline: true,
    },
    {
        id: "twitter-bot",
        title: "Twitter AI Bot",
        tier: "experiment",
        category: "fun",
        date: "2024-08-15",
        shortDescription: "A Python script using Tweepy and OpenAI API to automatically reply to tech trends with sarcastic commentary.",
        tech: ["Python", "Tweepy", "OpenAI API"],
        links: { github: "https://github.com/ctrlxharsh/twitter-bot" },
        showInTimeline: false,
    },
    {
        id: "spotify-visualizer",
        title: "Spotify Visualizer",
        tier: "experiment",
        category: "fun",
        date: "2024-03-20",
        shortDescription: "Real-time audio visualizer in the browser using Web Audio API and Canvas.",
        tech: ["JavaScript", "HTML5 Canvas", "Web Audio API"],
        links: { demo: "#" },
        showInTimeline: false,
    },
    {
        id: "cli-todo",
        title: "Rust CLI Todo",
        tier: "experiment",
        category: "tool",
        date: "2024-01-10",
        shortDescription: "Blazing fast terminal-based todo list manager written to learn Rust ownership concepts.",
        tech: ["Rust", "Clap"],
        links: { github: "#" },
        showInTimeline: false,
    }
];
