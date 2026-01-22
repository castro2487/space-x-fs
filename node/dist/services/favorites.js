"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserFavorites = void 0;
const app_data_source_1 = require("../database/app-data-source");
const favorites_1 = require("../entities/favorites");
const getUserFavorites = async (user_id) => {
    const favoritesRepo = app_data_source_1.AppDataSource.getRepository(favorites_1.Favorites);
    const currentFavs = await favoritesRepo.find({
        where: {
            user_id
        }
    });
    return currentFavs;
};
exports.getUserFavorites = getUserFavorites;
