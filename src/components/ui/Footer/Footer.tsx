import Link from 'next/link';
import { monsserat } from '@/fonts';

export const Footer = () => {
  return (
    <div className="flex w-full justify-center text-xs mb-10">
      <Link href="/" className="mx-3">
        <span className={`${monsserat.className} antialiased font-bold`}>
          Teslo shop
        </span>
        <span className={`${monsserat.className} antialiased font-bold`}>
          {' '}
          © {new Date().getFullYear()}
        </span>
      </Link>
      <Link href="/" className="mx-3">
        Privacy & Legal
      </Link>
      <Link href="/" className="mx-3">
        Locations
      </Link>
    </div>
  );
};
