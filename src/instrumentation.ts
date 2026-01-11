export async function register() {
    // Only run on the server side (Node.js runtime, not Edge)
    if (process.env.NEXT_RUNTIME === 'nodejs') {
        console.log('🚀 Server starting - preloading docs into memory...')
        // Dynamic import to avoid Edge runtime analysis
        const { preloadAllDocs } = await import('@/app/api/all-docs/cache')
        await preloadAllDocs()
    }
}


