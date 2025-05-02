"use client"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
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
                        <div className="md:fixed flex-col mt-24 break-words space-y-1 text-left">
                            <h1 className="text-4xl font-mono font-semibold uppercase tracking-wider">
                                David Crimi
                            </h1>
                            <p className="font-mono font-semibold italic">
                                I turn ideas into software
                            </p>

                            {/* links container*/}
                            <div className={"mt-12"}></div>
                            <h1 className={"text-2xl font-mono font-semibold opacity-80 mb-1"}> Links </h1>
                            {/* Links */}
                            <RenderLinks/>
                            {/*<div className={"w-full h-32 border-2 mt-20 rounded-2xl overflow-x-auto"}>*/}
                            {/*    <header className={"flex border-b justify-center"}>*/}
                            {/*        <RadioGroup className={"flex"} defaultValue="option-one">*/}
                            {/*            <div className="flex items-center space-x-2">*/}
                            {/*                <RadioGroupItem value="option-one" id="option-one"/>*/}
                            {/*                <Label htmlFor="option-one">frontend</Label>*/}
                            {/*            </div>*/}
                            {/*            <div className="flex items-center space-x-2">*/}
                            {/*                <RadioGroupItem value="option-two" id="option-two" />*/}
                            {/*                <Label htmlFor="option-two">backend</Label>*/}
                            {/*            </div>*/}
                            {/*            <div className="flex items-center space-x-2">*/}
                            {/*                <RadioGroupItem value="option-three" id="option-three" />*/}
                            {/*                <Label htmlFor="option-three">misc</Label>*/}
                            {/*            </div>*/}
                            {/*        </RadioGroup>*/}
                            {/*    </header>*/}
                            {/*</div>*/}
                        </div>

                    </div>

                    {/* Column 2 */}
                    <div className="col-span-2">
                        <div className={"mt-24"}>

                            <div className={"flex  justify-between"}>
                                <h1 className={"text-xl font-mono font-semibold opacity-80 mb-10"}> my projects </h1>

                                <Button
                                    onClick={() => {router.push("/blog")}}
                                    className={"flex hover:bg-red-500 cursor-pointer"}>
                                    <Newspaper/>
                                    Blog
                                </Button>
                            </div>
                            <div > {/* Start with 1 col on small screens, 2 on medium+ */}
                                <ProjectsGrid/>
                            </div> {/* End of the inner card grid */}
                    </div> {/* End of Column 2 */}
                    </div>
                </div>
            </div>
        </div>
    )
}