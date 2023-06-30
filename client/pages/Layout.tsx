import { useRouter } from "next/router";
import Navbar from "../components/Navbar";
import SwipeableTemporaryDrawer from "../components/SwipeableTemporaryDrawer";
import { useEffect, useState } from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();
  const [openDrawer, setOpenDrawer] = useState(false);

  useEffect(() => {
    if (localStorage) {
      if (!localStorage.getItem("token")) {
        router.push("/connexion");
        return;
      }
    }
  })

  return (
    <>
      <Navbar setOpenDrawer={setOpenDrawer} />
      <SwipeableTemporaryDrawer
        openDrawer={openDrawer}
        setOpenDrawer={setOpenDrawer}
      />
      <div className="app-content" style={{ overflowX: "auto", overflowY: "auto", minHeight: "calc(100dvh - 64px)" }} >
        {children}
      </div>
    </>
  );
};

export default Layout;
