import type { Session } from "next-auth";

import { getUserKey } from "#lib/utils/user.js";

interface SupabaseLoader {
  src: string;
  width: number;
  quality?: number;
}

export function supabaseLoader({ src, width, quality }: SupabaseLoader) {
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/patda-images/${src}?w=${width}&q=${
    quality || 75
  }`;
}

export function getTempFolderPath(session: Session, postId?: number) {
  const userKey = getUserKey(session);

  const postKey = postId !== undefined ? `${postId}/` : "";

  return `temp/${postKey}${userKey}`;
}

interface GetImagePathProps {
  session?: Session | null;
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
