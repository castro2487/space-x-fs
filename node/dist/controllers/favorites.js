"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFavorites = exports.removeFavorite = exports.addFavorite = void 0;
const { AppDataSource } = require("../database/app-data-source");
const { Favorites } = require("../entities/favorites");
const addFavorite = async (req, res) => {
    const user_id = req.currentUserId;
    const flight_number = req.params.flight_number;
    const favoritesRepo = AppDataSource.getRepository(Favorites);
    const currentFav = await favoritesRepo.find({
        where: {
            flight_number,
            user_id
        }
    });
    if (!currentFav.length) {
        await favoritesRepo.insert({
            flight_number,
            user_id
        });
    }
    return res
        .status(201)
        .json(`Favorite for ${req.params.flight_number} has been updated.`);
};
exports.addFavorite = addFavorite;
const removeFavorite = async (req, res) => {
    const user_id = req.currentUserId;
    const flight_number = req.params.flight_number;
    const favoritesRepo = AppDataSource.getRepository(Favorites);
    await favoritesRepo.delete({
        flight_number,
        user_id
    });
    return res
        .status(200)
        .json(`Favorite for ${req.params.flight_number} has been removed.`);
};
exports.removeFavorite = removeFavorite;
const getFavorites = async (_, res) => {
    const favoritesRepo = AppDataSource.getRepository(Favorites);
    const favs = await favoritesRepo.find();
    return res.status(200).json(favs);
};
exports.getFavorites = getFavorites;
