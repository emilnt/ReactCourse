import { Outlet } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";

const RootLayout = () => {
  return (
    <>
      <MainNavigation />
      <main>
      <Outlet className="content"/>
      </main>
    </>
  );
};

export default RootLayout;
