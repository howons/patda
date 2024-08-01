import { CommentStatusStoreProvider } from "#lib/providers/CommentStatusStoreProvider.jsx";

export default function PostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CommentStatusStoreProvider>
      <article className="mt-20 w-full max-w-3xl sm:w-4/5">{children}</article>
    </CommentStatusStoreProvider>
  );
}
