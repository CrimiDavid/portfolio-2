// app/blog/page.tsx
import Link from "next/link";
import { ArrowLeft } from 'lucide-react';import { type PostMetadataType, getSortedPostsData } from "@/lib/posts";
import { formatDateDigits } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "David's technical blog",
    description:
        "I'm David — software engineer. Explore my work, blog, and ways to connect.",
    openGraph: {
        title: "David's technical blog",
        description:
            "I'm David — software engineer. Explore my work, blog, and ways to connect.",
        url: "https://www.david-crimi.com/",
        type: "website",
        images: [
            {
                url: "https://www.david-crimi.com/null.jpg",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "David's technical blog",
        description:
            "I'm David — software engineer. Explore my work, blog, and ways to connect.",
        images: ["https://www.david-crimi.com/null.jpg"],
    },
};

// Disable ISR; page is fully static by default
export const revalidate = false;

export default async function Blog() {
    // Fetch posts data directly inside the component
    const allPostsData = await getSortedPostsData();

    const regularPosts = allPostsData.filter((p) => !p.micro && !p.hidden);

    return (
        <main className="mx-auto max-w-3xl px-4 py-12">
            {/* Page header */}
            <header className="mb-3 text-center">
                <a
                    href={"/"}
                    className="md:flex hidden justify-center items-center gap-2 px-4 max-w-1/5 py-2 rounded-lg transition-colors text-base hover:text-gray-900 hover:bg-gray-100 font-medium"
                >
                    <ArrowLeft className={"flex -mr-2"}/>
                    My website
                </a>
                <h1 className="font-serif text-4xl font-bold tracking-tight">
                    David<span className="text-primary-500">'s</span> Blog
                </h1>
                <p className="mt-2">
                    I make occasional posts about what I&apos;m learning
                </p>
                <div className="mt-6 h-px w-full " />
            </header>

            {/* Regular Posts */}
            <section aria-labelledby="posts-heading" className="space-y-4">
            <ul className="divide-y ">
                    {regularPosts.map(({ id, date, title }) => (
                        <li
                            key={id}
                            className="group flex flex-col gap-2 py-1 md:flex-row md:items-baseline"
                        >
                            <time
                                dateTime={date}
                                className="shrink-0 font-mono text-base mr-5 text-neutral-500 transition-colors group-hover:text-neutral-900  dark:group-hover:text-neutral-200"
                            >
                                {formatDateDigits(date)}
                            </time>
                            <Link
                                href={`/blog/${id}`}
                                className="flex-1 text-lg font-medium  underline-offset-4 transition-colors hover:text-primary-600 hover:underline  dark:hover:text-primary-400"
                            >
                                {title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </section>
        </main>
    );
}
