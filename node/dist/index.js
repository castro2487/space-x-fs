"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
dotenv_1.default.config();
// establish database connection
// AppDataSource.initialize()
//   .then(() => {
//     console.log("Data Source has been initialized");
//   })
//   .catch((err) => {
//     console.error("Error during Data Source initialization:", err);
//   });
const app = (0, express_1.default)();
// app.use(cors({ origin: "*" }));
// app.use(morgan("common"));
// app.use(express.json());
app.use((req, res, next) => {
    console.log(`[DEBUG] Incoming ${req.method} ${req.url}`);
    next();
});
// Application routes
app.get("/ping", (req, res) => res.send("pong"));
// app.use("/api", routes());
const port = Number(process.env.PORT) || 3000;
app.listen(port, "0.0.0.0", () => console.log(`App listening on port ${port}`));
