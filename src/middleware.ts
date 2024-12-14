import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

const secret = process.env.JWT_SECRET;

export const middleware = async (req: NextRequest) => {
  const token = req.headers.get("authorization");

  if (!token && !req.nextUrl.pathname.startsWith("/signin")) {
    // return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  const finalToken = token?.split(" ")[1];

  if (finalToken) {
    try {
      // const decode = (await jwt.verify(finalToken, secret!)) as { id?: string };
      const { payload } = (await jwtVerify(
        finalToken,
        new TextEncoder().encode(secret!)
      )) as { payload: { id?: string } };

      if (payload) {
        const id = payload.id;
        // req.headers.set("userId", id || ""); //You can't do this as the headers in app router are immutable so you need to make a response object with modified headers
        const response = NextResponse.next();
        response.headers.set("userid", id!);

        return response;
      }
    } catch (error: unknown) {
      console.log("error", error);
      return NextResponse.redirect(new URL("/signin", req.url));
    }
  }

  if (req.nextUrl.pathname.startsWith("/signin")) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/signin", req.url));
};

export const config = {
  matcher: ["/api/v1/blog/:path*"],
};
