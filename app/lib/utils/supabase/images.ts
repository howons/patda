import type { FormValues } from "#lib/actions/post/createPostAction.js";
import { createClient } from "#lib/utils/supabase/server.js";

const STORAGE_ID = "patda-images";

export async function moveImages(
  images: FormValues["images"],
  from: string,
  to: string
) {
  const supabase = createClient();
  const promises = images.map(async ({ name }) => {
    const { data, error } = await supabase.storage
      .from(STORAGE_ID)
      .move(`${from}/${name}`, `${to}/${name}`);
  });

  await Promise.all(promises);
}

export async function removeImages(folder: string, imagesToRemain?: string[]) {
  const supabase = createClient();

  const { data: listData, error: listError } = await supabase.storage
    .from(STORAGE_ID)
    .list(folder);
  if (!listData) return;

  const imagePathesToDelete = listData
    .filter(({ name }) => !(imagesToRemain && imagesToRemain.includes(name)))
    .map(({ name }) => `${folder}/${name}`);

  const { data, error } = await supabase.storage
    .from(STORAGE_ID)
    .remove(imagePathesToDelete);
}
