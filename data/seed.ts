import { projects } from './projects';
import { research } from './research';
import { activities } from './activities';
import { skills } from './skills';
import { manualTimeline } from './timeline.manual';
import type { Entry, Portfolio } from '../lib/content';

const entry = (id: string, title: string, description: string, meta = '', image = '', links: Entry['links'] = [], tags: string[] = []): Entry => ({ id, title, description, meta, image, links, tags });
const projectLinks = (links: typeof projects[number]['links']) => Object.entries(links).flatMap(([key, value]) => (Array.isArray(value) ? value : [value]).filter(Boolean).map((url, i) => ({ label: ({ github: 'GitHub', demo: 'Demo', slides: 'Slides', video: 'Video', paper: 'Paper' } as Record<string, string>)[key] + (Array.isArray(value) && value.length > 1 ? ` ${i + 1}` : ''), url: url as string })));

export const initialContent: Portfolio = {
  profile: {
    name: 'Harsh Awasthi', greeting: "Hello, I'm Harsh", hindi: 'नमस्ते, मैं हर्ष',
    about: 'I’m Harsh Awasthi, a Computer Engineering student at Aligarh Muslim University working across agentic AI, computer vision, and autonomous robotics. I build full-stack AI products and perception and navigation systems, with research experience at IIT (BHU) and engineering work at SourceworxAI and Andromeida Maritime Solutions.\n\nI’m interested in turning ambitious ideas into useful systems — from AI agents that take action to robots that understand and move through the physical world.',
    email: 'harsh.awasthik@gmail.com', resume: 'portfolio/imports/resume.pdf',
    socials: [{ label: 'GitHub', url: 'https://github.com/ctrlxharsh' }, { label: 'LinkedIn', url: 'https://www.linkedin.com/in/harsh-awasthi-746b64277/' }, { label: 'X', url: 'https://x.com/HarshAwasthik' }],
  },
  sections: {
    projects: [
      ...projects.map(p => entry(p.id, p.title === 'AI Personal Productivity Agent' ? 'Agenda AI' : p.title, p.shortDescription, p.category, p.image ? `portfolio/imports/${p.image.split('/').pop()}` : '', projectLinks(p.links), p.tech)),
      entry('asv-navigation', 'Autonomous Surface Vehicle Navigation Stack', 'Built a ground station, TCP/UDP communication pipeline, and carrot-following waypoint navigation with tuned PID loops for precise path tracking on Jetson platforms.', 'Apr – May 2026', '', [], ['Python', 'PyGame', 'TCP/UDP', 'PID', 'Jetson']),
    ],
    research: [
      ...research.map(r => entry(r.id, r.title, r.id === 'animal-3d-reconstruction-2025' ? 'Developed a single-image 3D animal reconstruction pipeline using SMAL, SD-Fit and vision transformer features to estimate pose, shape and camera parameters.' : r.shortContribution, r.id === 'lagps-neurips-2025' ? 'NeurIPS MusIML Workshop · 2025' : `${r.venue} · ${r.year}`, '', Object.entries(r.links).filter(([,v]) => v).map(([label,url]) => ({label: ({ openReview: 'OpenReview', pdf: 'Paper', slides: 'Slides' } as Record<string,string>)[label] || label, url: url as string})))),
      entry('cervical-cytology', 'Hybrid CNN–Transformer Network for Cervical Cytology', 'Designed a hybrid architecture fusing four backbones with an MLP classifier and Grad-CAM interpretability, reaching 99.34% accuracy and 99.23% F1 on SIPaKMeD.', 'IEEE DELCON · 2026'),
    ],
    experience: [
      entry('sourceworx', 'AI Engineer Intern', 'Architected core components of an enterprise AI agent platform and built agentic systems for operational automation. Deployed an on-premise document intelligence pipeline with vLLM, GLM-OCR and Gemma.', 'SourceworxAI · Nov 2025 – Present'),
      entry('andromeida', 'Technical Intern', 'Designed a modular mission planner for autonomous marine and field robotics, built communication pipelines, and integrated waypoint navigation with approximately 95% field-test path accuracy.', 'Andromeida Maritime Solutions · Jun – Jul 2026'),
      entry('iit-bhu', 'Research Intern', 'Accelerated remote-sensing image preprocessing using PCA and developed a single-image 3D animal reconstruction pipeline with SMAL, SD-Fit and vision transformer features.', 'IIT (BHU), Varanasi · Dec 2025 – Jan 2026'),
      entry('auv-lead', 'Computer Team Lead', 'Directed a team of 10+ engineers working on perception, navigation and embedded control for autonomous marine vehicles.', 'AUV-ZHCET Club, AMU · May 2024 – May 2026'),
    ],
    achievements: [
      entry('isro', 'National Finalist', 'Selected among the top 28 teams nationally from 1,000+ applicants for the Bharatiya Antariksh Hackathon.', 'ISRO · 2025'),
      entry('ssgsa', 'SSGSA Scholar', 'Awarded a competitive mentorship scholarship for academic and research excellence.', '2026 batch'),
      entry('ignite', '1st Place, Ignite Hackathon', 'Recognized for NewsSure, an automated AI news verification platform.', 'Starlabs · 2025'),
      entry('amulate', '1st & 2nd Place, AMULATE', 'Recognized for autonomous agentic AI assistants and car recommendation workflows.', 'BMW Group · 2026 & 2025'),
      entry('rov', '2nd Place, AMU Underwater ROV Challenge', 'Engineered PID control systems for a four-degree-of-freedom underwater vehicle.', '2024'),
      entry('innovation', 'Best Innovation & Best Teamwork', 'Recognized for a vision-capable sustainable autonomous underwater vehicle and teamwork.', 'MTS Tech Symposium, IIT Madras · 2025'),
      entry('sauvc', 'Global Finalist, Singapore AUV Challenge', 'Shortlisted among 100+ global university teams.', '2025 & 2026'),
    ],
    skills: [
      entry('programming', 'Programming & web', 'Python, C/C++, SQL, JavaScript, FastAPI, Django REST Framework, React, Next.js and Node.js.'),
      entry('ai-ml', 'AI, machine learning & LLM systems', 'PyTorch, TensorFlow, Hugging Face, LangChain, LangGraph, RAG, agent orchestration, fine-tuning, quantization, OpenCV, scikit-learn, CNNs, vision transformers and NLP.'),
      entry('systems', 'Systems & observability', 'Docker, Linux, vLLM, OpenTelemetry, Grafana, Prometheus, Loki and Tempo.'),
      entry('robotics', 'Robotics & networking', 'TCP/IP, UDP, MQTT, WebRTC, Protocol Buffers and edge computing systems.'),
      entry('additional-tools', 'Additional tools', skills.map(s => s.name).join(', ') + '.'),
    ],
    activities: activities.map(a => entry(a.id, a.title, a.description, `${a.role} · ${a.type} · ${a.date.slice(0, 4)}`, '', a.link ? [{label:'Learn more',url:a.link}] : [])),
    journey: manualTimeline.filter(i => i.type === 'education').map(i => entry(i.id, i.title, i.id === 'edu-amu' ? 'Bachelor of Technology in Computer Engineering. Cumulative GPA: 8.93 / 10.' : i.description, i.id === 'edu-amu' ? '2023 – 2027' : i.id === 'edu-iit-madras' ? '2023 – 2024' : '2022')),
  },
};
