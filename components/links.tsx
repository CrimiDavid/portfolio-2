import {
    Award,
    FileText,
    Github,
    Linkedin,
    LucideIcon,
    SquareArrowOutUpRight,
} from "lucide-react";

type LinkType = {
    url: string;
    colorClass: string; // Add this field instead of `color`
    title: string;
    img: LucideIcon;
};

const links: LinkType[] = [
    {
        url: "https://www.linkedin.com/in/david-crimi/",
        colorClass: "hover:text-blue-500",
        title: "/LinkedIn",
        img: Linkedin,
    },
    {
        url: "https://github.com/CrimiDavid",
        colorClass: "hover:text-purple-500",
        title: "/GitHub",
        img: Github,
    },
    {
        url: "https://devpost.com/CrimiDavid",
        colorClass: "hover:text-yellow-500",
        title: "/DevPost",
        img: Award,
    },
    {
        url: "/David_Crimi_Resume_2025_2026.pdf",
        colorClass: "hover:text-red-500",
        title: "/Resume",
        img: FileText,
    },
];

interface LinkItemProps {
    link: LinkType;
}

const LinkItem = ({ link }: LinkItemProps) => {
    return (
        <li>
            <a
                href={link.url}
                target={link.url.startsWith("http") ? "_blank" : undefined}
                rel={link.url.startsWith("http") ? "noopener noreferrer" : undefined}
                className={`flex text-base items-center gap-2 font-mono ${link.colorClass} transition-colors duration-200 group`}
            >
                <link.img className="h-5 w-5" />
                {link.title}
                <SquareArrowOutUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </a>
        </li>
    );
};

const RenderLinks= () => {
    return (
        <ul className={"flex flex-col gap-3"}>
            {links.map((link, index) => (
                <LinkItem key={index} link={link} />
            ))
            }
        </ul>
        )
}

export default RenderLinks;
