"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.addTodo = exports.getTodos = void 0;
const todo_1 = __importDefault(require("../models/todo"));
const getTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allTodos = yield todo_1.default.find();
        res.status(200).json({
            status: "success",
            message: "data retrieved successfully",
            data: allTodos,
        });
    }
    catch (err) {
        throw err;
    }
});
exports.getTodos = getTodos;
const addTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("adding to do");
        const body = req.body;
        const todo = new todo_1.default({
            name: body.name,
            description: body.description,
        });
        const newTodo = yield todo.save();
        const allTodos = yield todo_1.default.find();
        res.status(201).json({
            status: "success",
            message: "added seccussefully",
            todo: newTodo,
            todos: allTodos,
        });
    }
    catch (err) {
        throw err;
    }
});
exports.addTodo = addTodo;
const updateTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { params: { id }, body, } = req;
        const { checked } = body;
        const updateTodo = yield todo_1.default.findByIdAndUpdate(id, {
            checked: true,
        });
        const allTodos = yield todo_1.default.find();
        res.status(200).json({
            message: "A Todo is updated successefully",
            data: allTodos,
        });
    }
    catch (err) {
        throw err;
    }
});
exports.updateTodo = updateTodo;
const deleteTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield todo_1.default.findByIdAndDelete(id);
        const allTodos = yield todo_1.default.find();
        res.status(200).json({
            status: "status",
            message: "deleted successfully",
            data: allTodos,
        });
    }
    catch (err) {
        throw err;
    }
});
exports.deleteTodo = deleteTodo;
