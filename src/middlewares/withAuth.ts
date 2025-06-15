import { getToken } from "next-auth/jwt";
import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse,
} from "next/server";

const protectedRoutes = ["admin"];
const publicOnlyRoutes = ["auth"]; // Hanya bisa diakses kalau belum login

const WithAuth = (middleware: NextMiddleware, requireAuth: string[] = []) => {
  return async (req: NextRequest, event: NextFetchEvent) => {
    const { pathname } = req.nextUrl;
    const currentPath = pathname.split("/")[1];

    // Check if this route needs protection
    if (requireAuth.includes(currentPath)) {
      const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

      // Belum login, tapi akses route yang butuh login
      if (!token && !publicOnlyRoutes.includes(currentPath)) {
        const loginUrl = new URL("/auth/login", req.url);
        loginUrl.searchParams.set("callbackUrl", req.url);
        return NextResponse.redirect(loginUrl);
      }

      // Sudah login, tapi akses halaman auth (login/register)
      if (token && publicOnlyRoutes.includes(currentPath)) {
        return NextResponse.redirect(new URL("/", req.url));
      }

      // User login, tapi coba akses admin tanpa role admin
      if (token && protectedRoutes.includes(currentPath) && token.role !== "admin") {
        return NextResponse.redirect(new URL("/", req.url));
      }
    }

    // Lanjutkan ke middleware berikutnya
    return middleware(req, event);
  };
};

export default WithAuth;
