"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFavorites1661780139212 = void 0;
const typeorm_1 = require("typeorm");
class createFavorites1661780139212 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: "favorites",
            columns: [
                {
                    name: "id",
                    type: "integer",
                    isPrimary: true
                },
                {
                    name: "flight_number",
                    type: "integer"
                },
                {
                    name: "user_id",
                    type: "integer"
                },
                {
                    name: "created_at",
                    type: "timestamp",
                    default: "now()"
                }
            ]
        }), true);
    }
    async down(queryRunner) {
        await queryRunner.dropTable("favorites");
    }
}
exports.createFavorites1661780139212 = createFavorites1661780139212;
