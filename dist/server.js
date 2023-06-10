"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const todos_routes_1 = __importDefault(require("./routes/todos.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api/v1/', todos_routes_1.default);
app.get("/", (req, res) => res.send("here we go"));
const port = process.env.PORT || 4000;
mongoose_1.default.set("strictQuery", true);
const DB = process.env.CONNECTION_STR || "";
mongoose_1.default
    .connect(DB)
    .then(() => {
    console.log("connected on database");
    app.listen(port, () => console.log(`server is running on ${port}...`));
})
    .catch((err) => console.log(err));
