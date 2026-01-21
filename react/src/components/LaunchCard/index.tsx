import { Launch } from "types";
import { addFavorite, removeFavorite } from "api/favorites";
import Star from "assets/images/star.svg";
import "./index.scss";

interface LaunchCardProps {
  launch: Launch;
  updateFavorite: Function;
}

export const LaunchCard = ({ launch, updateFavorite }: LaunchCardProps) => {
  const handleClickFavorite = async () => {
    await (launch.favorite
      ? removeFavorite(launch.flight_number)
      : addFavorite(launch.flight_number));
  };

  return (
    <div className="launch-card">
      <div
        className="patch"
        style={{ backgroundImage: `url(${launch.mission_patch})` }}
      />
      <div className="content">
        <h3>{launch.mission_name}</h3>
        <span className="details">{launch.details}</span>
        <span className="date">
          {new Date(launch.launch_date_unix).toDateString()}
        </span>
        <Star
          onClick={handleClickFavorite}
          className={launch.favorite ? "active" : ""}
        />
      </div>
    </div>
  );
};
