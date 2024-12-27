export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <article className="mt-12 w-full max-w-3xl sm:w-4/5">{children}</article>
  );
}
