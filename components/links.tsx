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
    color: string;
    title: string;
    img: LucideIcon;
};

const links: LinkType[] = [
    {
        url: "https://linkedin.com/in/yourprofile",
        color: "blue",
        title: "/LinkedIn",
        img: Linkedin,
    },
    {
        url: "https://github.com/yourusername",
        color: "purple",
        title: "/GitHub",
        img: Github,
    },
    {
        url: "https://devpost.com/yourusername",
        color: "yellow",
        title: "/DevPost",
        img: Award,
    },
    {
        url: "/resume.pdf",
        color: "red",
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
                className={`flex text-base items-center gap-2 font-mono hover:text-${link.color}-500 transition-colors duration-200 group`}
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
