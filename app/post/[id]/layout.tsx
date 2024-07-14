export default function PostLayout({
  children,
  comment,
}: {
  children: React.ReactNode;
  comment: React.ReactNode;
}) {
  return (
    <>
      {children}
      {comment}
    </>
  );
}
