import Link from 'next/link';

interface Props {
  title: string;
  icon: React.ReactNode;
}

export const SidebarMenuItem = ({ title, icon }: Props) => {
  return (
    <>
      <Link
        href="/"
        className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
      >
        {icon}
        <span className="ml-3 text-xl">{title}</span>
      </Link>
    </>
  );
};
