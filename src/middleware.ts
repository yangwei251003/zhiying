import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const configuredUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const configuredKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  // Public introduction pages can render before a deployment is configured.
  // API calls stay unavailable until the real backend settings are supplied.
  if (!configuredUrl || !configuredKey) {
    if (request.nextUrl.pathname.startsWith("/api/")) {
      return NextResponse.json(
        { error: "Backend is not configured. Set your own Supabase environment values." },
        { status: 503 },
      );
    }
    return supabaseResponse;
  }

  const supabase = createServerClient(
    configuredUrl,
    configuredKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // 刷新 session
  await supabase.auth.getUser();

  return supabaseResponse;
}

// 匹配除了静态文件和 _next 内部路径以外的所有请求
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
