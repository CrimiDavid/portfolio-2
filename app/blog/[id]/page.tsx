import { notFound } from 'next/navigation';
import { getAllPostIds, getPostData } from '@/lib/posts';
import { formatDate } from '@/lib/utils';
import 'prismjs/themes/prism-tomorrow.css';

// @ts-ignore
export async function generateStaticParams() {
    const posts = getAllPostIds();
    return posts;
}

// Main page component with params
export default async function Page({ params }: { params: { id: string } }) {
    const postData = await getPostData(params.id);
    if (!postData) return notFound();

    const {
        title,
        date,
        contentHtml,
        readTime,
        tableOfContents,
    } = postData;

    const publishDateFormatted = formatDate(date);

    return (
        <div className="min-h-screen w-full bg-white dark:bg-black text-neutral-900 dark:text-neutral-100">
            <header className="sticky top-0 z-30 w-full border-b border-neutral-200/70 dark:border-neutral-800/70
                         backdrop-blur bg-white/80 dark:bg-black/70 px-4 lg:px-10 py-4">
                <div className={"flex justify-between"}>
                    <h1 className="font-serif-display text-3xl font-semibold leading-snug tracking-tight">
                        {title}
                    </h1>
                    <a
                        className={"md:flex md:mt-4 hidden"}
                        href={"/blog"}>
                        Back
                    </a>
                </div>

                <p className="mt-1 font-serif text-sm opacity-70">
                    {publishDateFormatted} • {readTime} min read
                </p>
            </header>
            <div className={"grid grid-cols-3"}>
                <div className={"md:col-span-1"}>
                    <aside
                        className="md:block border-4 border-accent rounded-lg p-4 ml-2 hidden mt-6  "
                    >
                        <h2 className="mb-2 text-base font-semibold tracking-tight opacity-80">
                            Table of Contents
                        </h2>
                        <div dangerouslySetInnerHTML={{ __html: tableOfContents }} />
                    </aside>
                </div>

                <div className={"md:col-span-2 col-span-full w-full "}>
                    <main
                        className="font-mono text-base w-full px-4 lg:px-10 py-10"
                    >
                        <article
                            className="prose prose-md w-full dark:prose-invert"
                            dangerouslySetInnerHTML={{ __html: contentHtml }}
                        />


                    </main>
                </div>

            </div>


            <footer className="px-4 lg:px-10 py-10 text-center text-sm opacity-70">
                © {new Date().getFullYear()} david-crimi.com • All rights reserved
            </footer>
        </div>
    );
}