import Header from '@/ui/organisms/Header';

export default function ApplicationLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="p-4 sm:p-6 bg-app-background">{children}</main>
    </>
  );
}
