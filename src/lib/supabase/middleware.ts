import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

export async function updateSession(request: NextRequest) {
  const isServerAction = request.headers.get("next-action");
  const isRouterPrefetch = request.headers.get("next-router-prefetch");
  const isPrefetchPurpose = request.headers.get("purpose") === "prefetch";

  if (isServerAction || isRouterPrefetch || isPrefetchPurpose) {
    return NextResponse.next({ request });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return NextResponse.next({ request });
  }

  let supabaseResponse = NextResponse.next({
    request,
  });

  try {
    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({ name, value, ...options });
          supabaseResponse = NextResponse.next({
            request,
          });
          supabaseResponse.cookies.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: "", ...options });
          supabaseResponse = NextResponse.next({
            request,
          });
          supabaseResponse.cookies.set({ name, value: "", ...options });
        },
      },
    });

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const protectedPaths = ["/dashboard", "/profile", "/library", "/orders"];
    const isProtectedPath = protectedPaths.some((path) =>
      request.nextUrl.pathname.startsWith(path)
    );

    if (isProtectedPath && !user) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      url.searchParams.set("redirect", request.nextUrl.pathname);
      return NextResponse.redirect(url);
    }

    if (request.nextUrl.pathname === "/login" && user) {
      const url = request.nextUrl.clone();
      url.pathname = "/";
      return NextResponse.redirect(url);
    }

    return supabaseResponse;
  } catch {
    return supabaseResponse;
  }
}
