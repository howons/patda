import type { FormValues } from "#lib/actions/post/createPostAction.js";
import { createClient } from "#lib/utils/supabase/server.js";

export function moveImages(images: FormValues["images"], to: string) {
  const supabase = createClient();
  images.forEach(async ({ path }) => {
    const destPath = `${to}/${path.split("/").at(-1)}`;
    const { data, error } = await supabase.storage
      .from("patda-images")
      .move(path, destPath);
  });
}
