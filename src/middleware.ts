import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
    const token = req.cookies.get("token")?.value;

    const pathname = req.nextUrl.pathname;

    const isProtected = ["/dashboard", "/admin", "/perfil"].some((path) =>
        pathname.startsWith(path)
    );

    const isPublic = ["/", "/login", "/cadastro"].includes(pathname);

    // Se for rota protegida e não tiver token, redireciona para a home
    if (isProtected && !token) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    // Se for rota pública e já tiver token, redireciona para /admin
    if (isPublic && token) {
        return NextResponse.redirect(new URL("/admin", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};