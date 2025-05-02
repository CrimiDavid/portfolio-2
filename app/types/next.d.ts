import 'next'

// Augment the PageProps type to fix the TypeScript error
declare module 'next' {
    interface PageProps {
        params?: Record<string, string>
        searchParams?: Record<string, string | string[]>
    }
}