import { Research } from "@/types";

export const research: Research[] = [
    {
        id: "lagps-neurips-2025",
        title: "From Rules to Pixels (LaGPS)",
        type: "workshop",
        venue: "NeurIPS 2025 Workshop (MuSLM)",
        year: 2025,
        date: "2025-12-01",
        shortContribution: "Neuro-symbolic framework combining LLM-based rule interpretation with visual primitives for human-centric rule violation segmentation. Introduced HRS benchmark (1100 images) and achieved +19.4% mIoU over CLIPSeg.",
        links: {
            openReview: "https://openreview.net/forum?id=fSND55MrbT",
        },
    },
    {
        id: "auv-ieee-delcon-2025",
        title: "4-DOF Autonomous Underwater Vehicle with Vision-Based Navigation",
        type: "conference",
        venue: "IEEE DELCON 2025, Jamia Millia Islamia (JMI)",
        year: 2025,
        date: "2025-02-01",
        shortContribution: "Presented a 4-DOF Autonomous Underwater Vehicle (AUV) powered by LiPo batteries and Blue Robotics T200 thrusters. Developed and integrated computer vision algorithms for detecting, discovering, and maneuvering through marine environments and ocean life, enabling autonomous navigation and perception-driven control.",
        links: {},
    },
    {
        id: "animal-3d-reconstruction-2025",
        title: "SMAL-Based 3D Animal Reconstruction from Single Images",
        type: "ongoing",
        venue: "IIT (BHU) Varanasi",
        year: 2026,
        date: "2026-01-01",
        shortContribution: "Optimizing high-resolution imagery storage and preprocessing using PCA-based compression. Developing an image-to-3D pipeline that generates SMAL-based 3D animal models from single images using ViT features and pose/shape regression. Integrating an SD-Fit–based loss framework with 2D–3D feature matching to refine 3D pose, shape, and camera parameters for accurate animal reconstruction.",
        links: {},
    },


];
