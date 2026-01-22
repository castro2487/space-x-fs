import { useContext, ReactNode } from "react";
import { ModeContext } from "contexts/ModeContext";
import logo from "../../assets/images/logo.svg";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const { showAll, setShowAll } = useContext(ModeContext);
  return (
    <>
      <header className="h-[100px] relative bg-gradient-to-b from-[#121212] to-[#1E1E1E] pt-[28px] pl-[30px] shadow-[0px_8px_10px_rgba(0,0,0,0.14),0px_3px_14px_rgba(0,0,0,0.12),0px_5px_5px_rgba(0,0,0,0.2)]">
        <img src={logo} alt="SpaceX" />
        <div className="mt-[10px] w-full text-left">
          Launches
          <div className="flex absolute bottom-0">
            <div
              onClick={() => setShowAll(true)}
              className={`cursor-pointer text-center pb-[2px] w-[140px] ${showAll ? "text-white border-b border-white" : "text-white/57"}`}
            >
              All
            </div>
            <div
              onClick={() => setShowAll(false)}
              className={`cursor-pointer text-center pb-[2px] w-[140px] ${!showAll ? "text-white border-b border-white" : "text-white/57"}`}
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
