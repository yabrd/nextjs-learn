import withAuth from "@/middlewares/withAuth";
import { NextResponse } from "next/server";

const mainMiddleware = () => {
    const res = NextResponse.next();
    return res;
}

export default withAuth(mainMiddleware, ['auth', 'admin']);