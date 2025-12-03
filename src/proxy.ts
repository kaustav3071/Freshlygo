import { url } from "inspector";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(req: NextRequest) {

    const { pathname } = req.nextUrl;

    const publicPaths = ["/login", "/register", "/verify", "/favicon.ico"];
    const publicPrefixes = ["/_next", "/api/auth"];

    const isPublicRoute = publicPaths.includes(pathname) ||
        publicPrefixes.some(prefix => pathname.startsWith(prefix));

    if (isPublicRoute) {
        return NextResponse.next();
    }

    const token = await getToken({ req, secret: process.env.AUTH_SECRET })
    if (!token) {
        const loginUrl = new URL("/login", req.url);
        loginUrl.searchParams.set("callbackUrl", req.url);
        return NextResponse.redirect(loginUrl);
    }

    const role = token.role;
    if (pathname.startsWith("/users") && role !== "user") {
        return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    if (pathname.startsWith("/admin") && role !== "admin") {
        return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    if (pathname.startsWith("/deliveryPartner") && role !== "deliveryPartner") {
        return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/((?!api|_next/static|_next/image|_next/data|favicon.ico).*)',
}
