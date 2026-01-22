"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = async (req, res) => {
    try {
        console.log("Admin generateToken hit");
        const jwtSecretKey = process.env.JWT_SECRET_KEY;
        const userId = req.body.userId;
        console.log("RequestBody:", req.body);
        console.log("SecretKey type:", typeof jwtSecretKey);
        // console.log("SecretKey:", jwtSecretKey); // Careful logging secrets
        if (!jwtSecretKey) {
            console.error("JWT_SECRET_KEY is missing");
            return res.status(500).send("Server Error: JWT Secret not set");
        }
        if (!userId) {
            console.error("UserId is missing in request body");
            return res.status(400).send("UserId not set");
        }
        const data = {
            time: Date(),
            userId
        };
        const token = jsonwebtoken_1.default.sign(data, jwtSecretKey); // Sign synchronously
        return res.send({ token });
    }
    catch (error) {
        console.error("Error generating token:", error);
        return res.status(500).send("Internal Server Error");
    }
};
exports.generateToken = generateToken;
