// app/blog/[id]/page.tsx
import { notFound } from 'next/navigation';
import { getAllPostIds, getPostData } from '@/lib/posts';
import { formatDate } from '@/lib/utils';
import 'prismjs/themes/prism-tomorrow.css';

/* ----------  Static helpers  ---------- */

interface PostPageProps {
    params: { id: string };
}

export default async function PostPage({ params }: PostPageProps) {
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

            {/* ── HEADER ───────────────────────────────────────────────────────── */}
            <header className="sticky top-0 z-30 w-full border-b border-neutral-200/70 dark:border-neutral-800/70
                         backdrop-blur bg-white/80 dark:bg-black/70 px-4 lg:px-10 py-4">
                <div className={"flex justify-between"}>
                    <h1 className="font-serif-display text-3xl font-semibold leading-snug tracking-tight">
                        {title}
                    </h1>
                    <a
                        href={"/blog"}>
                        Back
                    </a>
                </div>

                <p className="mt-1 font-serif text-sm opacity-70">
                    {publishDateFormatted} • {readTime} min read
                </p>
            </header>

            {/* ── TOC ──────────────────────────────────────────────────────────── */}
            {tableOfContents && tableOfContents.length > 60 && (
                <aside
                    className="hidden mt-6 lg:block fixed top-[5.5rem] left-4
               w-64 max-h-[75vh] overflow-auto rounded-md
               border border-neutral-300/50 bg-white/80 dark:bg-black/60
               p-4 text-sm shadow-xl backdrop-blur
               dark:text-neutral-200 z-20"
                >
                    <h2 className="mb-2 text-base font-semibold tracking-tight opacity-80">
                        Table of Contents
                    </h2>
                    <div dangerouslySetInnerHTML={{ __html: tableOfContents }} />
                </aside>
            )}


            {/* ── MAIN ─────────────────────────────────────────────────────────── */}
            <main
                className="relative mx-auto font-mono text-base max-w-7xl px-4 lg:px-10 py-10
                   lg:ml-[18rem]
        ">
                <article
                    className="prose prose-lg max-w-none dark:prose-invert
             [&>p>img]:mx-auto
             [&_pre]:max-w-3xl [&_pre]:mx-auto"
                    dangerouslySetInnerHTML={{ __html: contentHtml }}
                />

            </main>

            {/* ── FOOTER ───────────────────────────────────────────────────────── */}
            <footer className="px-4 lg:px-10 py-10 text-center text-sm opacity-70">
                © {new Date().getFullYear()} david-crimi.com • All rights reserved
            </footer>
        </div>
    );
}
