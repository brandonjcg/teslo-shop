import { Footer } from '@/components/ui/Footer/Footer';
import { SidebarMenu } from '@/components/ui/SidebarMenu/SidebarMenu';
import { TopMenu } from '@/components/ui/TopMenu';

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
