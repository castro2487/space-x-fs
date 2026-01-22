"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLaunches = void 0;
const spacex_1 = require("../services/spacex");
const launches_1 = require("../services/launches");
const cache = {
    launches: { data: null, timestamp: 0 },
    rockets: { data: null, timestamp: 0 },
};
const CACHE_DURATION = 60 * 1000; // 60 seconds
const getLaunches = async (req, res) => {
    const userId = req.currentUserId;
    const now = Date.now();
    let launchesData = cache.launches.data;
    let rocketsData = cache.rockets.data;
    const launchesExpired = now - cache.launches.timestamp > CACHE_DURATION;
    const rocketsExpired = now - cache.rockets.timestamp > CACHE_DURATION;
    if (!launchesData || launchesExpired || !rocketsData || rocketsExpired) {
        const [fetchedLaunches, fetchedRockets] = await Promise.all([
            !launchesData || launchesExpired ? (0, spacex_1.fetchLaunches)() : Promise.resolve(launchesData),
            !rocketsData || rocketsExpired ? (0, spacex_1.fetchRockets)() : Promise.resolve(rocketsData),
        ]);
        if (!launchesData || launchesExpired) {
            cache.launches = { data: fetchedLaunches, timestamp: now };
            launchesData = fetchedLaunches;
        }
        if (!rocketsData || rocketsExpired) {
            cache.rockets = { data: fetchedRockets, timestamp: now };
            rocketsData = fetchedRockets;
        }
    }
    const outputLaunches = await (0, launches_1.processLaunches)(userId, launchesData, rocketsData);
    return res.status(200).json(outputLaunches);
};
exports.getLaunches = getLaunches;
