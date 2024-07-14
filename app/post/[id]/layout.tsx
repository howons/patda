export default function PostLayout({
  children,
  post,
  comment,
}: {
  children: React.ReactNode;
  post: React.ReactNode;
  comment: React.ReactNode;
}) {
  return (
    <>
      {children}
      {post}
      {comment}
    </>
  );
}
