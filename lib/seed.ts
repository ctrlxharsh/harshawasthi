import type { PortableTextBlock } from "next-sanity";
import type { CaseStudy, Portfolio, TimelineEntry } from "./types";

function article(sections: [string, string][]): PortableTextBlock[] {
  return sections.flatMap(([heading, text], index) => [
    {
      _type: "block",
      _key: `heading-${index}`,
      style: "h2",
      markDefs: [],
      children: [{ _type: "span", _key: "text", text: heading, marks: [] }],
    },
    {
      _type: "block",
      _key: `paragraph-${index}`,
      style: "normal",
      markDefs: [],
      children: [{ _type: "span", _key: "text", text, marks: [] }],
    },
  ]);
}

const projects: CaseStudy[] = [
  {
    _id: "project-driveo",
    slug: "driveo",
    title: "Driveo",
    category: "Agentic AI",
    date: "2026",
    summary:
      "An autonomous agent for vehicle research and purchasing workflows.",
    featuredOnHome: true,
    featuredOrder: 1,
    order: 1,
    accent: "blue",
    technology: ["CopilotKit", "Google A2UI", "MCP", "SQLite", "Langfuse"],
    body: article([
      [
        "The idea",
        "Driveo explores how an AI agent can assist with vehicle research and purchasing workflows using a mock dealership and payment gateway.",
      ],
      [
        "How it works",
        "An ETL pipeline cleans and stores specifications for more than 3,300 car models in SQLite. An LLM gateway supports OpenAI, Anthropic, Gemini and Groq.",
      ],
      [
        "My contribution",
        "I built the agent workflow and data pipeline, added role-based access control and input/output guardrails, and integrated tracing and human confirmation for orders.",
      ],
    ]),
  },
  {
    _id: "project-air-quality",
    slug: "air-quality-estimation",
    title: "Air quality from satellite imagery",
    category: "Applied machine learning",
    date: "2025",
    summary:
      "Estimating surface-level air pollution across India by bringing satellite and environmental data together.",
    featuredOnHome: true,
    featuredOrder: 2,
    order: 2,
    accent: "sky",
    technology: ["Random Forest", "XGBoost", "LightGBM", "Optuna", "SHAP"],
    proofLinks: [
      {
        label: "Presentation",
        url: "https://www.canva.com/design/DAGu8hzLS7M/oL72B1kiJ8VX4_jioPG8-A/view?utm_content=DAGu8hzLS7M&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h5264dfd6f7",
      },
    ],
    body: article([
      [
        "The problem",
        "Ground-level air quality is shaped by environmental conditions that vary across regions and time. This project explored an approach to estimating PM2.5 and PM10 across India.",
      ],
      [
        "Approach",
        "I fused satellite, meteorological, land-use and demographic data and evaluated ensemble approaches including Random Forest, XGBoost, LightGBM and generalized additive models.",
      ],
      [
        "Results",
        "The PM2.5 estimation model achieved an R² of 0.80. Optuna, SHAP and permutation feature selection supported model development and interpretation.",
      ],
    ]),
  },
  {
    _id: "project-newssure",
    slug: "newssure",
    title: "NewsSure",
    category: "Multimodal AI",
    date: "2025",
    summary:
      "A multimodal pipeline for examining the credibility of news in text and images.",
    featuredOnHome: true,
    featuredOrder: 3,
    order: 3,
    accent: "ink",
    technology: ["OCR", "Web search", "Stance detection", "React", "Django"],
    proofLinks: [
      { label: "GitHub", url: "https://github.com/ctrlxharsh/NewsSure" },
      {
        label: "Presentation",
        url: "https://www.canva.com/design/DAG1hBQCUdQ/jLhRkG2ors_WmiblLnepXg/view?utm_content=DAG1hBQCUdQ&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=hf1a14976c0",
      },
    ],
    body: article([
      [
        "The problem",
        "Online claims can spread faster than readers can assess their sources. NewsSure examines text and images to support news verification.",
      ],
      [
        "Approach",
        "I built a pipeline combining OCR, web search, semantic similarity and stance detection. Source credibility weighting and AI-generated image detection contribute to its final verdict.",
      ],
      [
        "Recognition",
        "NewsSure received first place at the Starlabs Ignite Hackathon in 2025.",
      ],
    ]),
  },
  {
    _id: "project-agenda",
    slug: "agenda-ai",
    title: "Agenda AI",
    category: "Agentic AI",
    date: "2025",
    summary:
      "A natural-language productivity assistant that plans tasks across tools and services.",
    featuredOnHome: true,
    featuredOrder: 4,
    order: 4,
    accent: "lavender",
    technology: ["LangGraph", "MCP", "OAuth 2.0", "Langfuse"],
    proofLinks: [
      { label: "GitHub", url: "https://github.com/ctrlxharsh/agenda" },
      { label: "Demo video", url: "https://youtu.be/uraJtd_OI_o" },
    ],
    body: article([
      [
        "The idea",
        "Agenda AI uses natural language to help plan tasks and coordinate work across Google Workspace and GitHub.",
      ],
      [
        "Implementation",
        "I built the assistant with LangGraph and Model Context Protocol, integrating OAuth 2.0 for connected services and Langfuse for tracing.",
      ],
    ]),
  },
  {
    _id: "project-auv",
    slug: "auv-perception-control",
    title: "AUV perception & control",
    category: "Robotics",
    date: "2024–2025",
    summary:
      "Perception, localization and control modules for an autonomous underwater vehicle.",
    order: 5,
    accent: "deep",
    technology: ["SuperPoint", "LightGlue", "PnP", "SLAM", "PID", "Jetson"],
    proofLinks: [
      {
        label: "IIT Madras symposium repository",
        url: "https://github.com/ctrlxharsh/IITM_techsym",
      },
      {
        label: "Pose estimation repository",
        url: "https://github.com/ctrlxharsh/pnp",
      },
      {
        label: "Object tracker repository",
        url: "https://github.com/ctrlxharsh/object_tracker",
      },
    ],
    body: article([
      [
        "The challenge",
        "Underwater vehicles need to perceive their surroundings and control motion in a difficult environment.",
      ],
      [
        "My contribution",
        "I architected software modules for visual localization using SuperPoint, LightGlue and PnP, alongside SLAM and PID depth control on Raspberry Pi and Jetson hardware.",
      ],
      ["Presentation", "The work was presented at IEEE DELCON 2025."],
    ]),
  },
  {
    _id: "project-asv",
    slug: "asv-navigation",
    title: "ASV navigation stack",
    category: "Robotics",
    date: "2026",
    summary:
      "A ground station and waypoint navigation stack for an autonomous surface vehicle.",
    order: 6,
    accent: "blue",
    technology: ["Python", "PyGame", "TCP/UDP", "PID", "Jetson"],
    body: article([
      [
        "Approach",
        "I implemented a PyGame ground station control layer and a TCP/UDP communication pipeline.",
      ],
      [
        "Navigation",
        "The vehicle used carrot-following waypoint navigation with tuned PID loops for path tracking on Jetson platforms.",
      ],
    ]),
  },
];

const publications: CaseStudy[] = [
  {
    _id: "publication-lagps",
    slug: "lagps",
    title: "From Rules to Pixels",
    category: "Research paper",
    date: "2025",
    venue: "MusIML Workshop, NeurIPS 2025",
    authors: "Mohd Hozaifa Khan, Harsh Awasthi, Pragati Jain, Mohammad Ammar",
    summary:
      "A decoupled framework for segmenting human-centric rule violations.",
    order: 1,
    accent: "blue",
    technology: ["Computer vision", "Neuro-symbolic AI", "Segmentation"],
    proofLinks: [
      {
        label: "Paper on OpenReview",
        url: "https://openreview.net/forum?id=fSND55MrbT",
      },
      {
        label: "Workshop proceedings",
        url: "https://www.musiml.org/events/2025-NeurIPS/accepted_papers.html",
      },
      {
        label: "Slides",
        url: "https://neurips.cc/media/neurips-2025/Slides/132994_ygolkiL.pdf",
      },
    ],
    body: article([
      [
        "Research question",
        "How can long-form human-centric rules be translated into precise visual segmentation?",
      ],
      [
        "Approach",
        "LaGPS combines a semantic interpreter that translates rules into structured programs with a symbolic executor that operates over visual primitives.",
      ],
      [
        "My contribution",
        "I designed and implemented the LaGPS pipeline under first-author guidance and curated, manually annotated and validated 1,100 images using CVAT.",
      ],
      [
        "Results",
        "The method achieved a 19.4 percentage-point improvement in mIoU over CLIPSeg on the Human-Centric Rule-violation Segmentation benchmark.",
      ],
    ]),
  },
  {
    _id: "publication-cytology",
    slug: "cervical-cytology",
    title: "Hybrid CNN–Transformer for cervical cytology",
    category: "Research paper",
    date: "2026",
    venue: "IEEE DELCON 2026",
    authors: "Ali, Siddiqui, Harsh Awasthi, Fatima",
    summary:
      "Feature-level fusion for automated classification of cervical cells.",
    order: 2,
    accent: "sky",
    technology: ["CNN", "Vision Transformer", "Grad-CAM"],
    body: article([
      [
        "Approach",
        "The paper presents a hybrid CNN–Vision Transformer model combining features from four backbones with an MLP classifier and Grad-CAM for interpretability.",
      ],
      [
        "Results",
        "The paper reports 99.34% accuracy and 99.23% F1-score on the SIPaKMeD dataset.",
      ],
    ]),
  },
  {
    _id: "publication-auv",
    slug: "auv-vision-navigation",
    title: "Vision-based navigation for an underwater vehicle",
    category: "Presentation",
    date: "2025",
    venue: "IEEE DELCON 2025",
    summary:
      "A four-degree-of-freedom autonomous underwater vehicle with perception-driven navigation.",
    order: 3,
    accent: "deep",
    technology: ["Computer vision", "Robotics", "Navigation"],
    body: article([
      [
        "The work",
        "A four-degree-of-freedom autonomous underwater vehicle integrating computer vision and control for perception-driven navigation.",
      ],
      [
        "My contribution",
        "I developed and integrated computer-vision algorithms for detecting and navigating through marine environments. The findings were presented at IEEE DELCON 2025.",
      ],
    ]),
  },
];

const entry = (
  id: string,
  title: string,
  organization: string,
  date: string,
  description: string,
  order: number,
): TimelineEntry => ({
  _id: id,
  title,
  organization,
  date,
  description,
  order,
});

export const seed: Portfolio = {
  settings: {
    heroPrimaryAction: "Explore my work",
    heroSecondaryAction: "A little about me",
    contactAction: "Say hello",
    archiveExpandAction: "Explore all projects",
    archiveCollapseAction: "Show less",
    educationLabel: "Education",
    awardsLabel: "Awards & service",
    researchLabel: "Research & publications",
    projectsLabel: "Projects",
    experienceLabel: "Experience & leadership",
    aboutLabel: "About me",
    contactLabel: "Get in touch",
    selectedLabel: "Selected projects",
    archiveLabel: "The project archive",
    archiveTitle: "More things I’ve made.",
    experienceIntro:
      "Work shaped by collaboration, curiosity, and a willingness to take ideas into the real world.",
    awardsIntro: "A few milestones from learning and building with others.",
    aboutTitle: "Curious by nature.",
    eyebrow: "RESEARCH · ENGINEERING · ROBOTICS",
    headline: "Building intelligence that understands the world.",
    intro:
      "I’m Harsh, a computer engineering student exploring the intersection of machine learning, computer vision and autonomous systems.",
    availability: "Open to research collaborations",
    researchTitle: "Questions worth exploring.",
    researchIntro:
      "Research at the intersection of perception, learning and the physical world.",
    projectsTitle: "Ideas, made tangible.",
    projectsIntro:
      "A selection of systems I’ve built, from intelligent agents to autonomous vehicles.",
    experienceTitle: "Learning by building.",
    educationTitle: "A foundation in curiosity.",
    awardsTitle: "Recognition along the way.",
    contactTitle: "Let’s start a conversation.",
    contactIntro:
      "Interested in research, collaboration, or a thoughtful conversation about AI? I’d love to hear from you.",
  },
  profile: {
    name: "Harsh Awasthi",
    email: "harsh.awasthik@gmail.com",
    biography:
      "I’m a Computer Engineering student at Aligarh Muslim University interested in intelligent systems that bridge research and practical engineering. My work spans agentic AI, computer vision and autonomous robotics.",
    socialLinks: [
      { label: "GitHub", url: "https://github.com/ctrlxharsh" },
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/harsh-awasthi-746b64277/",
      },
      { label: "X", url: "https://x.com/HarshAwasthik" },
    ],
  },
  projects,
  publications,
  experience: [
    entry(
      "experience-bmw",
      "Incoming AI Engineer Intern",
      "BMW Group · Munich, Germany",
      "Expected 2027",
      "",
      1,
    ),
    entry(
      "experience-andromeida",
      "Technical Intern",
      "Andromeida Maritime Solutions",
      "Jun–Dec 2026",
      "Built a modular AUV/ASV mission planner and developed a coral analysis pipeline using YOLO, SAM 2 and vision transformers. Engineered a Tauri application for local inference.",
      2,
    ),
    entry(
      "experience-sourceworx",
      "AI Engineer Intern",
      "SourceworxAI",
      "Nov 2025–Jul 2026",
      "Built agentic systems for operational automation and an on-premise document intelligence pipeline using vLLM, GLM-OCR and Gemma.",
      3,
    ),
    entry(
      "experience-iitbhu",
      "Research Intern",
      "Indian Institute of Technology (BHU)",
      "Dec 2025–Jan 2026",
      "Accelerated remote-sensing preprocessing with PCA and evaluated an existing single-image 3D animal reconstruction approach.",
      4,
    ),
    entry(
      "experience-auvlead",
      "Computer Team Lead",
      "AUV-ZHCET Club, Aligarh Muslim University",
      "May 2024–May 2026",
      "Directed 20+ student engineers across perception, navigation and embedded control for autonomous marine vehicles.",
      5,
    ),
  ],
  education: [
    entry(
      "education-amu",
      "B.Tech in Computer Engineering",
      "Aligarh Muslim University",
      "2023–2027",
      "Cumulative GPA 8.93 / 10.0",
      1,
    ),
  ],
  awards: [
    entry(
      "award-isro",
      "National Finalist",
      "Bharatiya Antariksh Hackathon · ISRO",
      "2025",
      "Top 28 teams nationally from more than 1,000 applicants.",
      1,
    ),
    entry(
      "award-ssgsa",
      "SSGSA Scholar",
      "Scholarship and mentorship",
      "2026",
      "Recognized for academic and research excellence.",
      2,
    ),
    entry(
      "award-amulate",
      "1st & 2nd Place",
      "AMULATE · BMW Group",
      "2026 & 2025",
      "Recognized for autonomous AI assistants and car recommendation workflows.",
      3,
    ),
    entry(
      "award-ignite",
      "1st Place",
      "Ignite Hackathon · Starlabs",
      "2025",
      "Recognized for NewsSure.",
      4,
    ),
    entry(
      "award-innovation",
      "Best Innovation Award",
      "MTS Tech Symposium · IIT Madras",
      "2025",
      "Recognized for an autonomous underwater vehicle design.",
      5,
    ),
    entry(
      "award-sauvc",
      "Internationally shortlisted",
      "Singapore AUV Challenge",
      "2025 & 2026",
      "Shortlisted among international university teams.",
      6,
    ),
    entry(
      "award-rov",
      "2nd Place",
      "AMU Underwater ROV Challenge",
      "2024",
      "Engineered PID control systems for a four-degree-of-freedom underwater remotely operated vehicle.",
      7,
    ),
    entry(
      "service-workshop",
      "Robotics workshops",
      "Glocal University & Aligarh Muslim University",
      "2025",
      "Led and organized hands-on robotic car workshops for students.",
      8,
    ),
    entry(
      "service-mentor",
      "Mentor",
      "AUV-ZHCET Club",
      "2023",
      "Mentored students on robotics, AI and software engineering projects.",
      9,
    ),
  ],
  skills: [
    entry(
      "skill-ai",
      "AI & machine learning",
      "",
      "",
      "PyTorch · TensorFlow · LangGraph · RAG · OpenCV · Vision Transformers",
      1,
    ),
    entry(
      "skill-robotics",
      "Robotics & systems",
      "",
      "",
      "Jetson · TCP/UDP · WebRTC · Docker · Linux",
      2,
    ),
    entry(
      "skill-programming",
      "Programming & web",
      "",
      "",
      "Python · C/C++ · SQL · React · Next.js · FastAPI",
      3,
    ),
  ],
};
