/** @format */

import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import "./MainLayout.css";

const MainLayout = ({ children }) => {
  return (
    <div className="">
      <Header />

      <main
        style={{ minHeight: "calc(100vh - 200px)" }}
        className="mainlayout-child"
      >
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;
