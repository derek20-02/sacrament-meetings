export default function AdminAuthentication({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">{children}</main>
      <p>Week 05</p>
    </div>
  );
}