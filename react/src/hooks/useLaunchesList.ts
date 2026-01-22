import { useState, Dispatch, SetStateAction, useMemo } from "react";
import { Launch } from "types";

interface UseLaunchesListParams {
  initialLaunches: Launch[];
  showAll: boolean;
}

interface UseLaunchesListReturn {
  launches: Launch[];
  filteredLaunches: Launch[];
  searchText: string;
  setSearchText: Dispatch<SetStateAction<string>>;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  updateFavorite: (flightNumber: number, isFavorite: boolean) => void;
}

/**
 * Custom hook for managing launches list state and logic.
 * Extracts shared logic between LaunchesList and LaunchesListClient components.
 */
export const useLaunchesList = ({
  initialLaunches,
  showAll,
}: UseLaunchesListParams): UseLaunchesListReturn => {
  const [launches, setLaunches] = useState<Launch[]>(initialLaunches);
  const [searchText, setSearchText] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const filteredLaunches = useMemo(() => {
    return launches.filter((l: Launch) => {
      const matchesMode = showAll || l.favorite;
      const matchesSearch = searchText === "" ||
        l.mission_name.toLowerCase().includes(searchText.toLowerCase());
      return matchesMode && matchesSearch;
    });
  }, [launches, showAll, searchText]);

  const updateFavorite = (flightNumber: number, isFavorite: boolean) => {
    setLaunches((prevLaunches) =>
      prevLaunches.map((launch) =>
        launch.flight_number === flightNumber
          ? { ...launch, favorite: isFavorite }
          : launch,
      ),
    );
  };

  return {
    launches,
    filteredLaunches,
    searchText,
    setSearchText,
    currentPage,
    setCurrentPage,
    updateFavorite,
  };
};
