import React from "react";
import Button from "@mui/joy/Button";

const Header = () => {
  return (
    <div className="h-24 w-5/6 flex justify-center align-center gap-2 p-6">
      <Button className="h-4 text-destacados bg-background hover:bg-bgbutton">
        Destacados
      </Button>
      <Button className="h-4 text-textcolor bg-background hover:bg-bgbutton">
        Smartphones
      </Button>
      <Button className="h-4 text-textcolor bg-background hover:bg-bgbutton">
        Tablets
      </Button>
      <Button className="h-4 text-textcolor bg-background hover:bg-bgbutton">
        Notebooks
      </Button>
      <Button className="h-4 text-textcolor bg-background hover:bg-bgbutton">
        Consolas
      </Button>
      <Button className="h-4 text-textcolor bg-background hover:bg-bgbutton">
        Cámaras
      </Button>
      <Button className="h-4 text-textcolor bg-background hover:bg-bgbutton">
        Drones
      </Button>
    </div>
  );
};

export default Header;
