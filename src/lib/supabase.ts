import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://rbyjreoslnnhqcuyoptq.supabase.co",
  "sb_publishable_SGyItf7SG6b9i6BSSCgmCA_z-3Lzmm0" // anon public key (được phép dùng ở frontend)
);

async function sbFetch(table, setter, queryBuilder) {
  let query = supabase.from(table).select("*");

  if (queryBuilder) query = queryBuilder(query);

  const { data, error } = await query;

  if (error) {
    console.error(`Load ${table} error:`, error);
    setter([]);
    return;
  }

  setter(data ?? []);
}