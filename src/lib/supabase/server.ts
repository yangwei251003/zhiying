import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// 服务端客户端（用于 Server Components 和 API Routes）
// 使用 service_role key 绕过 RLS（仅在服务端使用）
export async function createServerSupabaseClient() {
  const cookieStore = await cookies();

  return createServerClient(
    supabaseUrl,
    supabaseServiceKey || supabaseAnonKeyFallback(),
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing user sessions.
          }
        },
      },
    }
  );
}

function supabaseAnonKeyFallback() {
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (key) return key;
  console.warn("SUPABASE_SERVICE_ROLE_KEY not set, falling back to ANON_KEY");
  return "";
}
