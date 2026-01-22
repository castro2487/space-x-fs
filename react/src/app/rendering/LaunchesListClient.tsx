"use client";

import { useEffect, useContext } from "react";
import { Launch } from "types";
import { LaunchCard, Search, Pagination, CARDS_PER_PAGE } from "components";
import { ModeContext } from "contexts/ModeContext";
import { useLaunchesList } from "hooks";

interface LaunchesListClientProps {
  initialLaunches: Launch[];
}

export const LaunchesListClient = ({ initialLaunches }: LaunchesListClientProps) => {
  const { showAll } = useContext(ModeContext);
  const {
    launches,
    filteredLaunches,
    searchText,
    setSearchText,
    currentPage,
    setCurrentPage,
    updateFavorite,
  } = useLaunchesList({ initialLaunches, showAll });

  // Reset to page 1 when search or mode changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchText, showAll, setCurrentPage]);

  return (
    <div className="launches-list-container">
      <Search value={searchText} onChange={setSearchText} />
      <div className="launches-list">
        {filteredLaunches
          .filter(
            (_: Launch, i: number) =>
              i >= CARDS_PER_PAGE * (currentPage - 1) &&
              i < CARDS_PER_PAGE * currentPage,
          )
          .map((launch, i) => (
            <LaunchCard
              key={launch.flight_number}
              launch={launch}
              updateFavorite={updateFavorite}
            />
          ))}
      </div>
      <Pagination
        value={currentPage}
        onChange={setCurrentPage}
        itemsCount={filteredLaunches.length}
      />
    </div>
  );
};
