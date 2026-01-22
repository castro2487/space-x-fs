import { useMemo, Dispatch, SetStateAction } from "react";
import chevronLeftIcon from "assets/images/chevron-left.svg";

interface PaginationProps {
  itemsCount: number;
  value: number;
  onChange: Dispatch<SetStateAction<number>>;
}

export const CARDS_PER_PAGE: number = 10;

export const Pagination = ({
  itemsCount,
  value,
  onChange,
}: PaginationProps) => {
  const renderPages = useMemo(() => {
    const pages = Array.from(Array(Math.ceil(itemsCount / CARDS_PER_PAGE)).keys());
    return pages.map((_, i) => {
      const isActive = i + 1 === value;
      return (
        <div
          key={i}
          onClick={() => onChange(i + 1)}
          className={isActive ? "h-[32px] p-0 w-[32px] rounded-[20px] bg-white text-black flex items-center justify-center" : "h-[32px] p-[5px] flex items-center justify-center cursor-pointer"}
        >
          {i + 1}
        </div>
      );
    });
  }, [itemsCount, value]);

  return !!itemsCount ? (
    <div className="flex items-center">
      <div className={`cursor-pointer mr-[5px] ${value === 1 ? "opacity-50" : ""}`}>
        <img src={chevronLeftIcon} alt="Previous" />
      </div>
      {renderPages}
      <div className={`cursor-pointer ml-[5px] rotate-180 ${value === Math.ceil(itemsCount / CARDS_PER_PAGE) ? "opacity-50" : ""}`}>
        <img src={chevronLeftIcon} alt="Next" />
      </div>
    </div>
  ) : null;
};
