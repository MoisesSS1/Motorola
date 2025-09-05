import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
    const token = req.cookies.get("token")?.value;
    const type = req.cookies.get("type")?.value;
    const pathname = req.nextUrl.pathname;

    const isAdmin = ["/dashboard", "/admin", "/perfil"].some((path) =>
        pathname.startsWith(path)
    );

    const isPublic = ["/", "/login", "/cadastro"].includes(pathname);
    const isUser = ["/user", "/user/tickets", "/profile"].some((path) =>
        pathname.startsWith(path)
    );

    // Se for rota protegida e não tiver token, redireciona para a home
    if (isAdmin && !token) {
        return NextResponse.redirect(new URL("/", req.url));
    }
    if (isUser && !token) {
        return NextResponse.redirect(new URL("/", req.url));
    }
    // Se for rota protegida e nao for admin
    if (isAdmin && type === "user") {
        return NextResponse.redirect(new URL("/user", req.url));
    }

    // Se for rota protegida e não  for user
    if (isUser && type !== "user") {
        return NextResponse.redirect(new URL("/admin", req.url));
    }

    if (isPublic && token && type === "user") {
        return NextResponse.redirect(new URL("/user", req.url));
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