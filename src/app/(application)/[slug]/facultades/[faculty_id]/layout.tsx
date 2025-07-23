import Header from '@/ui/organisms/Header';

export default function ApplicationLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* <Header /> */}
      <main className="min-h-[calc(100vh-67px)] bg-app-background">
        {children}
      </main>
    </>
  );
}
