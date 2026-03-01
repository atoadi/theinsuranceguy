import { NextResponse, type NextRequest } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'

export async function proxy(request: NextRequest) {
    // Only apply auth protection to /admin and its subroutes
    if (request.nextUrl.pathname.startsWith('/admin')) {
        return await updateSession(request)
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - api (API routes)
         * - public (public static assets)
         */
        '/((?!_next/static|_next/image|favicon.ico|api|.*\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}
