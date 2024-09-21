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

export function getTempFolderPath(session: Session, postId?: number) {
  const userNameKey = encodeURIComponent(session.user?.name ?? "").replace(
    /[^a-zA-Z0-9]/g,
    ""
  );
  const userId = session.user?.id ?? "";

  const postKey = postId !== undefined ? `${postId}/` : "";

  return `temp/${postKey}${userNameKey}${userId.slice(0, 3)}`;
}

interface GetImagePathProps {
  session?: Session;
  postId?: number;
  commentId?: string;
}

export function getImagePath({
  session,
  postId,
  commentId,
}: GetImagePathProps) {
  if (session) return getTempFolderPath(session, postId);
  if (postId !== undefined) return `post/${postId}`;
  if (commentId !== undefined) return `comment/${commentId}`;
  return "";
}
