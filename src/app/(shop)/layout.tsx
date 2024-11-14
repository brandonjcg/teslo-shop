import { Footer, SidebarMenu, TopMenu } from '@/components';

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen">
      <TopMenu />
      <SidebarMenu />
      <div className="m-2 px-0 sm:px-10">{children}</div>
      <Footer />
    </main>
  );
}
