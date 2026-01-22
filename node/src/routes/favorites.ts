import { auth } from "../middlewares/auth";
import { getFavorites, addFavorite, removeFavorite } from "../controllers/favorites";

export default (router) => {
  router.get("/favorites", auth, getFavorites);
  router.post("/favorites/:flight_number", auth, addFavorite);
  router.delete("/favorites/:flight_number", auth, removeFavorite);
};
