"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Favorites = void 0;
const typeorm_1 = require("typeorm");
let Favorites = class Favorites {
    id;
    flight_number;
    user_id;
    created_at;
};
exports.Favorites = Favorites;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Favorites.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "integer", nullable: false }),
    __metadata("design:type", Number)
], Favorites.prototype, "flight_number", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ type: "integer", nullable: false }),
    __metadata("design:type", Number)
], Favorites.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Favorites.prototype, "created_at", void 0);
exports.Favorites = Favorites = __decorate([
    (0, typeorm_1.Entity)(),
    (0, typeorm_1.Index)(["user_id", "flight_number"], { unique: true })
], Favorites);
