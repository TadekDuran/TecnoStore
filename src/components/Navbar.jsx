import React from "react";
import Link from "next/link";

const Navbar = () => {
  const links = [
    { href: "/destacados", title: "Destacados" },
    { href: "/smartphones", title: "Smartphones" },
    { href: "/tablets", title: "Tablets" },
    { href: "/notebooks", title: "Notebooks" },
    { href: "/accesorios", title: "Accesorios" },
    { href: "/consolas", title: "Consolas" },
    { href: "/camaras", title: "Cámaras" },
    { href: "/drones", title: "Drones" },
  ];

  return (
    <nav className="sticky top-0 flex h-11 justify-center bg-white/[.8]">
      <div className="container flex items-center justify-between">
        <Link href={"/"}>TS</Link>
        <div className="flex gap-4">
          {links.map((link) => (
            <Link
              href={link.href}
              key={link.title}
              className="hover:text-[#2696ff] hover:underline hover:decoration-[#ff9d00] hover:underline-offset-4"
            >
              {link.title}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
