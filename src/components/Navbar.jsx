import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="sticky top-0 flex h-11 justify-center bg-white/[.8] text-black">
      <div className="container flex items-center justify-between">
        <Link href={'/'}>TS</Link>
        <div className="flex gap-4">
          <Link href={'/destacados'} className="hover:text-[#2696ff] hover:underline hover:decoration-[#ff9d00] hover:underline-offset-4">
            Destacados
          </Link>
          <Link href={'/smartphones'} className="hover:text-[#2696ff] hover:underline hover:decoration-[#ff9d00] hover:underline-offset-4">
            Smartphones
          </Link>
          <Link href={'/tablets'} className="hover:text-[#2696ff] hover:underline hover:decoration-[#ff9d00] hover:underline-offset-4">
            Tablets
          </Link>
          <Link href={'/notebooks'} className="hover:text-[#2696ff] hover:underline hover:decoration-[#ff9d00] hover:underline-offset-4">
            Notebooks
          </Link>
          <Link href={'/accesorios'} className="hover:text-[#2696ff] hover:underline hover:decoration-[#ff9d00] hover:underline-offset-4">
            Accesorios
          </Link>
          <Link href={'/consolas'} className="hover:text-[#2696ff] hover:underline hover:decoration-[#ff9d00] hover:underline-offset-4">
            Consolas
          </Link>
          <Link href={'/camaras'} className="hover:text-[#2696ff] hover:underline hover:decoration-[#ff9d00] hover:underline-offset-4">
            Cámaras
          </Link>
          <Link href={'/drones'} className="hover:text-[#2696ff] hover:underline hover:decoration-[#ff9d00] hover:underline-offset-4">
            Drones
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
