import { Launch } from "types";
import { addFavorite, removeFavorite } from "api/favorites";
import { ReactComponent as Star } from "assets/images/star.svg";

interface LaunchCardProps {
  launch: Launch;
  updateFavorite: (flightNumber: number, isFavorite: boolean) => void;
}

export const LaunchCard = ({ launch, updateFavorite }: LaunchCardProps) => {
  const handleClickFavorite = async () => {
    const previousFavoriteStatus = launch.favorite;
    const newFavoriteStatus = !previousFavoriteStatus;

    // Optimistic update
    updateFavorite(launch.flight_number, newFavoriteStatus);

    try {
      await (previousFavoriteStatus
        ? removeFavorite(launch.flight_number)
        : addFavorite(launch.flight_number));
    } catch (error) {
      console.error("Failed to update favorite:", error);
      // Revert on error
      updateFavorite(launch.flight_number, previousFavoriteStatus);
    }
  };

  return (
    <div className="relative rounded-lg bg-[#121212] bg-[linear-gradient(0deg,rgba(255,255,255,0.05),rgba(255,255,255,0.05))] shadow-[0px_0px_4px_rgba(0,0,0,0.25)] transition-all duration-200 hover:shadow-[rgba(255,255,255,0.37)_0px_3px_8px]">
      <div
        className="mx-2.5 mt-2.5 h-[157px] w-[calc(100%-20px)] bg-contain bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${launch.mission_patch})` }}
      />
      <div className="flex flex-col items-start px-[17px] py-3">
        <h3 className="mb-1.5 text-xl font-bold leading-8">{launch.mission_name}</h3>
        <span className="mb-1 text-base font-normal leading-6 text-left">{launch.details}</span>
        <span className="text-sm font-normal leading-[22px] text-white/37">
          {new Date(launch.launch_date_unix).toDateString()}
        </span>
        <Star
          onClick={handleClickFavorite}
          className={`absolute bottom-[15px] right-[15px] cursor-pointer self-end ${launch.favorite ? "fill-white" : ""}`}
        />
      </div>
    </div>
  );
};
