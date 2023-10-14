export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="mx-0 sm:mx-12 md:mx-32 lg:mx-60 my-2">{children}</div>;
}
