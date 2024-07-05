import React from "react";

const Navbar = () => {
  return (
    <nav className="sticky top-0 flex h-11 justify-center bg-white/[.8] text-black">
      <div className="container flex items-center justify-between">
        <button>TS</button>
        <div className="flex gap-4">
          <button className="hover:text-[#2696ff] hover:underline hover:decoration-[#ff9d00] hover:underline-offset-4">
            Destacados
          </button>
          <button className="hover:text-[#2696ff] hover:underline hover:decoration-[#ff9d00] hover:underline-offset-4">
            Smartphones
          </button>
          <button className="hover:text-[#2696ff] hover:underline hover:decoration-[#ff9d00] hover:underline-offset-4">
            Tablets
          </button>
          <button className="hover:text-[#2696ff] hover:underline hover:decoration-[#ff9d00] hover:underline-offset-4">
            Notebooks
          </button>
          <button className="hover:text-[#2696ff] hover:underline hover:decoration-[#ff9d00] hover:underline-offset-4">
            Accesorios
          </button>
          <button className="hover:text-[#2696ff] hover:underline hover:decoration-[#ff9d00] hover:underline-offset-4">
            Consolas
          </button>
          <button className="hover:text-[#2696ff] hover:underline hover:decoration-[#ff9d00] hover:underline-offset-4">
            Cámaras
          </button>
          <button className="hover:text-[#2696ff] hover:underline hover:decoration-[#ff9d00] hover:underline-offset-4">
            Drones
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
