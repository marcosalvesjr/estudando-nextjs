import { NextRequest, NextResponse } from "next/server";

export default function middlewere(request: NextRequest) {
  const authenticated = true;

  if (request.nextUrl.pathname.startsWith("/dashboard") && !authenticated) {
    console.log("acesso negado");
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}
