"use client"

import {
    SiPython, SiCplusplus, SiC, SiHtml5, SiCss3,
    SiJavascript, SiMysql, SiPostgresql, SiMongodb,
    SiDjango, SiFastapi, SiReact, SiFlask, SiNextdotjs,
    SiLinux, SiGit, SiGithubactions,
    SiGraphql, SiJenkins, SiDocker, SiTailwindcss
} from 'react-icons/si';
import { FaJava , FaAws} from "react-icons/fa";
import {Button} from "@/components/ui/button";
import {Newspaper, SquareArrowOutUpRight} from "lucide-react";
import ProjectsGrid from "@/components/projects";
import { useRouter } from "next/navigation";
import RenderLinks from "@/components/links";
//hello
export default function Home() {
    const router = useRouter();
    return (
        <div className="min-h-screen">
            <header className={"flex justify-end mr-4 mt-2"}>
                {/*temp commented out */}
            </header>
            <div className="max-w-7xl mx-auto px-8 pt-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Column 1 */}
                    <div className="col-span-1">
                        <div className="md:fixed flex-col mt-12 break-words space-y-1 text-left">
                            <h1 className="lg:text-4xl md:text-2xl text-4xl font-mono font-semibold uppercase tracking-wider">
                                David Crimi
                            </h1>
                            <p className="font-mono font-semibold italic">
                                I turn ideas into software
                            </p>

                            {/* links container*/}
                            <div className={"mt-12"}>
                            <h1 className={"text-2xl font-mono font-semibold opacity-80 mb-1"}> Links </h1>
                            {/* Links */}
                            <RenderLinks/>
                            </div>

                        </div>

                    </div>

                    {/* Column 2 */}
                    <div className="col-span-2">
                        <div className={"mt-12 mb-8"}>

                            <div className={"flex  justify-between"}>
                                <h1 className={"text-2xl font-mono font-semibold opacity-80 mb-10"}> Projects </h1>

                                <Button
                                    onClick={() => {router.push("/blog")}}
                                    className={"flex hover:bg-red-500 cursor-pointer"}>
                                    <Newspaper/>
                                    Blog
                                </Button>
                            </div>
                            <div >
                                <ProjectsGrid/>
                            </div>
                    </div> {/* End of Column 2 */}
                        <h1 className={"text-2xl font-mono font-semibold opacity-80 mb-1"}> Tech Stack </h1>
                        <ul className="grid md:grid-cols-3 grid-cols-2 w-full">
                            <li className="flex items-center gap-2 text-neutral-200 text-lg"><SiPython /> Python</li>
                            <li className="flex items-center gap-2 text-neutral-200 text-lg"><FaJava/>Java</li>
                            <li className="flex items-center gap-2 text-neutral-200 text-lg"><SiCplusplus /> C++</li>
                            <li className="flex items-center gap-2 text-neutral-200 text-lg"><SiC /> C</li>

                            <li className="flex items-center gap-2 text-neutral-200 text-lg"> <SiTailwindcss/> Tailwind</li>
                            <li className="flex items-center gap-2 text-neutral-200 text-lg"><SiJavascript /> TypeScript</li>

                            {/* Frameworks & Technologies */}
                            <li className="flex items-center gap-2 text-neutral-200 text-lg"><SiDjango /> Django</li>
                            <li className="flex items-center gap-2 text-neutral-200 text-lg"><SiFastapi /> FastAPI</li>
                            <li className="flex items-center gap-2 text-neutral-200 text-lg"><SiReact /> React</li>
                            <li className="flex items-center gap-2 text-neutral-200 text-lg"><SiFlask /> Flask</li>
                            <li className="flex items-center gap-2 text-neutral-200 text-lg"><SiNextdotjs /> Next.js</li>
                            <li className="flex items-center gap-2 text-neutral-200 text-lg"><SiLinux /> Linux</li>
                            <li className="flex items-center gap-2 text-neutral-200 text-lg"><SiGit /> Git</li>
                            <li className="flex items-center gap-2 text-neutral-200 text-lg"><FaAws/>AWS</li>

                            {/* Databases & DevOps */}
                            <li className="flex items-center gap-2 text-neutral-200 text-lg"><SiMysql /> MySQL</li>
                            <li className="flex items-center gap-2 text-neutral-200 text-lg"><SiPostgresql /> PostgreSQL</li>
                            <li className="flex items-center gap-2 text-neutral-200 text-lg"><SiMongodb /> MongoDB</li>
                            <li className="flex items-center gap-2 text-neutral-200 text-lg"><SiGraphql /> GraphQL</li>
                            <li className="flex items-center gap-2 text-neutral-200 text-lg"><SiGithubactions /> GitHub Actions</li>
                            <li className="flex items-center gap-2 text-neutral-200 text-lg"><SiJenkins /> Jenkins</li>
                            <li className="flex items-center gap-2 text-neutral-200 text-lg"><SiDocker /> Docker</li>
                        </ul>

                    </div>
                </div>

                <footer>
                    <h1 className={"mt-8 flex flex-col justify-between border-t border-black py-8 opacity-20 transition-opacity hover:opacity-50 md:flex-row dark:border-white"}>
                        © 2025 David Crimi
                    </h1>
                </footer>
            </div>
        </div>
    )
}