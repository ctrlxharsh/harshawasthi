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
            openReview: "https://openreview.net",
        },
    },
    {
        id: "air-quality-iisc-2025",
        title: "AI-Based Surface PM Estimation",
        type: "conference",
        venue: "IISc Geospatial Hackathon 2025",
        year: 2025,
        date: "2025-01-20",
        shortContribution: "Developed ensemble ML models (Random Forest, XGBoost, LightGBM, GAM) for pan-India PM2.5/PM10 estimation using satellite and meteorological data. Achieved 75% R² accuracy.",
        links: {},
    },
    {
        id: "landslide-detection-2025",
        title: "Deep Learning for Landslide Detection",
        type: "ongoing",
        venue: "IIT (BHU) Varanasi",
        year: 2025,
        date: "2025-05-01",
        shortContribution: "Researching YOLO and U-Net architectures for automated landslide detection using remote sensing imagery. Optimizing storage with PCA-based compression.",
        links: {},
    },
];
