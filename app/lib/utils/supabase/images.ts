import type { Session } from "next-auth";

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

export async function removeImages(folder: string, imagesToRemain?: string[]) {
  const supabase = createClient();

  const { data: listData, error: listError } = await supabase.storage
    .from("patda-images")
    .list(folder);
  if (!listData) return;

  const imagesToDelete = listData
    .map(({ name }) => `${folder}/${name}`)
    .filter((path) => !(imagesToRemain && imagesToRemain.includes(path)));

  const { data, error } = await supabase.storage
    .from("patda-images")
    .remove(imagesToDelete);
}

export function getTempFolderPath(session: Session) {
  const userNameKey = encodeURIComponent(session.user?.name ?? "").replace(
    /[^a-zA-Z0-9]/g,
    ""
  );
  const userId = session.user?.id ?? "";

  return `temp/${userNameKey}${userId.slice(0, 3)}`;
}
