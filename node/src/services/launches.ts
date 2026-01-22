/* eslint-disable camelcase */
import { getUserFavorites } from "./favorites";

export const processLaunches = async (userId: number, launches: any[], rockets: any[]) => {
  const userFavorites = await getUserFavorites(userId);
  const favoriteFlightNumbers = new Set(userFavorites.map((fav) => fav.flight_number));

  const content = launches.map((launch) => {
    const rocket = rockets.find((r) => r.rocket_id === launch.rocket.rocket_id);

    return {
      flight_number: launch.flight_number,
      mission_name: launch.mission_name,
      mission_patch: launch.links.mission_patch,
      details: launch.details,
      rocket: {
        rocket_id: launch.rocket.rocket_id,
        rocket_name: launch.rocket.rocket_name,
        active: rocket?.active || false,
        cost_per_launch: rocket?.cost_per_launch || 0,
        company: rocket?.company || "",
      },
      is_favorite: favoriteFlightNumbers.has(launch.flight_number),
    };
  });

  return content;
};
