'use client';

import { monsserat } from '@/fonts';
import { useCartStore, useUIStore } from '@/store';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { IoCartOutline, IoSearchOutline } from 'react-icons/io5';

export const TopMenu = () => {
  const openSidebarMenu = useUIStore((state) => state.openSidebarMenu);
  const totalItems = useCartStore((state) => state.getTotalItems());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
  }, []);

  return (
    <nav className="flex px-5 justify-between items-center w-full">
      <div>
        <Link href="/">
          <span className={`${monsserat.className} antiliased font-bold`}>
            Teslo
          </span>
          <span> | Shop</span>
        </Link>
      </div>

      <div>
        <Link
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
          href="/gender/men"
        >
          Men
        </Link>
      </div>

      <div className="hidden sm:block">
        <Link
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
          href="/gender/women"
        >
          Women
        </Link>
      </div>
      <div>
        <Link
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
          href="/gender/kid"
        >
          Kid
        </Link>
      </div>

      <div className="flex items-center">
        <Link href="/search" className="mx-2">
          <IoSearchOutline className="w-5 h-5" />
        </Link>
        <Link
          href={totalItems > 0 && loading ? '/cart' : '/empty'}
          className="mx-2"
        >
          <div className="relative">
            <span className="absolute text-xs rounded-full px-1 font-bold -top-2 -right-2 bg-blue-700 text-white">
              {loading && totalItems}
            </span>
            <IoCartOutline className="w-5 h-5" />
          </div>
        </Link>

        <button
          onClick={openSidebarMenu}
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
        >
          Menu
        </button>
      </div>
    </nav>
  );
};
