'use client';

import clsx from 'clsx';
import { signOut, useSession } from 'next-auth/react';
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
import { useUIStore } from '@/store';
import { SidebarMenuItem } from './SidebarMenuItem';

export const SidebarMenu = () => {
  const isSidebarMenuOpen = useUIStore((state) => state.isSidebarMenuOpen);
  const closeSidebarMenu = useUIStore((state) => state.closeSidebarMenu);
  const { data: session } = useSession();
  const isLogged = !!session?.user;
  const isAdmin = session?.user?.role.toLowerCase() === 'admin';

  const handlerLogout = () => {
    closeSidebarMenu();
    signOut({ redirect: false });
  };

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
        {isLogged && (
          <>
            {' '}
            <SidebarMenuItem
              title="Profile"
              path="/profile"
              icon={<IoPersonOutline size={30} />}
              onClick={closeSidebarMenu}
            />
            <SidebarMenuItem
              title="Orders"
              icon={<IoTicketOutline size={30} />}
              onClick={closeSidebarMenu}
              path="/orders"
            />
            {isLogged && (
              <SidebarMenuItem
                title="Logout"
                onClick={handlerLogout}
                icon={<IoLogOutOutline size={30} />}
              />
            )}
          </>
        )}

        {!isLogged && (
          <SidebarMenuItem
            title="Login"
            icon={<IoLogInOutline size={30} />}
            onClick={closeSidebarMenu}
            path="/auth/login"
          />
        )}

        <div className="w-full h-px bg-gray-200 my-10" />

        {isAdmin && (
          <>
            <SidebarMenuItem
              title="Products"
              path="/gender/men"
              icon={<IoShirtOutline size={30} />}
              onClick={closeSidebarMenu}
            />
            <SidebarMenuItem
              title="Orders"
              path="/orders"
              onClick={closeSidebarMenu}
              icon={<IoTicketOutline size={30} />}
            />
            <SidebarMenuItem
              title="Users"
              path="/users"
              onClick={closeSidebarMenu}
              icon={<IoPeopleOutline size={30} />}
            />
          </>
        )}
      </nav>
    </div>
  );
};
