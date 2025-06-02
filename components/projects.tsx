import Image from "next/image";
import {SquareArrowOutUpRight} from "lucide-react";

type Project = {
    title: string
    description: string
    imageUrl: string
    link: string
}
const Projects: Project[] = [
    {
        title: "Impactify (Hack the Valley 9 -- Winner 1st Overall)",
        description:
            "A health-monitoring system that embeds IoT sensors in sports helmets to track and analyze impact data, helping prevent brain injuries.",
        imageUrl: "/impactify.png",
        link: "https://github.com/MatthewFrieri/HackTheValley_Impactify",
    },
    {
        title: "Code Genius",
        description:
            "AI-driven code-annotation tool that parses source files and delivers readability scores, detailed explanations, and context-aware suggestions.",
        imageUrl: "/CodeGenius.png",
        link: "https://github.com/MatthewFrieri/HackThe6ix-CodeGenius",
    },
    {
        title: "Six Degrees of Kevin Bacon",
        description:
            "Backend Java service using Neo4j to store actor/movie data and compute the shortest path between any actor and Kevin Bacon.",
        imageUrl: "/bacon.png",
        link: "https://github.com/tarang5757/project",
    },
    {
        title: "Alien Invaders Game",
        description:
            "A 2D arcade-style shooter built with Python and Pygame featuring real-time collision detection and adaptive alien-fleet behavior.",
        imageUrl: "/alien.png",
        link: "https://github.com/CrimiDavid/Ai-Invaders",
    },
    {
        title: "Optimal Uber Finder",
        description:
            "React + Flask web app that compares Uber prices in a user-defined radius via Mapbox and Uber APIs, saving riders ~30 % on average.",
        imageUrl: "/charon.png",
        link: "https://github.com/Geri0704/Charon",
    },
    {
        title: "Advanced Process Scheduler Simulation",
        description:
            "C-based system-scheduler simulator implementing FCFS, RR, and SJF algorithms with detailed CPU-utilization and turnaround metrics.",
        imageUrl: "/Scheduler.png",
        link: "https://github.com/CrimiDavid/Process-Scheduler",
    },
    {
        title: "Three Musketeers",
        description:
            'Java/JavaFX implementation of the "Three Musketeers" board game with Human vs AI modes and save/load functionality.',
        imageUrl: "/threeMusk.png",
        link: "#",
    },
];

interface ProjectProps {
    project: Project
}

// Must pass object as prop
const ProjectCard = ({ project }: ProjectProps) => {
    return (
        <a className="cursor-pointer" href={project.link}>
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl mb-2 border-2 border-gray-500/80" >
                <Image
                    className="object-cover project-image-shadow"
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    priority
                />
            </div>
            <div className="flex flex-col w-full">
                <div className="flex justify-between gap-2">
                    <h1 className={"font-mono font-semibold underline"}>{project.title}</h1>
                    <SquareArrowOutUpRight className="h-4 w-4 flex-shrink-0 mt-0.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
                <p className="font-mono font-semibold opacity-80">
                    {project.description}
                </p>
            </div>

        </a>
    )
}


// Main component to display all projects
const ProjectsGrid = () => {
    return (
        <div className={"grid grid-cols-1 md:grid-cols-2 gap-6"}>
            {Projects.map((project, index) => (
                <ProjectCard key={index} project={project} />
            ))}
        </div>
    )
}

export default ProjectsGrid;