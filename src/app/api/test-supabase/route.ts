//src/app/api/test-supabase/route.ts//

import { supabaseAdmin } from "@/lib/supabase-admin";

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from("test")
    .select("*");

  if (error) {
    return Response.json({ ok: false, error: error.message });
  }

  return Response.json({ ok: true, data });
}