// File: app/blog/[id]/page.tsx
import { notFound } from 'next/navigation';
import { getAllPostIds, getPostData } from '@/lib/posts';
import { formatDate } from '@/lib/utils';
import 'prismjs/themes/prism-tomorrow.css';

// Generate static params for all posts
export async function generateStaticParams() {
    const posts = getAllPostIds();
    return posts;
}

// Generate metadata for SEO and Open Graph
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const postData = await getPostData(id);

    if (!postData) {
        return {
            title: 'Post Not Found',
        };
    }

    return {
        title: postData.title,
        description: postData.description || `Read ${postData.title} on David's Technical Blog`,
        openGraph: {
            title: postData.title,
            description: postData.description || `Read ${postData.title} on David's Technical Blog`,
            type: 'article',
            publishedTime: postData.date,
            authors: ['David Crimi'],
            images: [
                {
                    url: `/og/blog/${id}`,
                    width: 1200,
                    height: 630,
                    alt: postData.title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: postData.title,
            description: postData.description || `Read ${postData.title} on David's Technical Blog`,
            images: [`/og/blog/${id}`],
        },
    };
}

// Main page component
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const postData = await getPostData(id);

    if (!postData) {
        return notFound();
    }

    const {
        title,
        date,
        contentHtml,
        readTime,
        tableOfContents,
    } = postData;

    const publishDateFormatted = formatDate(date);

    return (
        <div className="min-h-screen w-full">
            {/* Sticky Header */}
            <header className="sticky top-0 z-30 w-full border-b border-neutral-200/70 dark:border-neutral-800/70 backdrop-blur px-4 lg:px-10 py-4">
                <div className="flex justify-between items-start">
                    <div className="flex-1">
                        <h1 className="font-serif-display text-2xl md:text-3xl font-semibold leading-snug tracking-tight pr-4">
                            {title}
                        </h1>
                        <div className="flex justify-between items-center"> {/* Added items-center */}
                            <p className="mt-1 font-serif text-sm opacity-70">
                                {publishDateFormatted} • {readTime} min read
                            </p>
                            <a
                                className="flex md:text-lg items-center px-3 py-2 text-sm font-medium transition-all ease-in-out duration-200 hover:scale-110"
                                href="/blog"
                            >
                                ← All Posts
                            </a>
                        </div>
                    </div>

                </div>
                {/* Mobile TOC - Collapsible */}

            </header>

            {/* Main Content Layout */}
            <div className="max-w-7xl mx-auto">
                <details className="lg:hidden mx-4 mt-6 border border-foreground rounded-lg bg ">
                    <summary className="p-4 cursor-pointer font-semibold text-sm">
                        Table of Contents
                    </summary>
                    <div
                        className="px-4 pb-4 prose prose-sm dark:prose-invert prose-a:text-neutral-600 dark:prose-a:text-neutral-400 prose-a:no-underline"
                        dangerouslySetInnerHTML={{ __html: tableOfContents }}
                    />
                </details>
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Table of Contents - Desktop Sidebar */}
                    <div className="lg:col-span-1 order-2 lg:order-1">
                        <aside className="hidden lg:block sticky top-32 border border-neutral-200 dark:border-neutral-800 rounded-lg p-4 ml-4 mt-6 bg-neutral-50/50 dark:bg-neutral-900/50">
                            <h2 className="mb-3 text-base font-semibold tracking-tight opacity-80">
                                Table of Contents
                            </h2>
                            <div
                                className="prose prose-sm  prose-a:no-underline transition-all prose-a:text-foreground/50 prose-a:hover:text-foreground"
                                dangerouslySetInnerHTML={{ __html: tableOfContents }}
                            />
                        </aside>


                    </div>

                    {/* Article Content */}
                    <div className="lg:col-span-3 order-1 lg:order-2">
                        <main className="px-4 lg:px-10 py-6 lg:py-10">
                            <article
                                className="prose prose-lg lg:prose-lg max-w-none dark:prose-invert
                                         prose-headings:scroll-mt-24
                                         prose-img:w-full prose-img:h-screen prose-img:max-h-[70vh] prose-img:rounded-lg prose-img:shadow-lg
                                         prose-a:text-blue-600 dark:prose-a:text-blue-400
                                         prose-pre:bg-neutral-900 dark:prose-pre:bg-neutral-800
                                         prose-code:bg-neutral-100 dark:prose-code:bg-neutral-800
                                         prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                                         prose-blockquote:border-l-blue-500"
                                dangerouslySetInnerHTML={{ __html: contentHtml }}
                            />
                        </main>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="border-t border-neutral-200 dark:border-neutral-800 px-4 lg:px-10 py-10 text-center text-sm opacity-70 mt-16">
                <p>© {new Date().getFullYear()} david-crimi.com • All rights reserved</p>
            </footer>
        </div>
    );
}