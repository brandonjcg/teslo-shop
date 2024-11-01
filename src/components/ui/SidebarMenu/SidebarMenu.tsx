'use client';

import {
  IoCloseOutline,
  IoLogInOutline,
  IoLogOutOutline,
  IoPeopleOutline,
  IoPersonOutline,
  IoSearchOutline,
  IoShirtOutline,
  IoTicketOutline,
} from 'react-icons/io5';
import { SidebarMenuItem } from './SidebarMenuItem';
import { useUIStore } from '@/store';
import clsx from 'clsx';

export const SidebarMenu = () => {
  const isSidebarMenuOpen = useUIStore((state) => state.isSidebarMenuOpen);
  const closeSidebarMenu = useUIStore((state) => state.closeSidebarMenu);

  return (
    <div>
      {isSidebarMenuOpen && (
        <div className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-20" />
      )}
      {isSidebarMenuOpen && (
        <div
          onClick={closeSidebarMenu}
          className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm"
        />
      )}

      <nav
        className={clsx(
          'fixed p-5 right-0 top-0 w-[500px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300',
          {
            'translate-x-full': !isSidebarMenuOpen,
          },
        )}
      >
        <IoCloseOutline
          size={50}
          onClick={closeSidebarMenu}
          className="absolute top-5 right-5 cursor-pointer"
        />

        <div className="relative mt-14">
          <IoSearchOutline size={20} className="absolute top-2 left-2" />
          <input
            type="text"
            placeholder="Search"
            className="w-full bg-gray-50 rounded pl-10 py-1 pr-10 border-b-2 text-xl border-gray-200 focus:outline-none focus:border-blue-500"
          />
        </div>

        <SidebarMenuItem title="Profile" icon={<IoPersonOutline size={30} />} />
        <SidebarMenuItem title="Orders" icon={<IoTicketOutline size={30} />} />
        <SidebarMenuItem title="Login" icon={<IoLogInOutline size={30} />} />
        <SidebarMenuItem title="Logout" icon={<IoLogOutOutline size={30} />} />

        <div className="w-full h-px bg-gray-200 my-10" />

        <SidebarMenuItem title="Products" icon={<IoShirtOutline size={30} />} />
        <SidebarMenuItem title="Orders" icon={<IoTicketOutline size={30} />} />
        <SidebarMenuItem title="Users" icon={<IoPeopleOutline size={30} />} />
      </nav>
    </div>
  );
};
