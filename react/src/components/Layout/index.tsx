import { useContext, ReactNode } from "react";
import { ModeContext } from "contexts/ModeContext";
import logo from "../../assets/images/logo.svg";
import "./index.scss";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const { showAll, setShowAll } = useContext(ModeContext);
  return (
    <>
      <header>
        <img src={logo} alt="SpaceX" />
        <div className="header-bottom">
          Launches
          <div className="tabs">
            <div
              onClick={() => setShowAll(true)}
              className={showAll ? "active" : ""}
            >
              All
            </div>
            <div
              onClick={() => setShowAll(false)}
              className={!showAll ? "active" : ""}
            >
              Favorites
            </div>
          </div>
        </div>
      </header>
      {children}
    </>
  );
};
