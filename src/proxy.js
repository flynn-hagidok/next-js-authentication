import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'

const privateRoute = ["/private"];
const adminRoute = ["/dashboard"];

// This function can be marked `async` if using `await` inside
export async function proxy(req) {
    const token = await getToken({ req });
    const reqPath = req.nextUrl.pathname;
    const isAuthenticated = Boolean(token);
    const isUser = token?.role === "user";
    const isAdmin = token?.role === "admin"
    const isPrivate = privateRoute.some(route => reqPath.startsWith(route));
    const isAdminRoute = adminRoute.some(route => reqPath.startsWith(route));
    console.log(isAuthenticated, isUser, reqPath);

    //login for private route
    if (!isAuthenticated && isPrivate) {
        const loginUrl = new URL('/api/auth/signin', req.url);
        loginUrl.searchParams.set("/callbackUrl", reqPath)
        return NextResponse.redirect(loginUrl);
        // return NextResponse.redirect(new URL('/api/auth/signin', req.url));
    };

    //logic for admin route
    if (isAuthenticated && isAdminRoute && !isAdmin) {
        return NextResponse.redirect(new URL("/forbidden", req.url));
    };

    return NextResponse.next();
    // return NextResponse.redirect(new URL('/', req.url))
}

// Alternatively, you can use a default export:
// export default function proxy(request) { ... }

export const config = {
    matcher: ['/private/:path*', "/dashboard/:path*"],
}