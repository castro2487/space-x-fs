import { useState, SetStateAction, Dispatch } from "react";
import searchIcon from "assets/images/search.svg";
import closeIcon from "assets/images/close.svg";

interface SeachProps {
  value: string;
  onChange: Dispatch<SetStateAction<string>>;
}

export const Search = ({ value, onChange }: SeachProps) => {
  const clear = () => {
    onChange("");
  };

  return (
    <div className="relative flex items-center rounded-lg bg-[#121212] bg-[linear-gradient(0deg,rgba(255,255,255,0.05),rgba(255,255,255,0.05))] p-3 shadow-[0px_0px_4px_rgba(0,0,0,0.25)] transition-all duration-200 hover:shadow-[rgba(255,255,255,0.37)_0px_3px_8px] focus-within:shadow-[rgba(255,255,255,0.37)_0px_3px_8px]">
      <img className="mr-3 h-5 w-5 opacity-60" src={searchIcon} alt="Search" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search by mission name..."
        className="flex-1 bg-transparent border-none outline-none text-base font-normal leading-6 text-white placeholder:text-white/37"
      />
      <img
        className={`ml-3 h-4 w-4 cursor-pointer opacity-60 transition-opacity duration-200 hover:opacity-100 ${!value ? "hidden" : ""}`}
        src={closeIcon}
        onClick={clear}
        alt="Close"
      />
    </div>
  );
};
