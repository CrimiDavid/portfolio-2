// File: app/og/blog/[id]/route.tsx
import { ImageResponse } from 'next/og';
import { getPostData } from '@/lib/posts';

export const runtime = 'nodejs';
export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const post = await getPostData(id);

    if (!post) {
        return new Response('Post not found', { status: 404 });
    }

    const { title, date } = post;

    // Format date for display
    const publishDate = new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return new ImageResponse(
        (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 50%, #2d2d2d 100%)',
                    color: 'white',
                    padding: '80px 60px',
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    position: 'relative',
                }}
            >
                {/* Background Pattern */}
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundImage: 'radial-gradient(circle at 20% 20%, rgba(120, 120, 120, 0.1) 1px, transparent 1px)',
                        backgroundSize: '30px 30px',
                    }}
                />

                {/* Header */}
                <div
                    style={{
                        fontSize: 28,
                        opacity: 0.8,
                        marginBottom: 40,
                        fontWeight: 500,
                        letterSpacing: '0.5px'
                    }}
                >
                    David's Technical Blog
                </div>

                {/* Title */}
                <div
                    style={{
                        fontSize: title.length > 60 ? 44 : 52,
                        fontWeight: 700,
                        textAlign: 'center',
                        lineHeight: 1.1,
                        maxWidth: '900px',
                        marginBottom: 30,
                    }}
                >
                    {title}
                </div>

                {/* Date */}
                <div
                    style={{
                        fontSize: 20,
                        opacity: 0.7,
                        fontWeight: 400,
                    }}
                >
                    {publishDate}
                </div>

                {/* Bottom accent */}
                <div
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '6px',
                        background: 'linear-gradient(90deg, #3b82f6, #8b5cf6, #06b6d4)',
                    }}
                />
            </div>
        ),
        {
            width: 1200,
            height: 630,
        }
    );
}