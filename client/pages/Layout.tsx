import Navbar from "../components/Navbar";
import SwipeableTemporaryDrawer from "../components/SwipeableTemporaryDrawer";
import { useState } from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <>
      <Navbar setOpenDrawer={setOpenDrawer} />
      <SwipeableTemporaryDrawer
        openDrawer={openDrawer}
        setOpenDrawer={setOpenDrawer}
      />
      <div className="app-content" style={{ overflowX: "auto", overflowY: "auto", height: "calc(100dvh - 64px)" }} >
        {children}
      </div>
    </>
  );
};

export default Layout;
