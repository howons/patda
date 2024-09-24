import type { Session } from "next-auth";

import type { FormValues } from "#lib/actions/post/createPostAction.js";
import { createClient } from "#lib/utils/supabase/server.js";

export async function moveImages(
  images: FormValues["images"],
  from: string,
  to: string
) {
  const supabase = createClient();
  const promises = images.map(async ({ name }) => {
    const { data, error } = await supabase.storage
      .from("patda-images")
      .move(`${from}/${name}`, `${to}/${name}`);
  });

  await Promise.all(promises);
}

export async function removeImages(folder: string, imagesToRemain?: string[]) {
  const supabase = createClient();

  const { data: listData, error: listError } = await supabase.storage
    .from("patda-images")
    .list(folder);
  if (!listData) return;

  const imagePathesToDelete = listData
    .filter(({ name }) => !(imagesToRemain && imagesToRemain.includes(name)))
    .map(({ name }) => `${folder}/${name}`);

  const { data, error } = await supabase.storage
    .from("patda-images")
    .remove(imagePathesToDelete);
}
